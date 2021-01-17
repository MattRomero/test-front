<template>
  <div id="app">
    <SignIn msg="Sign In"/>
    <hr class="my-5">
    <Register msg="Register"/>
  </div>
</template>

<script>
import SignIn from './components/SignIn.vue'
import Register from './components/Register.vue'

export default {
  name: 'app',
  components: {
    SignIn, Register
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
