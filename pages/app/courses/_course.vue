<template>
<div>
  <h1>{{course.section_title}}</h1>
  <h2 class='my-2'>Todo</h2>
  <v-list>
    <v-list-item v-for='asg in assignments' :key='asg.id'>
      <v-list-item-content>
        <v-list-item-title>{{ asg.title }}</v-list-item-title>
        <v-list-item-subtitle>{{ asg.completion_status }}</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn icon  :href='asg.web_url'>
          <v-icon>mdi-open-in-new</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</div>
</template>

<script>
export default {
  async asyncData({ params, $axios }) {
    const courseid = params.course // When calling /abc the slug will be "abc"
    const course  = await $axios.$get(`/api/users/me/sections/${courseid}`)

    const assignments  = await $axios.$get(`/api/users/me/sections/${courseid}/assignments/pending`)
    return { courseid, course, assignments }
  }
}
</script>

<style scoped>

</style>
