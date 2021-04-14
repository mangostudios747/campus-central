<template>
  <div>

    <v-navigation-drawer :color='"accent"' v-model='sidebar' app>
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
          v-for='item in routes'
          :key='item.title'
          link
          :exact='!item.inexact'
          :to='item.to'
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!--<v-list-group
          prepend-icon='mdi-inbox'
          color='white'
          group='/app/messages'


        >
          <template v-slot:activator>

              <v-list-item-content>
                <v-list-item-title>Messages</v-list-item-title>
              </v-list-item-content>

          </template>

          <v-list-item
            to='/app/messages/inbox'
          >
            <v-list-item-icon>
              <v-icon >mdi-inbox-arrow-down</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Inbox</v-list-item-title>
          </v-list-item>
          <v-list-item
            to='/app/messages/sent'
          >
            <v-list-item-icon>
              <v-icon >mdi-inbox-arrow-up</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Sent</v-list-item-title>
          </v-list-item>
        </v-list-group>-->
      </v-list>

    </v-navigation-drawer>

    <v-app-bar color='secondary' elevation='0' flat app>
      <v-app-bar-nav-icon @click='sidebar=!sidebar'>
        <template v-slot>
          <v-icon>mdi-{{ sidebar ? 'chevron-left' : 'menu' }}</v-icon>
        </template>
      </v-app-bar-nav-icon>
      <v-app-bar-title v-if='false'>Campus Central</v-app-bar-title>

      <v-progress-circular class=" elevation-0 mr-5" style="border-radius: 50%"

                           :rotate="270"
                           :size="30"
                           :width="5"
                           :value="$store.getters['hc/currentEvent'].percent"

                           :color="($store.state.hc.customizations[$store.getters['hc/currentEvent'].id]||{color:'blue-grey'}).color"


      ></v-progress-circular>
      <v-toolbar-title>{{Math.ceil($store.getters['hc/currentEvent'].remaining||$store.getters['hc/currentEvent'].elapsed)}} mins
        {{ $store.getters['hc/currentEvent'].displayText }} {{ $store.getters['hc/currentEvent'].name }}</v-toolbar-title>

      <v-spacer></v-spacer>
      <div v-if='$store.state.user'>
        <span>{{ $store.state.user.name_display }}</span>
        <v-avatar class='ml-3' size='40'>
          <img
            :src='$store.state.user.picture_url'
            :alt='$store.state.user.name_display'
          >
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
    },
      { title: 'Courses',
        icon: 'mdi-book-multiple',
        to: '/app/courses',
        inexact: true
      },
      {
        title: 'Profile',
        icon: 'mdi-account',
        to: '/app/profile'
      },
      {
        title: 'Messages',
        icon: 'mdi-email',
        to: '/app/messages',
        inexact: true
      },
      {
        title:'Grades',
        icon:'mdi-book-open-variant'
      }
    ]
  }),
  async mounted() {
    const vapp = this;
    setInterval(()=>{
      vapp.$store.commit('hc/resetTime')
    }, 1000);
    // fetch the courses once!
    this.$store.dispatch('setCourses', await this.$axios.$get('/api/users/me/sections'));

  }
  /*async asyncData(ctx) {

    const user = ctx.req.user
    return {user}
  },
  fetchOnServer: true*/
}
</script>

<style scoped>

</style>
