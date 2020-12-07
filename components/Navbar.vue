<template>
  <nav app>
    <v-navigation-drawer v-model="drawer" app fixed>
      <v-list>
        <v-col justify="space-around" align="center">
          <v-avatar color="pink darken-1" size="70">
            <v-icon dark size="70">
              {{ mdiAccountCircle }}
            </v-icon>
          </v-avatar>
          <client-only>
            <v-list v-show="this.$auth.loggedIn">
              <v-list-item v-for="(item, key) in this.$auth.user" :key="item">
                <v-list-item-content>
                  <v-list-item-title>{{ item }}</v-list-item-title>
                  <v-list-item-subtitle>{{ key }}</v-list-item-subtitle>
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
      this.$auth.setToken('local', '')
      this.$auth.setRefreshToken('local', '')
      await Promise.all([this.$auth.logout(), this.$store.dispatch('logout')])
    },
  },
})
</script>

<style lang="scss" scoped></style>
