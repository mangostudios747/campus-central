<template>
  <div>

    <v-navigation-drawer  :color='"accent"' v-model='sidebar' app>
      <!-- -->
      <v-list v-if='$store.state.user'>
        <v-list-item class='px-2'>
          <v-list-item-avatar>
            <v-img :src='$store.state.user.picture_url'></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class='title'>
              {{ $store.state.user.name_display }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ $store.state.user.primary_email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in routes"
          :key='item.title'
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

    <v-app-bar color='secondary' app>
      <v-app-bar-nav-icon @click='sidebar=!sidebar'>
        <template v-slot>
          <v-icon>mdi-{{ sidebar ? 'chevron-left' : 'menu' }}</v-icon>
        </template>
      </v-app-bar-nav-icon>
      <v-app-bar-title v-if='false'>Campus Central</v-app-bar-title>
      <v-spacer></v-spacer>
      <div v-if='$store.state.user'>
        <span>{{ $store.state.user.name_display }}</span>
        <v-avatar class='ml-3' size='40'>
          <img
            :src='$store.state.user.picture_url'
            :alt='$store.state.user.name_display'
          >
          <!-- todo: replace with some meaningful alt text -->
          <!-- todo: make this a profile dropdown -->
        </v-avatar>
      </div>
    </v-app-bar>
    <v-main>

      <nuxt-child />

      <span style='display:none'>{{ JSON.stringify($store.state.user, null, 4) }}</span>
      <!-- todo: fetch some meaningful data about the user -->
      <!-- perhaps have the navbar be courses-to/do-messages -->
    </v-main>
  </div>
</template>

<script>
export default {
  name: 'app',
  middleware: 'storeUser',
  layout: 'appLayout',
  data: () => ({
    //user: null
    sidebar: true,
    routes: [{ title: 'Home', icon: 'mdi-home', to: '/app' }, {
      title: 'Todo',
      icon: 'mdi-format-list-checks',
      to: '/app/todo'
    }, { title: 'Courses', icon: 'mdi-book-multiple', to: '/app/courses' }, {
      title: 'Profile',
      icon: 'mdi-account',
      to: '/app/profile'
    },
      {
        title: 'Messages',
        icon: 'mdi-mail',
        to: '/app/messages'
      }
    ]
  })
  /*async asyncData(ctx) {

    const user = ctx.req.user
    return {user}
  },
  fetchOnServer: true*/
}
</script>

<style scoped>

</style>
