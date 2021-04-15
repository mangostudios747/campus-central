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

  <v-tabs background-color='transparent'  grow color='white'>
    <v-tab
      exact
    :to='`/app/courses/${courseid}/`'
    >Home</v-tab>
    <v-tab
      exact
    :to='`/app/courses/${courseid}/todo`'
    >Todo</v-tab>
    <v-tab
      exact
      :to='`/app/courses/${courseid}/materials`'
    >Materials</v-tab>
    <v-tab>Updates</v-tab>
    <v-tab>Grades</v-tab>
  </v-tabs>

  <nuxt-child/>


</div>
</template>

<script>
export default {
  async asyncData({ params, $axios }) {
    const courseid = params.course // When calling /abc the slug will be "abc"
    const course  = await $axios.$get(`/api/users/me/sections/${courseid}`)

    //const assignments  = await $axios.$get(`/api/users/me/sections/${courseid}/assignments/pending`)
    return { courseid, course }
  }
}
</script>

<style scoped>

</style>
