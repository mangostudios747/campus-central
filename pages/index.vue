<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      campus central is cool n stuff this is a marketing wall now you feel like logging in
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
