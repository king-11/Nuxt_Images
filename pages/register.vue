<template>
  <v-container fluid class="parallax mx-0 my-0 pt-5 px-5 px-sm-16 px-md-5">
    <v-row justify="center">
      <v-col cols="12" sm="12" md="5" lg="4">
        <div>
          <p class="text-center text-h5 font-weight-bold">
            Register your account
          </p>
        </div>
        <div>
          <p class="text-center text-body-2 text--secondary">
            Have an account?
            <nuxt-link to="/login" exact class="text--secondary">
              Login Now!
            </nuxt-link>
          </p>
        </div>
        <div class="my-8 form-container mx-auto">
          <v-form
            ref="register"
            v-model="valid"
            lazy-validation
            @submit.prevent="register"
          >
            <v-text-field
              v-model="firstName"
              label="First Name"
              :rules="nameRules"
            >
              <v-icon slot="prepend" color="pink darken-1">
                {{ icons.mdiEmail }}
              </v-icon>
            </v-text-field>
            <v-text-field v-model="lastName" label="Last Name">
              <v-icon slot="prepend" color="pink darken-1">
                {{ icons.mdiEmail }}
              </v-icon>
            </v-text-field>
            <v-text-field
              v-model="email"
              label="Email"
              :rules="emailRules"
              :readonly="socialAuth"
            >
              <v-icon slot="prepend" color="pink darken-1">
                {{ icons.mdiEmail }}
              </v-icon>
            </v-text-field>
            <transition name="block">
              <div v-if="!socialAuth">
                <v-text-field
                  v-model="password"
                  label="Password"
                  :type="passwordShow ? 'text' : 'password'"
                  :rules="passwordRules"
                >
                  <v-icon slot="prepend" color="pink darken-1">
                    {{ icons.mdiDominoMask }}
                  </v-icon>
                  <v-icon
                    slot="append"
                    color="pink"
                    aria-label="password show hide"
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
                <v-text-field
                  v-model="confirmPassword"
                  label="Confirm Password"
                  :type="confirmPasswordShow ? 'text' : 'password'"
                  :rules="confirmPasswordRules"
                >
                  <v-icon slot="prepend" color="pink darken-1">
                    {{ icons.mdiDominoMask }}
                  </v-icon>
                  <v-icon
                    slot="append"
                    color="pink darken-1"
                    aria-label="password show hide"
                    @click="confirmPasswordShow = !confirmPasswordShow"
                  >
                    <slot v-if="confirmPasswordShow">
                      {{ icons.mdiEye }}
                    </slot>
                    <slot v-else>
                      {{ icons.mdiEyeOff }}
                    </slot>
                  </v-icon>
                </v-text-field>
              </div>
            </transition>
            <div class="buttonContainer">
              <v-btn type="submit" class="pink--text text--darken-1">
                Register
              </v-btn>
            </div>
          </v-form>
        </div>
      </v-col>
      <v-col cols="12" sm="12" md="5" lg="4">
        <p class="text-center text-subtitle text-md-h6">
          Register using social media to get quick access
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
            <span class="text-capitalize"
              >Register with {{ content.name }}</span
            >
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
import {
  required,
  emailFormat,
  minLength,
  equality,
  maxLength,
} from '../utils/validations'

export default Vue.extend({
  middleware: ['auth'],
  data() {
    return {
      valid: true,
      snackbar: false,
      passwordShow: false,
      confirmPasswordShow: false,
      error_message: '',
      color: '',
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      idToken: '',
      socialAuth: false,
      emailRules: [emailFormat(), required('Email')],
      passwordRules: [required('Password'), minLength('Password', 8)],
      nameRules: [required('First Name'), maxLength('First Name', 15)],
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
  computed: {
    confirmPasswordRules() {
      const pass = (this as unknown) as { password: string }
      return [equality('Password', pass.password)]
    },
    form() {
      return this.$refs.register as Vue & {
        validate: () => boolean
        reset: () => void
      }
    },
  },
  methods: {
    async socialAuthHandle(name: string) {
      const user = (await this.$store.dispatch(`login${name}`)) as User
      if (!user) return
      this.socialAuth = true
      this.email = user.email || ' '
      this.firstName = user.displayName?.split(' ')[0] || 'Default'
      this.lastName = user.displayName?.split(' ').slice(1).join(' ') || ' '
      this.idToken = await user.getIdToken()
    },
    async register() {
      const value = this.form.validate()
      if (!value) return

      if (!this.socialAuth) {
        const credentials = { email: this.email, password: this.password }
        const user = (await this.$store.dispatch(
          'emailRegister',
          credentials
        )) as User | null
        if (!user) return
        this.idToken = await user.getIdToken()
      }

      await this.$axios.$post('auth/register/', {
        id_token: this.idToken,
        first_name: this.firstName,
        last_name: this.lastName || ' ',
      })

      this.form.reset()
      if (this.socialAuth) {
        await this.$auth.loginWith('local', {
          data: { id_token: this.idToken },
        })
      }
    },
  },
  head: {
    title: 'Register',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Wallpaper Hub Register Page',
      },
    ],
  },
  auth: 'guest',
})
</script>

<style scoped src="../assets/scss/form.scss" lang="scss"></style>
