<template>
  <keep-alive>
    <v-form v-model="valid">
      <v-text-field
        v-model="userInfo.first_name"
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

      <v-btn @click="submitForm(userInfo)" :disabled="!valid">{{
        buttonText
      }}</v-btn>
    </v-form>
  </keep-alive>
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
