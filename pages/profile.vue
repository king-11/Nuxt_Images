<template>
  <v-container fluid>
    <v-row v-show="this.$auth.loggedIn" class="grey lighten-4" justify="center">
      <v-col class="text-center">
        <client-only>
          <v-avatar size="120">
            <v-img v-if="imgurl !== 'null'" :src="imgurl" />
            <v-icon v-else color="black" size="150">
              {{ mdiAccountCircleOutline }}
            </v-icon>
          </v-avatar>
          <v-card flat class="grey lighten-4 mt-5">
            <v-card-title
              v-for="(val, key) in user"
              :key="key"
              class="justify-center"
            >
              {{ key }}:{{ val }}
            </v-card-title>
          </v-card>
        </client-only>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mdiAccountCircleOutline, mdiPencil } from '@mdi/js'
import { auth } from '../utils/firebase'

export default Vue.extend({
  middleware: ['auth'],
  data() {
    return {
      mdiAccountCircleOutline,
      mdiPencil,
      user: {} as any,
      imgurl: auth.currentUser?.photoURL,
    }
  },
  async fetch() {
    await this.$auth.fetchUser()

    const data = await this.$axios.$get(`/api/profile/${this.$auth.user.id}/`)

    this.user = Object.keys(data)
      .filter((x) => !!data[x])
      .reduce((obj, cur) => {
        return {
          ...obj,
          [cur.replace(/(^\w$)/, (c) => c.toUpperCase())]: data[cur],
        }
      }, {})
  },
  watch: {
    user() {
      this.imgurl = auth.currentUser?.photoURL
    },
  },
})
</script>

<style lang="scss" scoped></style>
