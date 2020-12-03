<template>
  <nav app>
    <v-navigation-drawer v-model="drawer" app fixed>
      <v-list>
        <v-col justify="space-around" align="center">
          <v-avatar color="pink" size="70">
            <v-icon dark size="70">
              {{ mdiAccountCircle }}
            </v-icon>
          </v-avatar>
          <client-only>
            <v-list v-if="this.$auth.loggedIn">
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
        class="pink--text mr-2 mr-md-4"
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
      <nuxt-link
        :to="this.$auth.loggedIn ? '/' : '/login'"
        style="text-decoration: none"
      >
        <v-btn depressed outlined class="pink white--text">
          <v-icon left>
            {{ mdiExitToApp }}
          </v-icon>
          <client-only>
            <span v-if="this.$auth.loggedIn" @click="logout">SignOut</span>
            <span v-else>SignIn</span>
          </client-only>
        </v-btn>
      </nuxt-link>
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
  methods: {
    async logout() {
      this.$auth.setToken('local', '')
      this.$auth.setRefreshToken('local', '')
      await Promise.all([this.$auth.logout(), this.$store.dispatch('logout')])
    },
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
})
</script>

<style lang="scss" scoped></style>
