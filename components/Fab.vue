<template>
  <v-speed-dial
    v-model="fab"
    bottom
    right
    open-on-hover
    transition="slide-x-reverse-transition"
  >
    <template #activator>
      <v-btn v-model="fab" color="pink darken-1" x-large dark fab>
        <v-icon v-if="fab"> {{ mdiClose }} </v-icon>
        <v-icon v-else> {{ mdiAccountCircle }} </v-icon>
      </v-btn>
    </template>
    <v-btn fab dark small color="green">
      <v-icon>{{ mdiPencil }} </v-icon>
    </v-btn>
    <v-btn fab dark small color="indigo">
      <v-icon>{{ mdiPlus }}</v-icon>
    </v-btn>
    <v-btn fab dark small color="red">
      <v-icon>{{ mdiDelete }}</v-icon>
    </v-btn>
  </v-speed-dial>
</template>

<script lang="ts">
import Vue from 'vue'

import {
  mdiClose,
  mdiAccountCircle,
  mdiPencil,
  mdiPlus,
  mdiDelete,
} from '@mdi/js'

export default Vue.extend({
  data() {
    return {
      fab: false,
      mdiClose,
      mdiAccountCircle,
      mdiPencil,
      mdiPlus,
      mdiDelete,
    }
  },
})
</script>
