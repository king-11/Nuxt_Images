<template>
  <v-main>
    <v-container>
      <h1>Login</h1>
      <UserAuthForm
        buttonText="Login"
        :submitForm="loginUser"
        :register="false"
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
  </v-main>
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
    async loginUser(loginInfo) {
      try {
        await this.$auth.loginWith('local', {
          data: {
            ...loginInfo,
          },
        })
        this.error_message = ''
        this.$router.push('/')
      } catch (e) {
        this.snackbar = true
        console.error(e.response)
        let response = e.response.data
        let str = response[0]
        this.error_message = e.response.statusText
      }
    },
  },
}
</script>

<style lang="scss" scoped>
h1 {
  margin-top: 10px;
}
</style>
