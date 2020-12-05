<template>
  <v-container fluid>
    <v-row align="center" justify="space-around">
      <v-col
        v-for="n in 9"
        :key="n"
        class="py-2 px-1"
        lg="3"
        md="4"
        sm="6"
        cols="12"
      >
        <v-lazy
          min-height="200"
          :options="{
            threshold: 0.7,
          }"
          transition="fade-transition"
        >
          <v-hover v-slot="{ hover }">
            <v-card tile class="d-flex flex-column">
              <v-img
                :src="`https://picsum.photos/seed/${n}/500/300`"
                :lazy-src="`https://picsum.photos/seed/${n}/500/300`"
                aspect-ratio="1"
                class="grey lighten-2"
              >
                <v-expand-transition>
                  <div
                    v-if="hover"
                    class="d-flex transition-fast-in-out black darken-2 v-card--reveal display-2 white--text"
                    style="height: 100%"
                  >
                    <div>nimeria</div>
                    <div>paryatak</div>
                  </div>
                </v-expand-transition>
                <template #placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular indeterminate color="grey lighten-5" />
                  </v-row>
                </template>
              </v-img>
              <v-btn aria-label="like" large icon fab right absolute>
                <v-icon color="pink">
                  {{ mdiHeartOutline }}
                </v-icon>
              </v-btn>
            </v-card>
          </v-hover>
        </v-lazy>
      </v-col>
      <client-only>
        <nuxt-link
          v-show="this.$auth.loggedIn"
          exact
          to="/upload"
          style="text-decoration: none"
        >
          <v-btn color="pink darken-1" dark x-large fixed bottom right fab>
            <v-icon>{{ mdiPlus }}</v-icon>
          </v-btn>
        </nuxt-link>
      </client-only>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import Vue from 'vue'
import { mdiPlus, mdiHeartOutline } from '@mdi/js'
export default Vue.extend({
  data() {
    return {
      mdiPlus,
      mdiHeartOutline,
    }
  },
  head: {
    title: 'Home',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Wallpaper Hub Landing Page',
      },
    ],
  },
  auth: false,
})
</script>

<style>
.v-card--reveal {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;

  padding-left: 10px;
  bottom: 0;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
</style>
