<template>
  <v-container fluid class="parallax mx-0 my-0 pt-5 px-5 px-sm-16 px-md-5">
    <v-row justify="center">
      <v-col cols="12" sm="12" md="5" lg="4">
        <div>
          <p class="text-center text-h5 font-weight-bold">
            Login into your account
          </p>
        </div>
        <div>
          <p class="text-center text-body-2 text--secondary">
            Don't have an account?
            <nuxt-link to="/register" exact=""> Sign Up Now! </nuxt-link>
          </p>
        </div>
        <div class="my-8 form-container mx-auto">
          <v-form
            ref="emailLogin"
            v-model="valid"
            lazy-validationr
            @submit.prevent="emailLogin"
          >
            <v-text-field v-model="email" label="Email" :rules="emailRules">
              <v-icon slot="prepend" color="pink">
                {{ icons.mdiEmail }}
              </v-icon>
            </v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              :type="passwordShow ? 'text' : 'password'"
              :rules="passwordRules"
            >
              <v-icon slot="prepend" color="pink">
                {{ icons.mdiDominoMask }}
              </v-icon>
              <v-icon
                slot="append"
                color="pink"
                @click="passwordShow = !passwordShow"
              >
                <slot v-if="passwordShow">
                  {{ icons.mdiEye }}
                </slot>
                <slot v-else>
                  {{ icons.mdiEyeOff }}
                </slot>
              </v-icon>
            </v-text-field>
            <div class="buttonContainer">
              <v-btn type="submit" class="pink--text darken-1"> Login </v-btn>
            </div>
          </v-form>
        </div>
        <v-divider class="hidden-md-and-up" />
      </v-col>
      <v-col cols="12" sm="12" md="5" lg="4">
        <p class="text-center text-subtitle text-md-h6">
          Login using social media to get quick access
        </p>
        <div class="buttonContainer mt-10">
          <v-btn
            v-for="content in loginOptions"
            :key="content.name"
            :name="content.name"
            :color="content.color"
            class="white--text my-3"
            @click.native="socialAuthHandle(content.name)"
          >
            <span class="text-capitalize">Signin with {{ content.name }}</span>
            <v-icon right>
              {{ content.icon }}
            </v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

import {
  mdiEmail,
  mdiEye,
  mdiDominoMask,
  mdiFacebook,
  mdiGoogle,
  mdiGithub,
  mdiEyeOff,
} from '@mdi/js'
import { User } from 'firebase'
import { required, emailFormat } from '../utils/validations'

export default Vue.extend({
  middleware: ['auth'],
  data() {
    return {
      valid: true,
      snackbar: false,
      passwordShow: false,
      error_message: '',
      color: '',
      email: '',
      password: '',
      emailRules: [emailFormat(), required('Email')],
      passwordRules: [required('Password')],
      icons: {
        mdiEmail,
        mdiEye,
        mdiDominoMask,
        mdiEyeOff,
      },
      loginOptions: [
        {
          name: 'Facebook',
          color: '#3b5998',
          icon: mdiFacebook,
        },
        {
          name: 'Google',
          color: '#db3236',
          icon: mdiGoogle,
        },
        {
          name: 'Github',
          color: '#333',
          icon: mdiGithub,
        },
      ],
    }
  },
  methods: {
    async socialAuthHandle(name: string) {
      await this.$store.dispatch(`login${name}`)
      await this.apiConnect()
    },
    async emailLogin() {
      const valid = (this.$refs.emailLogin as Vue & {
        validate: () => boolean
      }).validate()
      if (valid) return
      const credentials = {
        email: this.email.trim(),
        password: this.password.trim(),
      }
      await this.$store.dispatch('emailLogin', credentials)
      await this.apiConnect()
    },
    async apiConnect() {
      const idToken = await (this.$store.getters
        .firebaseUser as User).getIdToken()
      try {
        this.$store.commit('setUser', null)
        const response = (await this.$auth.loginWith('local', {
          data: { id_token: idToken },
        })) as { data: { token: string; id: number } }
        this.$store.commit('setToken', `Token ${response.data.token}`)
      } catch (err) {
        console.log(err)
      }
    },
  },
  head: {
    title: 'Login',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Wallpaper Hub Login Page',
      },
    ],
  },
  auth: 'guest',
})
</script>

<style lang="scss" scoped>
.form-container {
  max-width: 600px;
}

.parallax {
  height: 100vh;
  width: 100vw;
  background-image: url('~static/images/background.webp');
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
