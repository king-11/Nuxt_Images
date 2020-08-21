<template>
  <v-layout class="mt-5" wrap align-center justify-center>
    <v-flex xs12>
      <h1 align="center">Login</h1>
    </v-flex>
    <v-btn @click="google">Google</v-btn>
    <v-btn @click="facebook">Facebook</v-btn>
    <v-btn @click="github">GitHub</v-btn>
    <v-snackbar v-model="snackbar" bottom right timeout="4000" :color="color">
      {{ error_message }}
      <template v-slot:action="{ attrs }">
        <v-btn dark text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-layout>
</template>

<script>
import { auth } from 'firebase/app'
export default {
  data() {
    return {
      snackbar: false,
      error_message: '',
      color: '',
    }
  },
  methods: {
    github() {
      this.$store.dispatch('loginGithub')
    },
    google() {
      this.$store.dispatch('loginGoogle')
    },
    facebook() {
      this.$store.dispatch('loginFacebook')
    },
  },
  middleware: ['auth'],
  auth: 'guest',
}
</script>

<style lang="scss" scoped>
h1 {
  margin-top: 10px;
}
</style>
