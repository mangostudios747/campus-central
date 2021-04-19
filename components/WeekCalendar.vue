<template>

  <v-row class="fill-height">
    <v-col  style='height: calc(100vh - 92px);padding-bottom: 0'>
      <v-calendar

        ref='calendar'
        type='month'
        color='primary'

        event-overlap-mode='column'
        :event-overlap-threshold='10'
        :event-color='e=>e.color||"accentDark"'
        :weekdays='[1, 2, 3, 4, 5]'
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
    sgyevents:[]
  }),
  async mounted(){
    this.sgyevents = await this.$axios.$get('/api/users/me/events/week/');
   // this.$refs.calendar.scrollToTime('08:00')
  }
}
</script>

<style scoped>

</style>
