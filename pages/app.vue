<template>
<div>
    <v-app-bar app>
      <v-app-bar-title >Campus Central</v-app-bar-title>
      <v-spacer></v-spacer>
      <div v-if='user'>
        {{user.name_display}}
        <v-avatar>
          <img
            :src='user.picture_url'
            alt="John"
          >
        </v-avatar></div>
    </v-app-bar>
    <v-main>
  <div>
    {{JSON.stringify(user, null, 4)}}
  </div>
  </v-main>
</div>
</template>

<script>
export default {
  name: 'app',
  layout: 'appLayout',
  data: ()=>({
    //user: null
  }),
  async asyncData(ctx) {

    const user = ctx.req.user
    return {user}
  },
  fetchOnServer: true
}
</script>

<style scoped>

</style>
