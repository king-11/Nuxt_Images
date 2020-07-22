<template>
  <nav app>
    <v-navigation-drawer app fixed v-model="drawer">
      <v-list>
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
      <v-app-bar-nav-icon
        large
        class="pink--text"
        @click.stop="drawer = !drawer"
      />
      <v-toolbar-title text to="/" class="pl-0"
        ><span class="headline font-weight-bold">Wallpaper</span>
        <span class="subheading font-weight-light">Hub</span></v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-btn
        depressed
        outlined
        class="pink white--text"
        :to="isAuthenticated ? ' ' : '/login'"
      >
        <v-icon left>mdi-exit-to-app</v-icon>
        <span v-if="isAuthenticated" @click="logout">SignOut</span>
        <span v-else>SignIn</span>
      </v-btn>
    </v-app-bar>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      links: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', route: '/' },
        { title: 'Team', icon: 'mdi-account-group', route: '/team' },
        { title: 'Fests', icon: 'mdi-party-popper', route: '/fests' },
      ],
      drawer: false,
    }
  },
  computed: { ...mapGetters(['isAuthenticated', 'loggedInUser']) },
  methods: {
    async logout() {
        await this.$auth.logout()
    },
  },
}
</script>

<style lang="scss" scoped></style>
