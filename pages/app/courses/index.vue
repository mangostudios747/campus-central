<template>
<div >

  <v-sheet class='pt-5' elevation='0' color='transparent' rounded='lg'>
    <v-row><h1  class='px-4 pb-2'>Classes </h1><v-spacer></v-spacer><v-btn v-if='false' class='mr-7' style='padding: 0 0 !important;' rounded color='accent' ><v-icon >mdi-reload</v-icon></v-btn></v-row>
    <v-list color='transparent' rounded class='rounded-b-lg'  v-if='sections'>
      <v-list-item link :to='`/app/courses/${section.id}`' v-for='section in sections' :key='section.id' two-line>
        <v-list-item-content>
          <v-list-item-title>{{ section.course_title }}</v-list-item-title>
          <v-list-item-subtitle>{{ section.section_title }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
            <v-icon>mdi-chevron-right</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-sheet>
</div>
</template>

<script>
export default {
  name: 'index',
  async asyncData({ $axios }) {
    const sections = await $axios.$get('/api/users/me/sections');
    //console.log(sections)
    return {sections}
  },

}
</script>

<style scoped>
.v-btn:not(.v-btn--round).v-size--default {

  min-width: 36px;

}
</style>
