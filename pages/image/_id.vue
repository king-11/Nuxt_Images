<template>
  <v-container>
    <v-card class="mx-auto" max-width="700">
      <v-img loading="lazy" contain :src="x.link" />
      <v-card-title class="text-sm-h6 text-md-h5">{{ x.place }}</v-card-title>
      <v-card-subtitle>Clicked by : {{ x.person.name }}</v-card-subtitle>
      <v-card-text>
        <v-btn
          aria-label="Facebook Share"
          color="#1877f2"
          :href="`https://www.facebook.com/sharer/sharer.php?u=${route}`"
        >
          <v-icon left color="white">{{ mdiFacebook }}</v-icon>
          <span class="white--text text-capitalize">Share</span>
        </v-btn>
        <v-btn
          aria-label="Tweet on twitter"
          :href="`https://twitter.com/intent/tweet?text=An%20Amazing%20click%20by%20${instaHandle}%20find%20it%20at%20${route}`"
          class="twitter-share-button"
          data-show-count="false"
          color="#1DA1F2"
        >
          <v-icon left color="#F5F8FA">
            {{ mdiTwitter }}
          </v-icon>
          <span class="white--text text-capitalize">Tweet</span>
        </v-btn>
        <v-btn
          v-if="instaHandle"
          aria-label="Follow the photographer"
          :href="instaHandle"
          class="instagram"
        >
          <v-icon left color="white">
            {{ mdiInstagram }}
          </v-icon>
          <span class="text-capitalize white--text">Follow</span>
        </v-btn>
      </v-card-text>
      <v-divider class="mt-6 mx-4"></v-divider>
      <v-card-actions class="px-3">
        <v-chip-group column>
          <v-chip class="mt-1" color="pink darken-1" label text-color="white">
            <v-icon left>
              {{ mdiLabel }}
            </v-icon>
            Tags
          </v-chip>
        </v-chip-group>
        <v-spacer />
        <v-chip-group column>
          <v-chip
            v-for="elem in x.tag"
            :key="elem.name"
            color="white"
            class="pink--text text--darken-1"
            column
          >
            {{ elem.name }}
          </v-chip>
        </v-chip-group>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mdiLabel, mdiTwitter, mdiInstagram, mdiFacebook } from '@mdi/js'
export default Vue.extend({
  async asyncData({ $axios, params }) {
    const id = params.id
    const x = await $axios.$get(`/api/image/${id}/`)
    return { id, x }
  },
  data() {
    return {
      mdiLabel,
      mdiTwitter,
      mdiInstagram,
      mdiFacebook,
      route: `https://pictorial.netlify.app/${this.$route.fullPath}`,
    }
  },
  head: {
    title: `Image`,
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Single beautiful image for downloading and sharing',
      },
    ],
  },
  auth: false,
})
</script>

<style>
.instagram {
  background: -moz-linear-gradient(
    45deg,
    #f09433 0%,
    #e6683c 25%,
    #dc2743 50%,
    #cc2366 75%,
    #bc1888 100%
  );
  background: -webkit-linear-gradient(
    45deg,
    #f09433 0%,
    #e6683c 25%,
    #dc2743 50%,
    #cc2366 75%,
    #bc1888 100%
  );
  background: linear-gradient(
    45deg,
    #f09433 0%,
    #e6683c 25%,
    #dc2743 50%,
    #cc2366 75%,
    #bc1888 100%
  );
}
</style>
