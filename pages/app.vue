<template>
  <div style='height: 100%;'>

    <v-navigation-drawer :mini-variant='mini' class='sidenav blurred-box' v-model='sidebar' app>
      <!-- -->

      <v-list v-if='$store.state.user'>
        <v-list-item v-if='mini' class='pl-2'>
          <v-btn
            icon @click.stop='mini = !mini'
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
        <v-list-item class='px-2'>
          <v-list-item-avatar>
            <v-img :src='$store.state.user.picture_url'></v-img>
          </v-list-item-avatar>

          <v-list-item-title> {{ $store.state.user.name_display }}</v-list-item-title>

          <v-btn
            icon
            @click.stop='mini = !mini'
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-list-item>

      </v-list>

      <v-divider></v-divider>



      <v-list
        dense
        nav
        v-if='$store.state.user'
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
            <v-list-item-title><span>{{ item.title }}</span></v-list-item-title>

          </v-list-item-content>
          <v-list-item-content v-if='item.new' class='text-right' style='flex: none'>
            <v-chip class='text-center justify-center'
                    label
                    small
                    text-color='coveredBG'
                    color='accent'
            ><span class='font-weight-bold'>NEW</span>
            </v-chip>
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
          <v-list-item-content v-if='item.new' class='text-right' style='flex: none'>
            <v-chip class='text-center justify-center'
                    label
                    small
                    draggable
                    text-color='coveredBG'
                    color='accent'
            ><span class='font-weight-bold'>NEW</span>
            </v-chip>
          </v-list-item-content>
        </v-list-item>

      </v-list>
      <v-list dense nav v-else>
        <v-list-item
          v-for='item in basicRoutes'
          :key='item.title'
          link
          :exact='!item.inexact'
          :to='item.to'
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title><span>{{ item.title }}</span></v-list-item-title>

          </v-list-item-content>
          <v-list-item-content v-if='item.new' class='text-right' style='flex: none'>
            <v-chip class='text-center justify-center'
                    label
                    small
                    text-color='coveredBG'
                    color='accent'
            ><span class='font-weight-bold'>NEW</span>
            </v-chip>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-spacer class='pt-16' style='flex-direction: column !important;' />
      <v-list v-if='false' nav dense style='bottom: 0;position: fixed;width: 100%'>

        <v-list-item color='red'  class='v-list-item--active' href='/cc/api/sign-out'>
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>

            <v-list-item-title>Sign out</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color='background' elevation='0' flat app>
      <v-app-bar-title v-if='false'>Campus Central</v-app-bar-title>

      <v-app-bar-nav-icon @click='sidebar=!sidebar'></v-app-bar-nav-icon>
      <v-progress-circular class=' elevation-0 ml-3 mr-5' style='border-radius: 50%'

                           :rotate='270'
                           :size='30'
                           :width='5'
                           :value="$store.getters['hc/currentEvent'].percent"

                           :color="($store.state.hc.customizations[$store.getters['hc/currentEvent'].id]||{color:'blue-grey'}).color"


      ></v-progress-circular>
      <v-toolbar-title v-if="!$store.getters['hc/currentEvent'].isHoliday">
        {{ Math.ceil($store.getters['hc/currentEvent'].remaining || $store.getters['hc/currentEvent'].elapsed) }} mins
        {{ $store.getters['hc/currentEvent'].displayText }} {{ $store.getters['hc/currentEvent'].name }}
      </v-toolbar-title>
      <v-toolbar-title v-else>No school today</v-toolbar-title>
      <div class='block flex flex-grow'></div>
      <breakpoint-detection v-if='dev' />

      <v-menu offset-y offset-x v-if='$store.state.user'>
        <template v-slot:activator="{ on }">
          <v-btn v-on='on' icon>
            <v-avatar  size='40'>
              <img
                :src='$store.state.user.picture_url'
                :alt='$store.state.user.name_display'
              >
              <!-- todo: make this a profile dropdown -->
            </v-avatar>
          </v-btn>

        </template>
        <v-list color='primary'>
          <v-list-item>
            <v-btn href='/cc/api/sign-out' icon><v-icon>mdi-exit-to-app</v-icon></v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main style='height: 100%;'>

      <nuxt-child />

    </v-main>
  </div>
</template>

<script>
export default {
  name: 'app',
  middleware: 'storeUser',
  layout: 'appLayout',
  data: () => ({
    mini: false,
    sidebar: true,
    basicRoutes:[
      {
        title: 'Schedule',
        icon: 'mdi-calendar',
        to: '/app/schedule'
      }
    ],
    routes: [
      { title: 'Home', icon: 'mdi-home', to: '/app' },
      {
        title: 'Schedule',
        icon: 'mdi-calendar',
        to: '/app/schedule'
      }
      ],
    routes2: [
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
        title: 'Grades',
        icon: 'mdi-book-open-variant',
        new: true,
        to: '/app/grades'
      },
      {
        title: 'Settings',
        icon: 'mdi-cog',
        new: true,
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
    const vapp = this
    setInterval(() => {
      vapp.$store.commit('hc/resetTime')
    }, 1000)
    // fetch the courses once!
    if (this.user) {
      try {
        await this.$store.dispatch('setCourses', await this.$axios.$get('/cc/api/users/me/sections'))
        await this.$store.commit('hc/loadCustomizations', await this.$axios.$get('/cc/api/preferences/classes'))
        // this usually raises an error?
        await this.$store.dispatch('hc/bindSchedule')

      } catch (e) {
        console.error(e)
      }
    }
    else {

      let k = JSON.parse(localStorage.customizations || '{}');
      if (k.classes){
        await this.$store.commit('hc/setCustomizations', k.classes)
      }
    }

    //console.log(this.$store.getters['hc/scheduleForDate'](this.$store.state.hc.now))

  },
  computed: {
    dev() {
      return process.env.NODE_ENV !== 'production'
    }
  },
  async asyncData(ctx) {

    const user = ctx.req.user
    return {user}
  },
  //fetchOnServer: true
}
</script>

<style lang='scss'>
@media (max-width: 1263px) {
  .sidenav {
    background-color: rgba(var(--v-coveredBG-base), .50) !important;
    backdrop-filter: blur(20px); // saturate(150%);
  }
}

@media (min-width: 1264px) {
  .sidenav {
    background-color: transparent !important;
  }
}


</style>
