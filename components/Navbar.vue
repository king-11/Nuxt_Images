<template>
  <v-app-bar rounded app dark hide-on-scroll id="navbar">
    <v-btn text to="/">Wallpaper Hub</v-btn>
    <v-spacer />
    <v-btn text to="/team">Team</v-btn>
    <v-btn text to="/fests">Fests</v-btn>
    <v-menu app bottom left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn dark icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-if="isAuthenticated">
          <v-list>
            <v-list-item>{{ loggedInUser.username }}</v-list-item>
            <v-list-item text to="/" @click="logout">Logout</v-list-item>
          </v-list>
        </v-list-item>
        <v-list-item v-else>
          <v-list>
            <v-list-item text to="/login">Login</v-list-item>
            <v-list-item text to="/register">Register</v-list-item>
          </v-list>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: { ...mapGetters(['isAuthenticated', 'loggedInUser']) },
  methods: {
    async logout() {
      await this.$auth.logout()
    },
  },
}
</script>

<style lang="scss" scoped></style>
