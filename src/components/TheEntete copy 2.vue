<template>  
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous">

    <ul class="nav nav-pills p-3 bg-white mb-3 rounded-pill align-items-center">
            <li class="nav-item">
                <a href="" class="nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2 active">
                    <span class="">All Notes</span>
                </a>
            </li>
            <li class="nav-item ml-auto">            
            <span class="d-md-block font-14 nav-link btn-primary rounded-pill d-flex align-items-center px-3 active" id="add-notes"><router-link to="/ajouter">Add Notes</router-link></span>
            </li>         
    </ul>
    <div v-for="count in totalPostit" :key="count.id">
         <!-- {{count.title}} --> 

    <div class="">

        <div class="container-fluid">
            <div class="container">
                <div class="p-2 w-35">
                    <div class="col card card-body">
                        <h5 class="text-truncate">{{count.title}} <i class="point fa fa-circle ml-1 font-10 text-warning"></i></h5>
                        <p class="font-12">{{count.createdAt}} </p>
                        <p class="">{{count.content[0]}}</p>
                        <div class="d-flex align-items-center">
                            <span class="mr-1"><i class="fa fa-star favourite-note"></i></span>
                            <span class="mr-1"><i class="fa fa-trash remove-note"></i></span>
                            <div class="ml-auto">              
                              <button type="button" class="btn btn-info"><router-link :to="`/notes/${count._id}`">Details</router-link></button>
                              <!-- <button type="button" class="btn btn-secondary"><router-link :to="{ name: 'edit', params: `${count._id}`}">Edit</router-link></button> -->
                              <button type="button" @click="deleteNotes(notes._id)" class="btn btn-danger mx-2">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>           
            </div>
        </div>
    </div>

    </div>        

</template>

<script setup>

 import { ref, onMounted } from 'vue'
 import { RouterLink } from 'vue-router';
//  import axios from 'axios'

 let totalPostit = ref([])
 let notesId = '';
 
//  const totalPostitRefs = ref([])
 
    onMounted(() => {
        created()
        deleteNotes(notesId)
    })


    const created = async() => {
        // Simple GET request using fetch
        const response = await fetch("http://62.72.5.95:1999/notes");
        const data = await response.json();

        totalPostit.value = data.notes;
        // let title = data.notes.title;
        // console.log(totalPostit.value[0].title);
    };

    const deleteNotes = async(notesId) => {
        console.log('notesId');
    }

</script>
