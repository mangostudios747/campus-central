<template>
  <div >
    <v-row v-if='schedule.length > 0'>
      <v-col class='mx-16'>
        <v-progress-linear elevation='0'  :value='period.progress' height='60' class='mr-16 my-3' :color='period.color+"bb"' :key='`${period.hcname}`'  rounded style='border: 0px solid #ffffff22 !important;' v-for='period in schedule'>
          <v-row class='text-center px-8'>
            <div style='align-self: center;text-align: left'>
              <span>{{ period.status===periodStates.FUTURE?'Starting':'Started' }} {{period.start | moment('from','now')}}</span><br/>
              <span style='color: rgba(255,255,255,0.7)'>at {{period.start | moment('h:mm A')}}</span>
            </div>
            <v-spacer/>
            <h2 style='align-self: center'>{{ period.name }}</h2>
            <v-spacer/>
            <div style='align-self: center;text-align: right'>
            <span>{{ period.status===periodStates.PAST?'Ended':'Ending' }} {{period.end | moment('from','now')}}</span><br/>
            <span style='color: rgba(255,255,255,0.7)'>at {{period.end | moment('h:mm A')}}</span>
          </div>
          </v-row>
        </v-progress-linear>
      </v-col>
    </v-row>
  <v-row class='mx-16 my-5 text-center' v-else>
    <v-col class='mx-auto text-center'>
      <v-icon  size='300'>mdi-sofa-single</v-icon>
      <h1>No School Today</h1>
    </v-col>



  </v-row>
  </div>


</template>

<script>
export default {
  name: 'todo',
  data:()=>({
    focusedDate:(new Date),//.addDays(2),
    periodStates: {
      PAST:-1,
      PRESENT:0,
      FUTURE:1
    },
    schedule: [],
  }),
  head(){
    return {
      title:'Schedule'
    }
  },
  mounted() {
    const v = this;
    setInterval(()=>{
      v.schedule = v.$store.getters['hc/scheduleForDate'](v.focusedDate);
    }, 10)
  },
  computed:{
    /*schedule(){
      return this.$store.getters['hc/scheduleForDate'](this.focusedDate);
    }*/
  }
}
</script>

<style scoped>
iframe {
  border: none;
}
</style>
