<template>
<div >
  <h1>Classes</h1>
  <v-list v-if='sections'>
    <v-list-item v-for='section in sections' :key='section.id' two-line>
      <v-list-item-content>
        <v-list-item-title>{{ section.course_title }}</v-list-item-title>
        <v-list-item-subtitle>{{ section.section_title }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</div>
</template>

<script>
export default {
  name: 'index',
  async asyncData({ $axios }) {
    const sections = await $axios.$get('/api/users/me/sections');
    //console.log(sections)
    return {sections}
  }
}
</script>

<style scoped>

</style>
