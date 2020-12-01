<template>
  <v-container fluid class="parallax mx-0 my-0 pt-5 px-5 px-sm-16 px-md-5">
    <v-row justify="center">
      <v-col cols="12" sm="12" md="5" lg="4">
        <div><p class="text-center text-h5 font-weight-bold">Login into your account</p></div>
        <div>
          <p class="text-center text-body-2 text--secondary">Don't have an account? <nuxt-link to="/register" exact="">Sign Up Now!</nuxt-link></p>
        </div>
        <div class="my-8 form-container mx-auto">
          <v-text-field v-model="email" :rules="emailRules">
              Email
            <v-icon slot="prepend" color="pink">
              {{icons.mdiEmail}}
            </v-icon>
          </v-text-field>
          <v-text-field v-model="password" :rules="passwordRules">
              Password
            <v-icon slot="prepend" color="pink">
              {{icons.mdiDominoMask}}
            </v-icon>
            <v-icon slot="append" color="pink">
              {{icons.mdiEye}}
            </v-icon>
          </v-text-field>
        </div>
      </v-col>
      <v-col cols="12" sm="12" md="5" lg="4">
        <div class="buttonContainer">
          <p class="text-center text-subtitle text-md-h6">Login using social media to get quick access</p>
          <v-btn v-for="content in loginOptions" :key="content.name" :color="content.color" class="white--text my-3">
            <span class="text-capitalize">Signin with {{content.name}}</span>
            <v-icon right>{{content.icon}}</v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { auth } from 'firebase/app'
import { mdiEmail, mdiEye, mdiDominoMask, mdiFacebook, mdiGoogle, mdiGithub } from '@mdi/js'

export default {
  data() {
    return {
      snackbar: false,
      error_message: '',
      color: '',
      email: '',
      password: '',
      emailRules: [
        value => !!value || 'Required.',
        value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
      ],
      passwordRules: [
        value => !!value || 'Required.',
      ],
      icons: {
        mdiEmail,
        mdiEye,
        mdiDominoMask
      },
      loginOptions:[
        {
          name: 'Facebook',
          color: '#3b5998',
          icon: mdiFacebook
        },
        {
          name: 'Google',
          color: '#db3236',
          icon: mdiGoogle
        },
        {
          name: 'Github',
          color: '#333',
          icon: mdiGithub
        }
      ]
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
  head: {
    title: "Login",
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Wallpaper Hub Login Page',
      },
    ]
  }
}
</script>

<style lang="scss" scoped>
.form-container {
  max-width: 600px;
}

.parallax {
  height: 100vh;
  width: 100vw;
  background-image: url('~assets/images/background.webp');
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;


  .col-12 {
    -webkit-backdrop-filter: blur(7px);
    backdrop-filter: blur(7px);
    background-color: rgba(255, 255, 255, 0.4);
  }
}

.buttonContainer {
  display: flex;
  flex-direction: column;
}
</style>
