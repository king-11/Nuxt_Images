<template>
  <v-app>
    <Navbar />
    <v-main>
      <Nuxt />
    </v-main>
    <v-snackbar
      v-if="snackbar.show"
      :value="snackbar"
      app
      :timeout="5000"
      elevation="20"
      bottom
      rounded
      :color="snackbar.color"
      mb-5>
      <slot>
        <span class="text-center">{{ snackbar.message }}</span>
      </slot>
      <template #action="{ attrs }">
        <v-btn icon text v-bind="attrs" @click="closeSnackBar">
          <v-icon>{{ mdiCloseCircleOutline }}</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <v-footer app padless>
      <v-row class="justify-space-around pb-1">
        <v-col class="text-center pink darken-1 white--text">
          &copy; {{ new Date().getFullYear() }} — <strong>Lakshya</strong>
        </v-col>
        <v-col class="text-center pink darken-1 white--text">
          Pictorial is made with 🍕, ☕ and 💻 ✨
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { mdiCloseCircleOutline } from '@mdi/js'
import Navbar from '~/components/Navbar.vue'

export default Vue.extend({
  components: {
    Navbar,
  },
  data() {
    return {
      mdiCloseCircleOutline,
    }
  },
  computed: {
    snackbar() {
      return this.$store.getters.snackbar
    },
  },
  methods: {
    closeSnackBar() {
      return this.$store.commit('displaySnackbar', { show: false })
    },
  },
})
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.page-enter-active,
.page-leave-active {
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
