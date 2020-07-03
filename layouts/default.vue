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

    .page-enter-active, .page-leave-active {
      transition: all 0.8s ease-in;
    }

    .page-enter {
      transform: translateY(-100%) scaleX(0) translateZ(0);
      transform-origin: left;
      opacity: 0;
    }

    .page-leave-to {
      transform: translateY(100%);
      opacity: 0;
    }

  </style>
</template>
