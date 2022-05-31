import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Reservation from '../views/Reservation.vue'
import Contact from '../views/Contact.vue'
import Private from '../views/Private.vue'
import Calender from '../views/Calender.vue'
import Order from '../views/Order.vue'
import HomeFi from '../views/HomeFi.vue'


import PasswordReset from '../views/PasswordReset.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/en',
    name: 'HomeFi',
    component: HomeFi
  },
  {
    path: '/reservation',
    name: 'Reservation',
    component: Reservation
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/private',
    name: 'Private',
    component: Private
  },
  {
    path: '/calender',
    name: 'Calender',
    component: Calender
  },
  {
    path: '/reset',
    name: 'PasswordReset',
    component: PasswordReset
  },
  {
    path: '/order',
    name: 'Order',
    component: Order
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
