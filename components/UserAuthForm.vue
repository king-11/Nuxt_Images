<template>
  <v-flex xs11 md8 lg6 align-center class="mt-5">
    <v-card
      class="d-flex align-center px-5 pt-2 pb-4 rounded-tl-xl rounded-br-xl"
      outlined
      ripple
    >
      <v-form v-model="valid">
        <v-text-field
          v-model="userInfo.first_name"
          :rules="[required('Name')]"
          label="First Name"
          v-if="register"
        />
        <v-text-field
          v-model="userInfo.last_name"
          label="Last Name"
          v-if="register"
        />
        <v-text-field
          v-model="userInfo.email"
          label="Email"
          v-if="register"
          :rules="[required('email'), emailFormat()]"
        />
        <v-text-field
          v-model="userInfo.username"
          label="Username"
          :rules="[required('username')]"
        />
        <v-text-field
          v-model="userInfo.password"
          label="Password"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          counter="true"
          :rules="[required('password'), minLength('password', 8)]"
        />

        <v-btn
          class="pink white--text"
          @click="submitForm(userInfo)"
          :disabled="!valid"
          >{{ buttonText }}</v-btn
        >
      </v-form>
    </v-card>
  </v-flex>
</template>

<script>
import validations from '@/utils/validations'
export default {
  data() {
    return {
      valid: false,
      showPassword: false,
      userInfo: {
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        username: '',
      },
      ...validations,
    }
  },
  props: ['submitForm', 'buttonText', 'register'],
}
</script>

<style scoped>
form {
  width: 100%;
}
</style>
