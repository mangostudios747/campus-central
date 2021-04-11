<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="9">
      <div  class='text-center my-2'>
        <img width='400' :src='$icon(512)'/>
        <h1 class='display-4 mb-3'>Campus Central</h1>
        <h1 class='display-2 grey--text'>All of your Schoology struggles, solved.</h1>
      </div>
      <v-row v-if='false'>
        <v-col>
          <v-card>
            <v-system-bar/>
          </v-card>
        </v-col>
        <v-col>

        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  middleware:'storeUser'
}
</script>
