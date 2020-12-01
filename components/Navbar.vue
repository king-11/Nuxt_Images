<template>
  <nav app>
    <v-navigation-drawer app fixed v-model="drawer">
      <v-list>
        <v-col justify="space-around" align="center">
          <v-avatar color="pink" size="70">
            <v-icon dark size="70">{{ mdiAccountCircle }}</v-icon>
          </v-avatar>
          <!-- <v-list v-if="isAuthenticated">
            <v-list-item v-for="(item, key) in loggedInUser" :key="item">
              <v-list-item-content>
                <v-list-item-title>{{ item }}</v-list-item-title>
                <v-list-item-subtitle>{{ key }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>-->
        </v-col>
        <v-list-item v-for="item in links" :key="item.title" :to="item.route" router exact>
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
      <v-icon large class="pink--text mr-2 mr-md-4" @click.stop="drawer = !drawer">
        {{mdiApps}}
      </v-icon>
      <v-toolbar-title text class="pl-0">
        <nuxt-link to="/" class="headline font-weight-bold black--text" style="text-decoration:none">Wallpaper</nuxt-link>
        <span class="subheading font-weight-light">Hub</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn depressed outlined class="pink white--text" :to="isAuthenticated ? '/' : '/login'">
        <v-icon left>{{ mdiExitToApp }}</v-icon>
        <span v-if="isAuthenticated" @click="logout">SignOut</span>
        <span v-else>SignIn</span>
      </v-btn>
    </v-app-bar>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import { mdiApps ,mdiExitToApp, mdiAccountCircle, mdiViewDashboard, mdiAccountGroup, mdiPartyPopper } from '@mdi/js';

export default {
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
      mdiApps
    }
  },
  computed: { ...mapGetters(['isAuthenticated', 'loggedInUser']) },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    },
  },
  mounted() {},
  head: {
    title: 'Login',
    meta:[
      {
        hid: 'description',
        name: 'description',
        content: 'Social Auth login page for wallpaper hub'
      }
    ]
  }
}
</script>

<style lang="scss" scoped></style>
