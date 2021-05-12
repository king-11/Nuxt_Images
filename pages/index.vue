<template>
  <v-container fluid>
    <client-only>
      <v-row v-if="loading" align="center" justify="space-around">
        <v-col
          v-for="n in 4"
          :key="n"
          class="py-2 px-1"
          lg="3"
          md="4"
          sm="6"
          cols="12">
          <v-skeleton-loader
            class="mx-auto"
            max-width="300"
            type="card" />
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
          cols="12">
          <v-hover v-slot="{ hover }">
            <v-card tile class="d-flex flex-column flex-grow-1">
              <v-img
                loading="lazy"
                :src="image.link"
                aspect-ratio="1"
                class="grey lighten-2">
                <v-expand-transition>
                  <div
                    v-if="hover"
                    class="d-flex transition-fast-in-out black darken-2 v-card--reveal white--text"
                    style="height: 100%">
                    <div class="text-h4">
                      {{ image.place }}
                    </div>
                    <div class="text-h5">
                      By : {{ image.name | getId }}
                    </div>
                  </div>
                </v-expand-transition>
                <template #placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center">
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
                absolute>
                <v-icon color="pink">
                  {{ mdiArrowRightDropCircleOutline }}
                </v-icon>
              </v-btn>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
      <v-speed-dial
        v-show="$auth.loggedIn"
        v-model="fab"
        bottom
        right
        open-on-hover
        transition="slide-y-reverse-transition">
        <template #activator>
          <v-btn v-model="fab" color="pink darken-1" large dark fab>
            <v-icon v-if="fab">
              {{ mdiClose }}
            </v-icon>
            <v-icon v-else large>
              {{ mdiVuejs }}
            </v-icon>
          </v-btn>
        </template>
        <nuxt-link exact to="/upload" style="text-decoration: none">
          <v-btn fab dark class="pa-2 cyan darken-3">
            <v-icon large>
              {{ mdiPlus }}
            </v-icon>
          </v-btn>
        </nuxt-link>
        <nuxt-link exact to="/profile" style="text-decoration: none">
          <v-btn fab dark color="pa-2 blue-grey darken-1">
            <v-icon large>
              {{ mdiAccountCircle }}
            </v-icon>
          </v-btn>
        </nuxt-link>
        <nuxt-link exact to="/collection" style="text-decoration: none">
          <v-btn fab dark color="pa-2 amber darken-2">
            <v-icon>{{ mdiFolderMultipleImage }} </v-icon>
          </v-btn>
        </nuxt-link>
      </v-speed-dial>
    </client-only>
  </v-container>
</template>
<script lang="ts">
import Vue from 'vue'
import {
  mdiClose,
  mdiAccountCircle,
  mdiPlus,
  mdiArrowRightDropCircleOutline,
  mdiVuejs,
  mdiFolderMultipleImage,
} from '@mdi/js'

interface Image {
  link: string
  id: string
  name: string
  place: string
}

interface Data {
  mdiClose: string
  mdiAccountCircle: string
  mdiPlus: string
  mdiArrowRightDropCircleOutline: string
  mdiFolderMultipleImage: string
  mdiVuejs: string
  images: Image[]
  fab: boolean
  loading: boolean
}

export default Vue.extend({
  filters: {
    getId: (val: string) => val.slice(26, -1),
  },
  data(): Data {
    return {
      fab: false,
      mdiClose,
      mdiAccountCircle,
      mdiFolderMultipleImage,
      mdiPlus,
      mdiArrowRightDropCircleOutline,
      mdiVuejs,
      images: [],
      loading: false,
    }
  },
  async mounted() {
    this.loading = true
    const response = await this.$axios.$get('/api/')
    response.results.forEach((val: any) => {
      this.images.push({
        link: val.link,
        id: val.id,
        name: val.person.instaHandle || val.person.name,
        place: val.place,
      })
    })
    this.loading = false
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

<style scoped>
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
.v-speed-dial {
  position: absolute;
}

.v-btn--floating {
  position: relative;
}
</style>
