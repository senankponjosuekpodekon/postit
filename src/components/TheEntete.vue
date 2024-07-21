<template>
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous">

    <div v-if="isLoading" class="spinner-wrapper">
        <div class="spinner"></div>
    </div>
    
    <div v-else>
        <div v-for="(count) in paginatedPosts" :key="count._id">
            <div class="">
                <div class="container-fluid">
                    <div class="container">
                        <div class="row">
                            <div class="col">
                                <div class="p-2 w-35">
                                    <div class="col card card-body">
                                        <h5 class="text-truncate">{{count.title}} <i class="point fa fa-circle ml-1 font-10 text-warning"></i></h5>
                                        <p class="font-12">{{count.createdAt}} </p>
                                        <p class="">{{count.content[0]}}</p>
                                        <div class="d-flex align-items-center">
                                            <span class="mr-2" style="color: gold; cursor: pointer;"><i class="fa fa-star favourite-note"></i></span>
                                            <span class="mr-1" @click="deleted(count._id)" style="color: blue;"><i class="fa fa-trash remove-note"></i></span>
                                            <div class="ml-auto">              
                                                <router-link :to="`/notes/${count._id}`">
                                                    <button type="button" class="btn btn-info mx-2">Show</button>
                                                </router-link>
                                                <router-link :to="`/notes/${count._id}/edit`">
                                                    <button type="button" class="btn btn-secondary text-white mx-2">Edit</button>
                                                </router-link>
                                                <button type="button" @click="deleted(count._id)" class="btn btn-danger mx-2">Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>  
                            </div> 
                        </div>        
                    </div>
                </div>
            </div>
        </div>        

        <nav>
            <ul class="pagination m-5">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">Previous</a>
                </li>
                <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
                    <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                    <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">Next</a>
                </li>
            </ul>
        </nav>
    </div>
</template>



<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

let totalPostit = ref([])
let currentPage = ref(1)
const itemsPerPage = 5
let isLoading = ref(false)

onMounted(() => {
    fetchNotes()
})

const fetchNotes = async () => {
    isLoading.value = true
    try {
        const response = await fetch("https://post-it.epi-bluelock.bj")
        const data = await response.json()
        totalPostit.value = data.notes
    } catch (error) {
        console.error('Error fetching notes:', error)
    } finally {
        isLoading.value = false
    }
}

const paginatedPosts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return totalPostit.value.slice(start, end)
})

const totalPages = computed(() => {
    return Math.ceil(totalPostit.value.length / itemsPerPage)
})

const changePage = (page) => {
    if (page > 0 && page <= totalPages.value) {
        currentPage.value = page
    }
}

const deleted = async (id) => {
    isLoading.value = true
    try {
        await fetch(`https://post-it.epi-bluelock.bj/${id}`, { method: 'DELETE' })
        fetchNotes()
    } catch (error) {
        console.error('Error deleting note:', error)
    } finally {
        isLoading.value = false
    }
}
</script>

<style>
.spinner-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.spinner {
    width: 50px;
    height: 50px;
    border: 5px solid rgba(0, 0, 0, 0.1);
    border-top: 5px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>
