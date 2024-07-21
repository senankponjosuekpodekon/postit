<script setup>
import { RouterView } from 'vue-router'
// import TheEntete from './components/TheEntete.vue'



</script>

<template>
    <ul class="nav nav-pills p-3 bg-white mb-3 rounded-pill align-items-center">
            <li class="nav-item">
                <a href="" class="nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2 active">
                  <router-link to="/">
                        <span class="text-white">All Notes</span>
                    </router-link>
                </a>
            </li>
            <li class="nav-item ml-auto">            
              <router-link to="/ajouter">
                <span class="d-md-block font-14 nav-link btn-primary rounded-pill d-flex align-items-center px-3 text-white active" id="add-notes">
              Add Notes
            </span>
            </router-link>
            </li>           
    </ul>
  <!-- <TheEntete/> -->
  <RouterView />
</template>

<style scoped>

</style>
