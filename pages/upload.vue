<template>
  <v-container>
    <v-row justify="center" class="ma-4">
      <v-col>
        <v-card class="d-flex flex-column mx-auto" max-width="700">
          <transition name="scale-transition">
            <v-img
              v-show="url"
              :key="url"
              loading="lazy"
              :src="url"
              contain
            ></v-img>
          </transition>
        </v-card>
      </v-col>
    </v-row>
    <div class="mx-auto" style="max-width: 700px">
      <v-form
        ref="uploadForm"
        v-model="valid"
        lazy-validation
        @submit.prevent="upload"
      >
        <v-file-input
          v-model="file"
          label="Select Image"
          outlined
          accept="image/png, image/jpeg, image/bmp, image/webp"
          :prepend-icon="icons.mdiCameraImage"
          show-size
          loading="false"
          color="pink darken-1"
          @change="previewImage"
        >
        </v-file-input>
        <v-text-field
          v-model="place"
          label="Place"
          :rules="placeRules"
          outlined
        >
          <v-icon slot="prepend" color="pink darken-1">
            {{ icons.mdiImageAlbum }}
          </v-icon>
        </v-text-field>
        <v-combobox
          v-model="tags"
          :items="defaultTags"
          label="Tags"
          multiple
          chips
          outlined
        >
          <template #selection="data">
            <v-chip
              :key="JSON.stringify(data.item)"
              v-bind="data.attrs"
              :input-value="data.selected"
              :disabled="data.disabled"
              @click:close="data.parent.selectItem(data.item)"
            >
              <v-avatar
                class="pink darken-1 white--text"
                left
                v-text="data.item.slice(0, 1).toUpperCase()"
              ></v-avatar>
              {{ data.item }}
            </v-chip>
          </template>
        </v-combobox>
        <div style="display: flex; flex-direction: column">
          <v-btn type="submit" class="pink darken-1 white--text">
            Upload
          </v-btn>
        </div>
      </v-form>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mdiCameraImage, mdiImageAlbum } from '@mdi/js'
import { customAlphabet } from 'nanoid'
import { required } from '../utils/validations'
import { storageRef } from '../utils/firebase'

interface Data {
  file: File | null
  url: string
  place: string
  icons: {
    [name: string]: string | null
  }
  placeRules: [(val: string) => string | true]
  defaultTags: string[]
  tags: string[]
  valid: boolean
}

export default Vue.extend({
  middleware: ['auth'],
  data(): Data {
    return {
      tags: [],
      file: null,
      url: '',
      place: '',
      icons: { mdiCameraImage, mdiImageAlbum },
      placeRules: [required('Place')],
      defaultTags: ['Landscape', 'Portrait', 'B&W'],
      valid: true,
    }
  },
  head: {
    title: 'Upload',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'upload your image for showcasing using this page',
      },
    ],
  },
  computed: {
    form() {
      return this.$refs.uploadForm as Vue & {
        validate: () => boolean
        reset: () => void
      }
    },
  },
  methods: {
    previewImage() {
      if (this.file) this.url = URL.createObjectURL(this.file)
    },
    async upload() {
      const valid = this.form.validate()
      if (!valid || !this.file) return
      const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 15)

      const name = nanoid()

      await storageRef.child(`Images/${name}`).put(this.file)

      const link = await storageRef.child(`Images/${name}`).getDownloadURL()

      await this.$axios.$post('/api/', {
        tag: [
          ...this.tags.map((val) => {
            return {
              name: val,
            }
          }),
        ],
        link,
        place: this.place,
      })

      this.$store.commit('displaySnackbar', {
        message: 'Image has been uploaded',
        color: 'pink',
      })

      this.form.reset()
    },
  },
})
</script>
