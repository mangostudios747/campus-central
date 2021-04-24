<template>
  <div style='height: 100%;'>

    <v-navigation-drawer :mini-variant='mini'  class='sidenav blurred-box' v-model='sidebar' app>
      <!-- -->

      <v-list   v-if='$store.state.user'>
        <v-list-item v-if='mini' class='pl-2'>
          <v-btn
            icon @click.stop="mini = !mini"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-list-item>


        <v-list-item v-show='false'>
          <v-list-item-content>
            <v-list-item-title class='title'>
              {{ $store.state.user.name_display }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ $store.state.user.primary_email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img :src='$store.state.user.picture_url'></v-img>
          </v-list-item-avatar>

          <v-list-item-title> {{ $store.state.user.name_display }}</v-list-item-title>

          <v-btn
            icon
            @click.stop="mini = !mini"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
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
        <v-list-group
          prepend-icon='mdi-book-multiple'
          color='text'
          group='/app/courses/.*'
        >
          <template v-slot:activator>

              <v-list-item-content>
                <v-list-item-title>Courses</v-list-item-title>
              </v-list-item-content>

          </template>

          <v-list-item
            :class='mini?"":"pl-10"'
            :to='`/app/courses/${section.id}`'
            v-for='section in $store.state.cache.courses'
            :key='section.id'
          >
            <v-list-item-avatar size='25'>
              <v-img :src='section.profile_url'></v-img>
            </v-list-item-avatar>
            <v-list-item-title>{{ section.course_title }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-item
          v-for='item in routes2'
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
      </v-list>

    </v-navigation-drawer>

    <v-app-bar color='background' elevation='0' flat app>
      <v-app-bar-title v-if='false'>Campus Central</v-app-bar-title>

      <v-app-bar-nav-icon  @click='sidebar=!sidebar'></v-app-bar-nav-icon>
        <v-progress-circular class=" elevation-0 ml-3 mr-5" style="border-radius: 50%"

                             :rotate="270"
                             :size="30"
                             :width="5"
                             :value="$store.getters['hc/currentEvent'].percent"

                             :color="($store.state.hc.customizations[$store.getters['hc/currentEvent'].id]||{color:'blue-grey'}).color"


        ></v-progress-circular>
        <v-toolbar-title v-if="!$store.getters['hc/currentEvent'].isHoliday">{{Math.ceil($store.getters['hc/currentEvent'].remaining||$store.getters['hc/currentEvent'].elapsed)}} mins
          {{ $store.getters['hc/currentEvent'].displayText }} {{ $store.getters['hc/currentEvent'].name }}</v-toolbar-title>
        <v-toolbar-title v-else>No school today</v-toolbar-title>


      <v-spacer></v-spacer>
      <breakpoint-detection></breakpoint-detection>
      <div v-if='$store.state.user&& false'>
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
    <v-main style='height: 100%;'>

      <nuxt-child />

      <!--<span style='display:none'>{{ JSON.stringify($store.state.user, null, 4) }}</span>-->


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
    mini:false,
    sidebar: true,
    routes: [
      { title: 'Home', icon: 'mdi-home', to: '/app' },
      {
      title: 'Schedule',
      icon: 'mdi-calendar',
      to: '/app/schedule'
    },
      /*{ title: 'Courses',
        icon: 'mdi-book-multiple',
        to: '/app/courses',
        inexact: true
      }*/],
    routes2:[
      {
        title: 'Updates',
        icon: 'mdi-inbox',
        to: '/app/updates'
      },
      {
        title: 'Messages',
        icon: 'mdi-email',
        to: '/app/messages',
        inexact: true
      },
      {
        title:'Grades',
        icon:'mdi-book-open-variant',
        to:'/app/grades',
      },
      {
        title:'Settings',
        icon:'mdi-cog',
        to: '/app/settings'
      }
    ]
  }),

  async fetch() {
    if (process.browser) return
    try {
      const ref = this.$fire.database.ref('schedule')
      const schedule = (await ref.get()).val()
      //this.$store.commit('hc/updateSchedule', schedule)
    } catch (e) {
      console.error(e)
    }
  },

  async mounted() {
    const vapp = this;
    setInterval(()=>{
      vapp.$store.commit('hc/resetTime')
    }, 1000);
    // fetch the courses once!
    try {
      await this.$store.dispatch('setCourses', await this.$axios.$get('/api/users/me/sections'));
      //await this.$store.dispatch('hc/bindSchedule')
    } catch (e) {
      console.error(e)
    }
    console.log(this.$store.getters['hc/scheduleForDate'](this.$store.state.hc.now))

  }
  /*async asyncData(ctx) {

    const user = ctx.req.user
    return {user}
  },
  fetchOnServer: true*/
}
</script>

<style lang='scss'>
/*.sidenav:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: inset 0 0 3000px rgba(19, 33, 62, 0.8);
  filter: blur(30px);
  background: inherit;
  }*/
@media (max-width: 1263px) {
  .sidenav {
    background-color: rgba(26, 33, 49, .50) !important;
    backdrop-filter: blur(25px);// saturate(150%);
  }

}
@media (min-width: 1264px) {
  .sidenav {
    background-color: transparent !important;
  }

}


</style>
