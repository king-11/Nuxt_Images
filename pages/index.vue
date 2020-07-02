<template>
  <v-main>
    {{ user }}
  </v-main>
</template>
<script>
export default {
  computed: {
    user: function () {
      if (this.$auth.loggedIn) return this.$auth.user
      else return 'none'
    },
  },
}
</script>

<style></style>
