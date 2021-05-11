<template>
<div>
  <h2 class='my-2'>Todo</h2>
  <v-list rounded v-if='assignments.length > 0' color='background' style='border: 1px solid #ffffff22 !important' elevation='0'>
    <v-list-item v-for='(asg, key) of assignments' :key='key'>
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
  <v-card  rounded='lg'  color='background' style='border: 1px solid #ffffff22 !important' elevation='0' class='text-center' v-else>
    <v-container>
      <h2 class=''>Nothing to do! :-)</h2>
    </v-container>

  </v-card>
</div>
</template>

<script>
export default {
  name: 'todo',
  async asyncData({ params, $axios }) {
    const courseid = params.course // When calling /abc the slug will be "abc"
    //const course  = await $axios.$get(`/cc/api/users/me/sections/${courseid}`)

    const assignments  = await $axios.$get(`/cc/api/users/me/sections/${courseid}/assignments/pending`)
    return { courseid, assignments }
  }
}
</script>

<style scoped>

</style>
