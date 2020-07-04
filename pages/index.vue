<template>
  <v-main>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-container fluid>
            <v-row>
              <v-col
                v-for="n in 9"
                :key="n"
                class="d-flex child-flex"
                lg="3"
                md="4"
                sm="6"
                cols="12"
              >
                <v-hover v-slot:default="{ hover }">
                  <v-card flat tile class="d-flex">
                    <v-img
                      :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                      :lazy-src="`https://picsum.photos/10/6?image=${
                        n * 5 + 10
                      }`"
                      aspect-ratio="1"
                      class="grey lighten-2"
                    >
                      <v-expand-transition>
                        <div
                          v-if="hover"
                          class="d-flex transition-fast-in-out black darken-2 v-card--reveal display-2 white--text"
                          style="height: 100%;"
                        >
                          <div>nimeria</div>
                          <div>paryatak</div>
                        </div>
                      </v-expand-transition>
                      <template v-slot:placeholder>
                        <v-row
                          class="fill-height ma-0"
                          align="center"
                          justify="center"
                        >
                          <v-progress-circular
                            indeterminate
                            color="grey lighten-5"
                          ></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>
                  </v-card>
                </v-hover>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-main>
</template>
<script>
import axios from 'axios'
export default {
  // async asyncData({ params }) {
  //   const { data } = await axios.get('api/')
  //   return { images: data }
  // },
}
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
