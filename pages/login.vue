<template>
  <v-container>
    <h1>Login</h1>
    <UserAuthForm
      buttonText="Login"
      :submitForm="loginUser"
      :register="false"
    />
    <v-snackbar v-model="snackbar" bottom right timeout="4000" :color="color">
      {{ error_message }}
      <template v-slot:action="{ attrs }">
        <v-btn dark text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import UserAuthForm from '@/components/UserAuthForm'

export default {
  data() {
    return {
      snackbar: false,
      error_message: '',
      color: '',
    }
  },
  components: {
    UserAuthForm,
  },
  methods: {
    async loginUser(loginInfo) {
      try {
        this.error_message = 'Authenticating ...'
        this.color = 'info'
        this.snackbar = true
        await this.$auth.loginWith('local', {
          data: {
            ...loginInfo,
          },
        })
        this.$router.push('/')
      } catch (e) {
        this.error_message = 'Invalid Credentials'
        this.color = 'error'
        this.snackbar = true
      }
    },
  },
  middleware: ['auth'],
  auth: 'guest'
}
</script>

<style lang="scss" scoped>
h1 {
  margin-top: 10px;
}
</style>
