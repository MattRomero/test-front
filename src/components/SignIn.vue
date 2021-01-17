<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p class="lead mt-2">Firebase status: {{ authStatus }}</p>
    <div class="row">
      <form class="col-6 mx-auto text-left">
        <h4>Usuario:</h4>
        <input type="text" v-model="user" class="form-control mb-4">
        <h4>Contraseña:</h4>
        <input type="password" v-model="password" class="form-control">
      </form>
    </div>
    <div class="d-flex my-4 justify-content-center">
      <button @click="signIn" class="btn btn-outline-primary mx-4">Sign In ></button>
      <button @click="sendRequest" class="btn btn-outline-success mx-4">Send Request ></button>
      <button @click="sendRequest2" class="btn btn-outline-success mx-4">API GET ></button>
      <button @click="postRequest" class="btn btn-outline-success mx-4">API POST ></button>

      <button @click="signOut" class="btn btn-outline-danger mx-4">Sign Out ></button>
    </div>
    <p class="lead">{{ response }} </p>
    <p>{{ response2 }}</p>
  </div>
</template>

<script>
import axios from 'axios'
import firebase from 'firebase'

const client = axios.create({
  baseURL: 'http://159.89.80.186:3000',
  json: true,
  withCredentials: true
})

export default {
  name: 'HelloWorld',
  data: function() {
    return {
      response: 'No data yet...',
      authStatus: 'No Auth Status',
      user: '',
      password: '',
      idToken: '',
      response2: ''
    }
  },
  props: {
    msg: String
  },
  methods: {
    signIn() {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
      firebase.auth()
      .signInWithEmailAndPassword(this.user, this.password)
      .then(() => {
        this.authStatus = 'Authorized'
        firebase.auth().currentUser.getIdToken(true)
        .then((idToken) => {
          this.idToken = idToken
        })
      }).catch((err) => {
        console.log(err.code)
        this.authStatus = err
      })
    },
    signOut() {
      firebase.auth().signOut().then(() => {
        this.authStatus = 'Unauthorized'
      }).catch((err) => {
        this.authStatus = err
      })
      
      client({
            method: 'get',
            url: '/logout',
      })
    },


    sendRequest() {
      if (firebase.auth().currentUser) {
        firebase.auth().currentUser.getIdToken(true)
        .then((idToken) => {
          client({
            method: 'get',
            url: '/login',
            headers: {
              'AuthToken': idToken
            }
          }).then((res) => {
            this.response = res.data.message
          }).catch((error) => {
            this.response = error
          })
        }).catch((error) => {
          this.response = "Error getting auth token"
        });
      } else {
        client({
          method: 'get',
          url: '/'
        }).then((res) => {
          this.response = res.data.message
        }).catch((error) => {
          this.response = error
        })
      }
    },
    
    sendRequest2() {
      client({
        method: 'get',
        url: '/profile',
      }).then((res) => {
        this.response2 = res.data.message
        console.log(res.data.message)
      }).catch((error) => {
        this.response2 = error
      })
    },

    postRequest() {
      client({
        method: 'post',
        url: '/profile',
        data: {
          test: 'test'
        }
      }).then((res) => {
        this.response2 = res.data.message
      }).catch((error) => {
        this.response2 = error
      })
    }
  }
}
</script>
