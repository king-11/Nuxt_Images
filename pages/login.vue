<template>
  <v-container>
    <h1>Login</h1>
    <UserAuthForm
      buttonText="Login"
      :submitForm="loginUser"
      :register="false"
    />
  </v-container>
</template>

<script>
import UserAuthForm from '@/components/UserAuthForm'

export default {
  components: {
    UserAuthForm,
  },
  methods: {
    async loginUser(loginInfo) {
      try {
        let response = await this.$auth.loginWith('local', {
          data: {
            username: loginInfo.username,
            password: loginInfo.password,
          },
        })
        // this.$router.push('/')
        console.log(response.data.token)
      } catch (e) {
        console.log(e.response)
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
