<template>
  <v-container>
    <v-skeleton-loader
      v-if="$fetchState.pending"
      class="mx-auto"
      type="card"
      max-width="700"
    ></v-skeleton-loader>
    <v-card v-else class="mx-auto" max-width="800">
      <v-btn
        aria-label="Download the Image"
        fab
        top
        right
        absolute
        class="mt-8"
        color="pink darken-1"
      >
        <a :href="link" download>
          <v-icon color="white">{{ mdiDownload }}</v-icon>
        </a>
      </v-btn>
      <v-img loading="lazy" contain :src="link" />
      <v-card-title class="text-sm-h6 text-md-h5">{{ place }}</v-card-title>
      <v-card-subtitle>Clicked by : {{ name }}</v-card-subtitle>
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
            v-for="elem in tags"
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
import {
  mdiLabel,
  mdiTwitter,
  mdiInstagram,
  mdiFacebook,
  mdiDownload,
} from '@mdi/js'
export default Vue.extend({
  data() {
    return {
      mdiLabel,
      mdiTwitter,
      mdiInstagram,
      mdiFacebook,
      mdiDownload,
      tags: [],
      place: '',
      link: '',
      name: '',
      instaHandle: '',
      route: `https://pictorial.netlify.app/${this.$route.fullPath}`,
    }
  },
  async fetch() {
    const id = this.$route.params.id
    const x = await this.$axios.$get(`/api/image/${id}/`)

    this.tags = x.tag
    this.place = x.place
    this.name = x.person.name
    this.instaHandle = x.person.instaHandle
    this.link = x.link
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
