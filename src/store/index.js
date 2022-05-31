import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import '@firebase/firestore';
import '@firebase/auth';
import '@firebase/storage';
import '@firebase/database';
import axios from "axios";


Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: {},
    error: null,
    loading: false,
    checkValue: null,
    checkValueFalse: true,
    orderData: null

  },
  mutations: {


    setUser(state, payload) {
      state.user = payload
    },

    setError(state, payload) {
      state.error = payload
    },

    clearError(state) {
      state.color = null
    },
  },
  actions: {
    orderFunc({ commit }, payload) {
      commit('clearError')
      console.log('order', payload)
      var data = {
        orderInformation: payload,
        orderData: this.state.orderData
      };
      console.log(data)
      const postData = JSON.stringify(data);
      console.log('post-stringfy', postData)
      axios.post("http://localhost:4000/v1/data", postData)

    },
    dataBind({ commit }, payload) {
      commit('clearError')
      this.state.orderData = payload
      console.log('orderData', this.state.orderData)
    },
    signUserIn({ commit }, payload) {
      firebase.auth().signOut()
      commit('setUser', null)
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(() => {
          firebase.auth().onAuthStateChanged(function (user) {

            const newUser = {
              id: user.uid,
            }
            commit('setUser', newUser)

          })
        }
        ).catch(
          error => {
            commit('setError', error)
          }
        )
    },


    passwordReset({ commit }, payload) {

      commit('clearError')
      firebase.auth().sendPasswordResetEmail(payload.email)
        .then(() => {
          commit('success', "Password reset code send Successfully")

        })
        .catch((error) => {

          commit('setError', error)
        });
    },
    signUserUp({ commit }, payload) {
      firebase.auth().signOut()
      commit('setUser', null)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setUser', null)
            const newUser = {
              id: user.uid,
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setError', error)
          }
        )
    },
    signUpWithGoogle({ commit }) {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then((result) => {

        var user = result.user;
        if (user) {
          //if user signup then update
          let newUser = {
            id: user.uid,
            userPhoto: user.photoURL,
            name: user.displayName,
            email: user.email
          }
          commit('setUser', newUser)
          // update function call 
        }
      }).catch(error => {
        commit('setError', error.message)
      });
    },
    //   signn in & signup with facebook
    signInWithFacebook({ commit }) {
      firebase.auth().signOut()
      commit('setUser', null)
      const provider = new firebase.auth.FacebookAuthProvider()
      firebase.auth().signInWithPopup(provider).then((result) => {
        commit('setUser', null)
        var user = result.user;
        if (user) {
          console.log(result)
          //if user signup then update
          let newUser = {
            id: user.uid,
            userPhoto: result.additionalUserInfo.profile.picture.data.url,
            name: user.displayName,
            email: user.email
          }
          commit('setUser', newUser)
          // update function call 
        }
      }).catch(error => {
        commit('setError', error.message)
      })
    },
    //   signn in & signup with twitter
    //if user allready sing in
    autoSignIn({ commit }, payload) {
      commit('setUser', null)
      this.state.user = null
      console.log('auth', payload)
      let newUser = {
        id: payload.uid,
        name: payload.displayName,
        email: payload.email,
        userPhoto: payload.photoURL
      }
      commit('setUser', newUser)
    },
    //logout
    logOut({ commit }) {
      commit('setUser', null)
      this.state.user = null
      firebase.auth().signOut()

    },
  },
  getters: {
    user(state) {
      return state.user
    },
    error(state) {
      return state.error
    },

  }
})