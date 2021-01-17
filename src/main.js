import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase'

firebase.initializeApp({
  apiKey: "AIzaSyBNpr-ziuoAI-F_vgjjjMetkghT-Amg71Q",
  authDomain: "weighty-7bc57.firebaseapp.com",
  projectId: "weighty-7bc57",
  storageBucket: "weighty-7bc57.appspot.com",
  messagingSenderId: "719031962826",
  appId: "1:719031962826:web:3ba9acfa0dd850a17b7833"
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
