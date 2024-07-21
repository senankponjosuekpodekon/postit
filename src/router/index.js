import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import TheCrud from '@/components/TheCrud.vue'
import TheEntete from '@/components/TheEntete.vue'
import TheNotes from '@/components/TheNotes.vue'
import EditTheCrud from '@/components/EditTheCrud.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
     {
       path: '/',
       name: 'home',
       component: TheEntete
     },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // },
    {
      path: '/ajouter',
      name: 'ajouter',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: TheCrud
    },
    {
      path: '/notes/:id',
      name: 'notes',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: TheNotes
    },
    {
      path: '/notes/:id/edit',
      name: 'edit',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: EditTheCrud
    },
    {
      path: '/:',
      name: 'home',
      component: TheEntete
    },
  ]
})

export default router
