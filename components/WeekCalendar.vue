<template>

  <v-row class="fill-height">
    <v-col class='big-screen' style='height: calc(100vh - 92px - 48px);padding-bottom: 0'>
      <v-toolbar color="background" dense flat >

        <v-btn @click="()=>{this.$refs['w-calendar'].prev()}" icon><v-icon>mdi-chevron-left</v-icon></v-btn>
        <v-btn @click="()=>{focus=''}" class="mx-3" outlined>Today</v-btn>
        <v-btn @click="()=>{this.$refs['w-calendar'].next()}" icon><v-icon>mdi-chevron-right</v-icon></v-btn>
        <v-spacer/>
        <v-select hide-details style="flex-grow: 0" dense outlined v-model="style" :items="styles" >
        </v-select>
      </v-toolbar>
      <v-calendar

        ref='w-calendar'
        :type='style'
        v-model="focus"
        color='accent'
        event-overlap-mode='column'
        :event-overlap-threshold='10'
        @click:more="viewDay"
        @click:day="viewDay"
        @click:event="showEvent"
        :event-color='e=>e.color||"accentDark"'
        :weekdays='[0,1, 2, 3, 4, 5,6]'
        :events='[...sgyevents]'
      >
      </v-calendar>
      <v-menu v-model="selectedOpen"
              :close-on-content-click="false"
              :activator="selectedElement"
              offset-x>
        <v-card

          max-width="500px"
          flat
        >
          <v-toolbar
            :color="selectedEvent.color"
            dark
          >
            <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
          </v-toolbar>
          <v-card-text v-if="selectedEvent.description">
            <span v-html="selectedEvent.description"></span>
          </v-card-text>
          <v-card-actions>
            <v-btn v-if="selectedEvent.web_url"  text
                    color="accent" target="_blank" :href="selectedEvent.web_url.replace('app.schoology', 'pausd.schoology')">
              open
            </v-btn>
            <v-btn
              text
              color="accent"
              @click="selectedOpen = false"
            >
              close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-col>
    <v-col class='small-screen' style='height: calc(100vh - 92px - 48px);padding-bottom: 0'>
      <v-toolbar color="background" dense flat >
        <v-spacer></v-spacer>
        <v-btn @click="()=>{this.$refs['d-calendar'].prev()}" icon><v-icon>mdi-chevron-left</v-icon></v-btn>
        <v-btn @click="()=>{focus=''}" class="mx-3" outlined>Today</v-btn>
        <v-btn @click="()=>{this.$refs['d-calendar'].next()}" icon><v-icon>mdi-chevron-right</v-icon></v-btn>
        <v-spacer/>
      </v-toolbar>
      <v-calendar

        ref='d-calendar'
        type='day'
        color='accent'
        v-model="focus"
        event-overlap-mode='column'
        :event-overlap-threshold='10'
        :event-color='e=>e.color||"accentDark"'
        :weekdays='[0,1, 2, 3, 4, 5,6]'
        :events='[...sgyevents]'
      >
      </v-calendar>
    </v-col>

  </v-row>

</template>

<script>
export default {
  name: 'WeekCalendar',
  data:()=>({
    sgyevents:[],
    focus: '',
    style:'month',
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    styles:[
      {
        text:'Month',
        value:'month'
      },
      {
        text:'Day',
        value:'day'
      },
      {
        text:'Week',
        value:'week'
      },
      {
        text:'4 Day',
        value:'4day'
      }
    ]
  }),
  async mounted(){
    this.sgyevents = await this.$axios.$get('/cc/api/users/me/events/week/');
   // this.$refs.calendar.scrollToTime('08:00')
  },
  methods: {
    viewDay ({ date }) {
      this.focus = date
      this.style = 'day'
    },
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        requestAnimationFrame(() => requestAnimationFrame(() => open()))
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
  }
}
</script>

<style scoped>
.big-screen {
  @apply hidden sm:block !important;
}

.small-screen {
  @apply sm:hidden block !important;
}
</style>
