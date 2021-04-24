<template>
  <v-app style='height: 100%;' >
  <nuxt/>

    <v-footer
fixed
style='border-top: 1px solid #ffffff22 !important'
      app
color='background'
    >
      <span>&copy; {{ new Date().getFullYear() }} Saumya Singhal</span>
      <v-spacer>
      </v-spacer>
      <v-btn class='discord' href='https://discord.gg/JT36cSWFnS' target='_blank' icon><v-icon>mdi-discord</v-icon></v-btn>
      <v-btn  href='https://github.com/saumyasinghal747/campus-central' target='_blank' icon><v-icon>mdi-github</v-icon></v-btn>
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
.discord:hover {
  color: #7289DA
}
</style>
