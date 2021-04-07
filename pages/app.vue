<template>
<div>

  <v-navigation-drawer v-model='sidebar'  app>
    <!-- -->
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          Campus Central
        </v-list-item-title>
        <v-list-item-subtitle>
          The date is SOMETHING
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list
      dense
      nav
    >
      <v-list-item
        v-for="item in [{title:'Home', icon:'mdi-home', to:'/app'},{title:'Courses',icon:'mdi-book-multiple', to:'/app/courses'}]"
        :key="item.title"
        link exact
        :to='item.to'
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

  </v-navigation-drawer>

    <v-app-bar app>
  <v-app-bar-nav-icon @click='sidebar=!sidebar'></v-app-bar-nav-icon>
      <v-app-bar-title v-if='false' >Campus Central</v-app-bar-title>
      <v-spacer></v-spacer>
      <div v-if='$store.state.user'>
        {{$store.state.user.name_display}}
        <v-avatar>
          <img
            :src='$store.state.user.picture_url'
            alt="John"
          >
          <!-- todo: replace with some meaningful alt text -->
          <!-- todo: make this a profile dropdown -->
        </v-avatar></div>
    </v-app-bar>
    <v-main>

    <nuxt-child/>

      <span style='display:none'>{{JSON.stringify($store.state.user, null, 4)}}</span>
    <!-- todo: fetch some meaningful data about the user -->
    <!-- perhaps have the navbar be courses-to/do-messages -->
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
    sidebar: true
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
