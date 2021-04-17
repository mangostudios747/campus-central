<template>
  <div>
    <v-tabs
      :background-color='this.$vuetify.theme.currentTheme.secondary'
      grow :color='this.$vuetify.theme.currentTheme.text'
    >
      <v-tab  to='/app/messages/inbox'>Inbox</v-tab>
      <v-tab to='/app/messages/sent'>Sent</v-tab>
    </v-tabs>
    <nuxt-child/>
  </div>
</template>

<script>
export default {
  name: 'messages',
  middleware(ctx){
    if(ctx.route.fullPath === '/app/messages'){
      ctx.redirect('/app/messages/inbox')
    }
  },
  mounted(){
    console.log(this.$vuetify.theme)
  }
}
</script>

<style scoped>

</style>
