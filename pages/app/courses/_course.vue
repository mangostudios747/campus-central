<template>
<div>


  <v-row class='mt-5 text-center align-center justify-center'>
    <v-avatar size='150' class='mr-4'>
      <v-img
        :src='course.profile_url'
      ></v-img>
    </v-avatar>

  </v-row>
  <v-row class='my-5 text-center align-center justify-center'>
    <h1 class='my-5'>{{course.section_title}}</h1>

  </v-row>

  <h2 class='my-2'>Todo</h2>
  <v-list rounded='lg' v-if='assignments.length > 0' color='secondary'>
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
  <v-card rounded='lg' color='secondary' class='text-center' v-else>
    <v-container>
      <h2 class=''>Nothing to do! :-)</h2>
    </v-container>

  </v-card>

  <h2 class='mb-2 mt-4'>Materials</h2>
  <p>Coming Soon!</p>
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
