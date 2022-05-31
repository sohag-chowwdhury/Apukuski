import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase/app'
import 'firebase/firestore'
import BootstrapVue from 'bootstrap-vue'
import router from './router'
import { store } from './store'

//3rd party library 
import * as VueGoogleMaps from "vue2-google-maps" // Import package

//global Component
import SignUp from './components/Auth/SignUp.vue'
import LogIn from './components/Auth/LogIn.vue'

import PasswordReset from './components/Auth/PasswordReset.vue'
import Navbar from './components/Navbar/Navbar.vue'
import Order from './components/Share/Order.vue'
import OrderFi from './components/Share/OrderFi.vue'







Vue.component('sign-up', SignUp)
Vue.component('log-in', LogIn) 
Vue.component('navbar', Navbar)
Vue.component('order', Order) 
Vue.component('order-fi', OrderFi) 


Vue.component('password-reset', PasswordReset)


import Vuetify from 'vuetify'
Vue.use(Vuetify);
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDQaMSz3EAEWnTN3M0h8jv3oHVDldO9TS0",
    libraries: "places"
  }
});

Vue.use(Vuetify)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.config.productionTip = false
new Vue({
  vuetify: new Vuetify(),
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp({
    
    })

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
  },

}).$mount('#app')
