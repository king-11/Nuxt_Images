<template>
  <nav app>
    <v-navigation-drawer v-model="drawer" app fixed>
      <v-list>
        <v-col justify="space-around" align="center">
          <v-avatar color="pink darken-1" size="100">
            <v-img
              v-if="imgSrc && this.$auth.loggedIn"
              :src="imgSrc"
              aspect-ratio="1"
            ></v-img>
            <v-icon v-else dark size="90">
              {{ mdiAccountCircle }}
            </v-icon>
          </v-avatar>
          <client-only>
            <v-list v-show="user">
              <v-list-item v-for="(item, key) in user" :key="item">
                <v-list-item-content>
                  <v-list-item-title>{{ key }}</v-list-item-title>
                  <v-list-item-subtitle>{{ item }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </client-only>
        </v-col>
        <v-list-item
          v-for="item in links"
          :key="item.title"
          :to="item.route"
          router
          exact
          color="pink darken-1"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app hide-on-scroll>
      <v-icon
        large
        aria-label="navbar open"
        class="pink--text text--darken-1 mr-2 mr-md-4"
        @click.stop="drawer = !drawer"
      >
        {{ mdiApps }}
      </v-icon>
      <v-toolbar-title text class="pl-0">
        <nuxt-link
          to="/"
          class="headline font-weight-bold black--text"
          style="text-decoration: none"
        >
          Wallpaper
        </nuxt-link>
        <span class="subheading font-weight-light">Hub</span>
      </v-toolbar-title>
      <v-spacer />
      <client-only>
        <v-btn
          depressed
          outlined
          class="pink darken-1 white--text"
          exact
          :to="this.$auth.loggedIn ? '/' : '/login'"
        >
          <v-icon left>
            {{ mdiExitToApp }}
          </v-icon>
          <span v-show="this.$auth.loggedIn" @click="logout">SignOut</span>
          <span v-show="!this.$auth.loggedIn">SignIn</span>
        </v-btn>
      </client-only>
    </v-app-bar>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  mdiApps,
  mdiExitToApp,
  mdiAccountCircle,
  mdiViewDashboard,
  mdiAccountGroup,
  mdiPartyPopper,
} from '@mdi/js'

import { auth } from '../utils/firebase'

export default Vue.extend({
  data() {
    return {
      links: [
        { title: 'Dashboard', icon: mdiViewDashboard, route: '/' },
        { title: 'Team', icon: mdiAccountGroup, route: '/team' },
        { title: 'Fests', icon: mdiPartyPopper, route: '/fests' },
      ],
      drawer: false,
      mdiExitToApp,
      mdiAccountCircle,
      mdiApps,
      imgSrc: auth.currentUser?.photoURL,
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
  computed: {
    user() {
      if (!this.$auth.loggedIn) return null
      // eslint-disable-next-line camelcase
      const { email, first_name, last_name } = this.$auth.user
      return {
        Email: email,
        // eslint-disable-next-line camelcase
        Name: `${first_name} ${last_name}`,
      }
    },
  },
  watch: {
    user() {
      this.imgSrc = auth.currentUser?.photoURL
    },
  },
  methods: {
    async logout() {
      this.$auth.setToken('local', '')
      this.$auth.setRefreshToken('local', '')
      await Promise.all([this.$auth.logout(), this.$store.dispatch('logout')])
    },
  },
})
</script>

<style lang="scss" scoped></style>
