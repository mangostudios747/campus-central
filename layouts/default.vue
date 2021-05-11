<template>
  <v-app dark>
  <v-app-bar color='secondary' app>
    <v-app-bar-title >Campus Central</v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn v-if='!$store.state.user' color='accent' href='/cc/api/sign-in'>login</v-btn>
    <v-btn v-else color='accent' to='/app'>open campus</v-btn>
  </v-app-bar>
    <v-main>

        <nuxt />

    </v-main>

    <v-footer
      color='secondary'
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }} Saumya Singhal</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      user: false,
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  async fetch(ctx) {

    this.user = ctx.req.user;
    //console.log(user)
  },
}
</script>
<style>
.v-app-bar-title__placeholder, .v-app-bar-title__content {
  overflow: hidden;
  text-overflow: initial !important;
  white-space: nowrap;
}
</style>
