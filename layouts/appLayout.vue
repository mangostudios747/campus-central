<template>
  <v-app style='height: 100%;' >
  <nuxt/>

    <v-footer
fixed
      app
color='background'
    >
      <span>&copy; {{ new Date().getFullYear() }} Saumya Singhal</span>
      <v-spacer>
      </v-spacer>
      <v-btn href='https://github.com/saumyasinghal747/campus-central' icon><v-icon>mdi-github</v-icon></v-btn>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: ()=>({
  user:null
  }),
  async fetch(ctx) {
    //console.log('THE USER IS',ctx.req.user)
    this.user = ctx.req.user;
  }
}
</script>

<style scoped>

</style>
