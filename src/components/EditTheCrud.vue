<template>
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous">

    <form action="" method="post" @submit.prevent="onSubmit" class="vh-100" style="background-color: #2779e2;">
        <div class="container h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-xl-9">
                    <h2 class="text-white mb-4">Editer une note :</h2>
                    <ul class="alert alert-warning" v-if="Object.keys(errorList).length > 0">
                        <li class="mb-0 ms-3" v-for="(error, index) in errorList" :key="index">
                            {{ error[0] }}
                        </li>
                    </ul>
                    <div class="card" style="border-radius: 15px;">
                        <div class="card-body">
                            <div class="row align-items-center pt-4 pb-3">
                                <div class="col-md-3 ps-5">
                                    <h6 class="mb-0">Titre</h6>
                                </div>
                                <div class="col-md-9 pe-5">
                                    <input type="text" v-model="model.notes.title" class="form-control form-control-lg"/>
                                </div>
                            </div>
                            <hr class="mx-n3">
                            <div class="row align-items-center py-3">
                                <div class="col-md-3 ps-5">
                                    <h6 class="mb-0">Notes</h6>
                                </div>
                                <div class="col-md-9 pe-5">
                                    <textarea class="form-control" v-model="model.notes.content[0]" rows="3" placeholder="Une note, une histoire, un rappel"></textarea>
                                </div>
                            </div>
                            <hr class="mx-n3">
                            <div class="px-5 py-4">
                                <button type="submit" @click="updateNotes" class="btn btn-primary btn-lg">Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute();
const notesId = ref('');
const errorList = ref('');
const model = ref({
    notes: {
        title: '',
        content: ['']
    }
});

onMounted(() => {
    notesId.value = route.params.id;
    getNotesData(route.params.id);
});

const getNotesData = (notesId) => {
    axios.get(`https://post-it.epi-bluelock.bj/${notesId}`)
    .then(res => {
        console.log(res.data);
        // model.value.notes = res.data.notes
    })
    .catch(error => {
        if (error.response) {
            alert('Not content available');
            if (error.response.status === 404) {
                errorList.value = error.response.data.errors;
            }
            console.log(error.response.status);
        }
    });
};

const updateNotes = () => {
    axios.put(`https://post-it.epi-bluelock.bj/${notesId.value}`, model.value.notes)
    .then(res => {
        console.log(res.data);
        //alert(res.data.content); 
        errorList.value = '';
    })
    .catch(error => {
        if (error.response) {
            if (error.response.status === 422) {
                errorList.value = error.response.data.errors;
            }
            console.log('erreur');
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
    });
};
</script>

<style>
</style>
