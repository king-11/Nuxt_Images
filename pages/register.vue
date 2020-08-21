<template>
  <v-layout class="mt-5" wrap align-center justify-center>
    <v-flex xs12>
      <h1 align="center">Register</h1>
    </v-flex>
    <v-snackbar v-model="snackbar" bottom right timeout="4000" color="error">
      {{ error_message }}
      <template v-slot:action="{ attrs }">
        <v-btn dark text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      snackbar: false,
      error_message: '',
    }
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
        this.color = 'error'
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
