<template>
  <div class='ma-5'>
    <v-alert text icon='mdi-information' color='accent'>
      <strong>Note:</strong> This feature of Campus Central is still under construction, so you may experience ugly or unordered data.
    </v-alert>
    <v-expansion-panels v-if='$store.state.grades'>
    <v-expansion-panel
      v-for="(section, sectionid) of $store.state.grades"
      :key="sectionid"
    >
      <v-expansion-panel-header style='border:none;'>
        <span>{{ ((($store.state.cache.courses||[]).find(e=> e.id=== sectionid))||{}).course_title || sectionid }}</span>
        <v-spacer></v-spacer>
        <span style='text-align: right'>{{section.final_grade[0].grade}}% <v-progress-circular
          :size='20'
          :color='getGradeColor(section.final_grade[0].grade)'
          class='mx-2'
          :value='section.final_grade[0].grade'
        /></span>

      </v-expansion-panel-header>
      <v-expansion-panel-content >
        <v-card color='transparent' elevation='0' :key='period.period_id' v-for='period in section.period'>
          <v-card-title>{{ period.period_title }}</v-card-title>
          <v-list color='transparent'>
            <v-list-item
            v-for='asg in period.assignment'
            :key='asg.assignment_id'
            >
              {{asg.grade}} / {{asg.max_points}} -> {{asg.comment}}
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

</style>
