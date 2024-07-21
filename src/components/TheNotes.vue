<template>
    <div>
      <div class="container-fluid">
        <div class="container">
          <div class="p-2 w-35">
            <div class="col card card-body">
              <div>
                <h2 class="text-truncate">{{ noteStore.note.title }} <i class="point fa fa-circle ml-1 font-10 text-warning"></i></h2>
                <p class="font-12">{{ noteStore.note.createdAt }}</p>
                <p>{{ noteStore.note.content ? noteStore.note.content[0] : '' }}</p>
                <div class="d-flex align-items-center">
                  <div class="ml-auto">
                    <button class="btn btn-secondary mx-2" @click="$router.push(`/notes/${noteStore.note._id}/edit`)">Edit</button>
                    <button @click="handleDelete" class="btn btn-danger mx-2">Delete</button>
                  </div>
                </div>
              </div>
              <!-- <div v-else>
                <p>Loading...</p>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useNoteStore } from '../stores/noteStore';
  
  const route = useRoute();
  const noteStore = useNoteStore();
  //let note = ''
  
  onMounted( async() => {
    await noteStore.fetchNote(route.params.id);
    // console.log(noteStore)
    // console.log(route.params.id)
  });
  
  const handleDelete = async () => {
    await noteStore.deleteNote();
  };
  </script>
  
  <style scoped>
  
  </style>
  