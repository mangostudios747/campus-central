<template>
  <div class='ma-5'>
    <v-alert text icon='mdi-information' color='accent'>
      <strong>Note:</strong> This feature of Campus Central is still under construction, so you may experience ugly or unordered data.
    </v-alert>
    <v-expansion-panels   class=' mx-auto' v-if='$store.state.grades'>
    <v-expansion-panel
      v-for="(section, sectionid) of $store.state.grades"
      :key="sectionid"
    >
      <v-expansion-panel-header style='border:none;'>
       <div> <v-avatar height='30' width='30'><img :src='((($store.state.cache.courses||[]).find(e=> e.id=== sectionid))||{}).profile_url'/></v-avatar>
         <span class='inline text-md' style='display: inline'>{{ ((($store.state.cache.courses||[]).find(e=> e.id=== sectionid))||{}).course_title}}</span></div>
        <v-spacer></v-spacer>
        <span style='text-align: right'>{{section.grade}}% <v-progress-circular
          :size='25'
          width='6'
          rotate='270'
          :color='getGradeColor(section.grade)'
          class='md:mx-2 mx-1'
          :value='section.grade'
        /></span>

      </v-expansion-panel-header>
      <v-expansion-panel-content >
        <v-card class='md:mx-5' color='transparent' elevation='0' :key='cat.id' v-for='cat in section.categories'>
          <h4>{{ cat.title }}</h4>
          <v-list  color='transparent'>
            <v-list-item :two-line='!!asg.comment'  style='padding:0;margin:0' class='border-b-2 border-white' :key='asg.id' v-for='asg in cat.assignments'>
             <v-list-item-action style='margin:0;margin-right:0.5rem' class='flex md:w-1/5 w-1/4' >

               <span  style='text-align: right' class='mr-0 ml-auto'>
                 <span ><sup>{{asg.grade||'*'}}</sup>/<sub>{{asg.max_points}}</sub></span>
                 <v-progress-circular
                 :size='15'
                 :width='7.5'
                 rotate='270'
                 class='phone'
                 :color='getGradeColor((asg.grade*100||0)/asg.max_points)'
                 :value='(asg.grade*100||0)/asg.max_points'
                 />
                 <v-progress-circular
                 :size='25'
                 :width='6'
                 rotate='270'
                 :color='getGradeColor((asg.grade*100||0)/asg.max_points)'
                 class='mx-2 no-phone'
                 :value='(asg.grade*100||0)/asg.max_points'
               /></span>
             </v-list-item-action>

             <div class='w-3/4 md:w-full'>
               <a  target='_blank' :href='(asg.web_url||"").replace(`app.schoology`, `pausd.schoology`)'><v-list-item-title > {{asg.title||asg.assignment_id}}</v-list-item-title></a>
               <v-list-item-subtitle v-if='asg.comment'> {{asg.comment}}</v-list-item-subtitle>
             </div>

            </v-list-item>
            <v-list-item v-if='!cat.assignments.length'>
              <v-list-item-subtitle>No entries</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels></div>

</template>

<script>
import colors from 'vuetify/es5/util/colors'

const GRADE_OPINIONS = {
  PERFECT: 90,
  GOOD: 85,
  OKAY: 70,
  CRITICAL: 60,
  FAILING: 0
}
const GRADE_COLORS = {
  PERFECT: colors.green.base,
  GOOD: colors.lime.base,
  OKAY: colors.yellow.darken2,
  CRITICAL: colors.deepOrange.lighten1,
  FAILING: colors.purple.base
}
export default {
  name: 'grades',
  async asyncData({ route, $axios, store }){
    if (!store.state.grades) {
      const grades = await $axios.$get('/cc/api/users/me/grades')
      store.commit('setGrades', grades)
    }
    //return {grades}
  },
  methods: {
    getGradeColor(grade){
        if (grade >= GRADE_OPINIONS.PERFECT) return GRADE_COLORS.PERFECT;
      if (grade >= GRADE_OPINIONS.GOOD) return GRADE_COLORS.GOOD;
      if (grade >= GRADE_OPINIONS.OKAY) return GRADE_COLORS.OKAY;
      if (grade >= GRADE_OPINIONS.CRITICAL) return GRADE_COLORS.CRITICAL;
      if (grade >= GRADE_OPINIONS.FAILING) return GRADE_COLORS.FAILING
    }
  }
}
</script>

<style scoped>

.no-phone {
  @apply invisible absolute sm:visible sm:relative !important;
}

.phone {
  @apply visible sm:invisible relative sm:absolute !important;
}

</style>
