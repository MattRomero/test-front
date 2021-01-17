<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p class="lead mt-2">{{ authStatus }}</p>
    <div class="row">
      <form class="col-6 mx-auto text-left">
        <h4>Usuario:</h4>
        <input type="text" v-model="user" class="form-control mb-4">
        <h4>Contraseña:</h4>
        <input type="password" v-model="password" class="form-control">
      </form>
    </div>
    <div class="d-flex my-4 justify-content-center">
      <button @click="register" class="btn btn-outline-primary mx-4">Register ></button>
    </div>
    <p class="lead">{{ response }}</p>
  </div>
</template>

<script>
import axios from 'axios'
import firebase from 'firebase'

const client = axios.create({
  baseURL: 'http://localhost:3000',
  json: true
})

export default {
    name: 'Register',
    data: function() {
        return {
            response: 'No data yet...',
            authStatus: 'No Auth Status',
            user: '',
            password: ''
        }
    },
    props: {
        msg: String
    },
    methods: {
        register() {
            firebase.auth()
            .createUserWithEmailAndPassword(this.user, this.password)
            .then(() => {
                this.authStatus = 'Registered'
            }).catch((err) => {
                console.log(err.code)
                this.authStatus = err
            })
        },
    }
}
</script>
