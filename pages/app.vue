<template>
<div>
    <v-app-bar app>
      <v-app-bar-title >Campus Central</v-app-bar-title>
      <v-spacer></v-spacer>
      <div v-if='user'>
        {{$store.state.user.name_display}}
        <v-avatar>
          <img
            :src='$store.state.user.picture_url'
            alt="John"
          >
        </v-avatar></div>
    </v-app-bar>
    <v-main>
  <div>
    {{JSON.stringify($store.state.user, null, 4)}}
  </div>
  </v-main>
</div>
</template>

<script>
export default {
  name: 'app',
  middleware:'storeUser',
  layout: 'appLayout',
  data: ()=>({
    //user: null
  }),
  /*async asyncData(ctx) {

    const user = ctx.req.user
    return {user}
  },
  fetchOnServer: true*/
}
</script>

<style scoped>

</style>
