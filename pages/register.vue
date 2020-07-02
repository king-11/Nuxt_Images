<template>
  <v-container>
    <h1>Register</h1>
    <UserAuthForm
      buttonText="Register"
      :submitForm="registerUser"
      :register="true"
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
    async registerUser(registrationInfo) {
      try {
        let response = await this.$axios.post('/auth/register/', {
          username: registrationInfo.username,
          password: registrationInfo.password,
          email: registrationInfo.email,
          first_name: registrationInfo.first_name,
          last_name: registrationInfo.last_name,
        })
        console.log(response)
        // this.$store.state.token = response.data
        await this.$auth.loginWith('local', {
          data: {
            username: loginInfo.username,
            password: loginInfo.password,
          },
        })

        this.$router.push('/')
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
