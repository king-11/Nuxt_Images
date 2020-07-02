<template>
  <v-app dark>
    <Navbar />
    <v-main>
    <Nuxt />
    </v-main>
  </v-app>
</template>

  <script>
    import Navbar from '~/components/Navbar.vue'
    export default {
      components: {
        Navbar,
      },
    }
  </script>

  <style lang="scss">
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
  </style>
</template>
