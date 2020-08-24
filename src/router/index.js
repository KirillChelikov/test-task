import Vue from 'vue'
import VueRouter from 'vue-router'
import ContactInfo from '../components/ContactInfo.vue'
import ContactList from '../components/ContactList.vue'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'List',
    component: ContactList
  },
  {
    path: '/contact/:id',
    name: 'ContactInfo',
    component: ContactInfo,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
