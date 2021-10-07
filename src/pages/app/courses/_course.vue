<template>
  <div>

    <div class='flex flex-col sm:flex-row'>
      <div class='flex flex-row sm:flex-col'>
        <v-container class='mx-3'>
          <v-row :key='courseid'>
            <div class='flex flex-row sm:flex-col '>
              <div  :key='courseid' class='mt-5 sm:ml-8 ml-4 flex flex-col sm:flex-row justify-center sm:justify-left'>
                <v-avatar height='none' min-width='none' min-height='none' width='none' class='mr-4 h-10 w-10  sm:h-20 sm:w-20 md:h-24 md:w-24 '>
                  <v-img
                    :src='course.profile_url'
                  ></v-img>
                </v-avatar>

              </div>
              <v-row class='mt-5 ml-0 sm:ml-8 justify-left'>
                <span class='my-5 sm:text-4xl text-2xl font-bold '>{{ course.section_title }}</span>
              </v-row>
            </div>
            <v-col cols='7'>
              <v-alert dismissible v-if='announcement'
                       text color='accent'
                       icon='mdi-bullhorn'

              >
                <div style='white-space: pre-wrap;text-align: left' v-linkified v-html='announcement.body'></div>
              </v-alert>
            </v-col>
          </v-row>
          <div style='position: sticky;top: 63px;z-index: 4'>
            <v-tabs :key='courseid' background-color='background' grow color='text'>
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
      </div>
      <div  style='max-height: 88vh;overflow:hidden' v-if='notes' class='mr-3 flex flex-row sm:flex-col mt-10'>
        <v-card :key='courseid' class=' py-2' color='background' rounded elevation='0'
                style='border: 1px solid #ffffff22 !important'>
          <v-card-title>Links</v-card-title>
          <v-list
            color='transparent'
            dense
          >
            <v-list-item


              :key='index'
              dense
              v-for='(link, index) of notes.links'

            >
              <v-list-item-content>
                <v-btn color='#ffffff22' elevation='0' link large :href='link.to' target='_blank'><span>{{ link.name
                  }}</span></v-btn>
              </v-list-item-content>
              <v-list-item-action>
                <v-menu offset-x offset-y>
                  <template v-slot:activator='{ on, attrs }'>
                    <v-btn left v-bind='attrs'
                           v-on='on' color='accent' icon>
                      <v-icon>
                        mdi-cog
                      </v-icon>
                    </v-btn>
                  </template>
                  <v-list dense>
                    <v-list-item>
                      Edit
                    </v-list-item>
                    <v-list-item color='red' @click='notes.links.splice(index,1)'>
                      Delete
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-list-item-action>
            </v-list-item>
          </v-list>
          <v-card-actions class='mx-2'>
            <v-dialog
              v-model='dialog.newLink'
              persistent
              max-width='500'
            >
              <template v-slot:activator='{ on, attrs }'>
                <v-btn
                  outlined text
                  color='accent'
                  v-bind='attrs'
                  v-on='on'
                >
                  <v-icon left>mdi-plus</v-icon>
                  new
                </v-btn>
              </template>
              <v-card
                class='background'
              >
                <v-card-title class='headline'>
                  New Link
                </v-card-title>
                <v-card-text>
                  <v-text-field color='accent' :value='newLink.name || newLink.to' v-model='newLink.name'
                                label='Title'></v-text-field>
                  <v-text-field color='accent' v-model='newLink.to' autofocus label='Link'></v-text-field>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color='text'
                    outlined
                    text
                    @click='dialog.newLink = false; newLink={};'
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    color='accent'
                    outlined text
                    @click='dialog.newLink = false;notes.links.push(newLink);newLink={};updateNotes()'
                  >
                    Add
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

          </v-card-actions>

          <v-card-title>Notes</v-card-title>
          <v-textarea
            color='accent'
            auto-grow
            filled
            class='mx-4'
            v-model='notes.notepad'
            rows='4' />
          <v-card-actions class='mx-2'>
            <v-btn outlined text color='accent'>
              <v-icon left>mdi-check</v-icon>
              save
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  async asyncData({ params, $axios, store }) {
    const courseid = params.course // When calling /abc the slug will be "abc"
    let course = store.getters.getCourse(courseid)
    course = await $axios.$get(`/cc/api/users/me/sections/${courseid}`)
    const announcement = await $axios.$get(`/cc/api/sections/${courseid}/announcement`)
    const allNotes = store.state['cache/courseNotes']
    //console.log(allNotes)
    let notes
    if (!allNotes) notes = { notepad: '', links: [] }
    else notes = allNotes[courseid] || { notepad: '', links: [] }
    //const assignments  = await $axios.$get(`/cc/api/users/me/sections/${courseid}/assignments/pending`)
    return { courseid, course, notes, announcement }
  },
  watch: {
    notes() {
      this.updateNotes()
    }
  },
  methods: {
    updateNotes() {
      this.$store.commit('setCourseNotes', {
        courseid: this.courseid, notes: this.notes
      })

    }
  },
  data: () => ({
    newLink: {
      to: '',
      name: ''
    },
    dialog: {
      newLink: false

    }
    /*notes: {
      links: [
        {
          to: 'https://google.com/',
          name: 'Coming Soon!'
        }
      ],
      notepad: `Notepad stuff coming soon too. This is just a preview.`
    }*/
  }),
  head() {
    return {
      title: this.course.course_title
    }
  }

}
</script>

<style scoped>

</style>
