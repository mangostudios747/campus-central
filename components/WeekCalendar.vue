<template>

  <div>
    <v-calendar
      ref='calendar'
      type='week'
      color='primary'
      event-overlap-mode='stack'
      :event-color='e=>e.color'
      :weekdays='[1, 2, 3, 4, 5]'
    :events='[...sgyevents]'
    >

    </v-calendar>
  </div>

</template>

<script>
export default {
  name: 'WeekCalendar',
  data:()=>({
    sgyevents:[]
  }),
  async mounted(){
    this.sgyevents = await this.$axios.$get('/api/users/me/events/week/sections');
   // this.$refs.calendar.scrollToTime('08:00')
  }
}
</script>

<style scoped>

</style>
