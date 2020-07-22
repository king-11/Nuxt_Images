<template>
  <v-container>
    <h1>Register</h1>
    <UserAuthForm
      buttonText="Register"
      :submitForm="registerUser"
      :register="true"
    />
    <v-snackbar v-model="snackbar" bottom right timeout="4000" color="error">
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
    }
  },
  components: {
    UserAuthForm,
  },
  methods: {
    async registerUser(registrationInfo) {
      try {
        let response = await this.$axios.post('/auth/register/', {
          ...registrationInfo,
        })

        await this.$auth.loginWith('local', {
          data: {
            username: loginInfo.username,
            password: loginInfo.password,
          },
        })
        this.error_message = ''
        this.$router.push('/')
      } catch (e) {
        this.snackbar = true
        this.error_message = e.response.message
      }
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
