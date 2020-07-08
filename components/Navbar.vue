<template>
  <nav>
    <v-app-bar app hide-on-scroll>
      <v-app-bar-nav-icon class="ml-2">
        <v-icon left large color="pink" @click="drawer = !drawer"
          >mdi-menu</v-icon
        >
      </v-app-bar-nav-icon>
      <v-toolbar-title text to="/" class="pl-0"
        ><span class="headline font-weight-bold">Wallpaper</span>
        <span class="subheading font-weight-light">Hub</span></v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-btn
        depressed
        outline
        class="pink white--text"
        :to="isAuthenticated ? ' ' : '/login'"
      >
        <v-icon left>mdi-exit-to-app</v-icon>
        <span v-if="isAuthenticated" @click="logout">SignOut</span>
        <span v-else>SignIn</span>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer app temporary absolute v-model="drawer">
      <v-list nav>
        <v-list-item
          v-for="item in links"
          :key="item.title"
          link
          :to="`/${item.route}`"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      links: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', route: '' },
        { title: 'Team', icon: 'mdi-account-group', route: '/team' },
        { title: 'Fests', icon: 'mdi-party-popper', route: 'fests' },
      ],
      drawer: false,
    }
  },
  computed: { ...mapGetters(['isAuthenticated', 'loggedInUser']) },
  methods: {
    async logout() {
      try {
        await this.$auth.logout()
      } catch (error) {}
    },
  },
}
</script>

<style lang="scss" scoped></style>
