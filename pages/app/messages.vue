<template>
  <div>
    <v-tabs
      background-color='secondary'
      color='#ffffffaa'
      grow
    >
      <v-tab to='/app/messages/inbox'>Inbox</v-tab>
      <v-tab to='/app/messages/sent'>Sent</v-tab>
    </v-tabs>
    <nuxt-child/>
  </div>
</template>

<script>
export default {
  name: 'messages',

}
</script>

<style scoped>

</style>
