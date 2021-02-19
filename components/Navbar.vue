<template>
  <v-app-bar app hide-on-scroll>
    <v-toolbar-title text class="pl-0">
      <nuxt-link
        to="/"
        class="headline font-weight-bold black--text"
        style="text-decoration: none">
        Wallpaper
      </nuxt-link>
      <span class="subheading font-weight-light">Hub</span>
    </v-toolbar-title>
    <v-spacer />
    <client-only>
      <v-btn
        depressed
        outlined
        class="pink darken-1 white--text mr-md-9"
        exact
        :to="this.$auth.loggedIn ? '/' : '/login'"
        @click="logout">
        <v-icon left>
          {{ mdiExitToApp }}
        </v-icon>
        <span v-show="this.$auth.loggedIn">SignOut</span>
        <span v-show="!this.$auth.loggedIn">SignIn</span>
      </v-btn>
    </client-only>
    <github />
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'
import { mdiExitToApp } from '@mdi/js'
import Github from './github.vue'

export default Vue.extend({
  data() {
    return {
      Github,
      mdiExitToApp,
    }
  },
  head: {
    title: 'Login',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Social Auth login page for wallpaper hub',
      },
    ],
  },
  methods: {
    async logout() {
      if (!this.$auth.loggedIn) return

      this.$auth.setToken('local', '')
      this.$auth.setRefreshToken('local', '')
      await Promise.all([this.$auth.logout(), this.$store.dispatch('logout')])
    },
  },
})
</script>

<style lang="scss" scoped></style>
