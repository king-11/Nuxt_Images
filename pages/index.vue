<template>
  <v-container fluid>
    <client-only>
      <v-row v-if="$fetchState.pending" align="center" justify="space-around">
        <v-col
          v-for="n in 4"
          :key="n"
          class="py-2 px-1"
          lg="3"
          md="4"
          sm="6"
          cols="12"
        >
          <v-skeleton-loader
            class="mx-auto"
            max-width="300"
            type="card"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row v-else align="center" justify="space-around">
        <v-col
          v-for="image in images"
          :key="image.id"
          class="py-2 px-1"
          lg="3"
          md="4"
          sm="6"
          cols="12"
        >
          <v-hover v-slot="{ hover }">
            <v-card tile class="d-flex flex-column flex-grow-1">
              <v-img
                loading="lazy"
                :src="image.link"
                aspect-ratio="1"
                class="grey lighten-2"
              >
                <v-expand-transition>
                  <div
                    v-if="hover"
                    class="d-flex transition-fast-in-out black darken-2 v-card--reveal white--text"
                    style="height: 100%"
                  >
                    <div class="text-h4">{{ image.place }}</div>
                    <div class="text-h5">By : {{ image.name | getId }}</div>
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
              <v-btn
                aria-label="Navigate to Detail Page"
                large
                icon
                fab
                router
                :to="`/image/${image.id}`"
                exact
                right
                absolute
              >
                <v-icon color="pink">
                  {{ mdiArrowRightDropCircleOutline }}
                </v-icon>
              </v-btn>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
      <nuxt-link
        v-show="$auth.loggedIn"
        exact
        to="/upload"
        style="text-decoration: none"
      >
        <v-btn color="pink darken-1" dark x-large absolute bottom right fab>
          <v-icon>{{ mdiPlus }}</v-icon>
        </v-btn>
      </nuxt-link>
    </client-only>
  </v-container>
</template>
<script lang="ts">
import Vue from 'vue'
import { mdiPlus, mdiArrowRightDropCircleOutline } from '@mdi/js'

interface Data {
  mdiPlus: string
  mdiArrowRightDropCircleOutline: string
  images: any
}

export default Vue.extend({
  filters: {
    getId: (val: string) => val.slice(26, -1),
  },
  data(): Data {
    return {
      mdiPlus,
      mdiArrowRightDropCircleOutline,
      images: [],
    }
  },
  async fetch() {
    const response = await this.$axios.$get('/api/')
    response.results.forEach((val: any) => {
      this.images.push({
        link: val.link,
        id: val.id,
        name: val.person.instaHandle || val.person.name,
        place: val.place,
      })
    })
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
