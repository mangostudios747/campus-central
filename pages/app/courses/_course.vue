<template>
  <div>

    <v-row>
      <v-col style='' :cols='9'>
        <v-container class='mx-3'>
          <v-row class='mt-5 text-center align-center justify-center'>
            <v-avatar size='100' class='mr-4'>
              <v-img
                :src='course.profile_url'
              ></v-img>
            </v-avatar>

          </v-row>
          <v-row class='my-5 text-center align-center justify-center'>
            <h1 class='my-5'>{{ course.section_title }}</h1>
          </v-row>
          <div style='position: sticky;top: 58px;z-index: 4'>
          <v-tabs  background-color='background' grow color='text'>
            <v-tab
              exact
              :to='`/app/courses/${courseid}/`'
            >Home
            </v-tab>
            <v-tab
              exact
              :to='`/app/courses/${courseid}/todo`'
            >Todo
            </v-tab>
            <v-tab
              :to='`/app/courses/${courseid}/updates`'
            >Updates
            </v-tab>
            <v-tab>Grades</v-tab>
          </v-tabs>
          </div>
          <nuxt-child />
        </v-container>
      </v-col>
      <v-col style='max-height: 88vh;overflow:scroll' class='mx-4  mt-10'>
        <v-card class=' py-2' color='blueLayer'>
          <v-card-title>Links</v-card-title>
          <v-list
            color='transparent'
          dense
          >
            <v-list-item
              :href='link.to'
              :key='index'
              target='_blank'
              v-for='(link, index) of notes.links'
              link >
              <v-list-item-content>
                <span  class=' text-decoration-underline'>{{link.name}}</span>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn color='accent' @click.prevent='()=>{}' icon >
                  <v-icon>
                    mdi-pencil
                  </v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
          <v-card-actions class='mx-3'>
            <v-btn outlined text color='accent' >
              <v-icon left>mdi-plus</v-icon>
              new</v-btn>
          </v-card-actions>

          <v-card-title>Notes</v-card-title>
          <v-textarea
            color='accent'
            auto-grow
            filled
            class='mx-3'
            v-model='notes.notepad'
            rows='4' />
          <v-card-actions class='mx-3'>
            <v-btn outlined text color='accent'>
              <v-icon left>mdi-check</v-icon>
              save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

  </div>
</template>

<script>
export default {
  async asyncData({ params, $axios }) {
    const courseid = params.course // When calling /abc the slug will be "abc"
    const course = await $axios.$get(`/api/users/me/sections/${courseid}`)

    //const assignments  = await $axios.$get(`/api/users/me/sections/${courseid}/assignments/pending`)
    return { courseid, course }
  },
  data:()=>({
    notes:{
      links:[
        {
          to:'https://google.com/',
          name:'Coming Soon!'
        }
      ],
      notepad:`Notepad stuff coming soon too. This is just a preview.`
    }
  }),
  head(){
    return {
      title:this.course.course_title
    }
  }

}
</script>

<style scoped>

</style>
