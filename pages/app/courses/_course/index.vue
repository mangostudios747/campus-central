<template>
<div>
  <h2 class='my-2'>Materials</h2>
  <v-row
  >
    <v-col :cols='+!!objectType*6'>
      <course-materials style='height: 40vh;overflow: scroll'  :courseid='courseid'></course-materials>
    </v-col>
    <v-col v-if='objectType' cols='6'>
      <v-card color='#0F326199'>
        <v-card-title v-html='focusedObject.title'></v-card-title>
        <v-card-text style='white-space: pre-wrap' v-html='focusedObject.body'></v-card-text>
        <div v-if='focusedObject.attachments'>
          <div class='px-10' v-if='focusedObject.attachments.links'>


            <v-alert

              v-for='link in focusedObject.attachments.links.link'
              :key='link.id'

              border='left'
              text
              color='accent'>

              <h4><a style='color: var(--v-accent-base) !important;text-decoration: none' :href='link.url' >{{link.title}}</a></h4>
              <p v-if='link.summary' v-html='link.summary'></p>
            </v-alert>

          </div>
          <div class='px-10' v-if='focusedObject.attachments.files'>
            <v-row>
              <div class='py-3' :key='file.id' v-for='file of focusedObject.attachments.files.file'>
                <v-card style='cursor: pointer' v-ripple class='mx-3' v-if='file.filemime.split("/")[0]==="image"'>

                  <v-img  :src='`https://pausd.schoology.com/attachment/${file.id}/image/attachment_image_thumb`'></v-img>
                </v-card>
                <div v-else>
                  {{file.filemime.split("/")[0]}}
                </div>
              </div>
            </v-row>
          </div>
        </div>
      </v-card>
    </v-col>
  </v-row>

</div>
</template>

<script>
export default {
  name: 'materials',
  data:()=>({
    objectType:null,
    focusedObject:{
      title:"Assignment title",
      body:"dfklaejrghwtgfnjeafreorgherarhrfnklsdfdewajtoqhrhgueirbghfbvadkjnjdknj\n" +
        "efjri[ofhr[ioghrirlfdmsklanfgjeawfjksdngfjbtreo"
    }
  }),
  async asyncData({ params, $axios }) {
    const courseid = params.course;
    const course  = await $axios.$get(`/api/users/me/sections/${courseid}`)
    const course_id = (+course.parent_id != 0)? course.parent_id : course.id
    return {courseid, course_id}
  },
  methods: {
      async openItem(item) {
        let url;
        switch (item.type) {

          case 'page':
            //url = 'page/'+item.id;
            this.objectType = item.type
            this.focusedObject = item
            break;
          case 'assessment':
            url = 'assignment/'+item.id+'/assessment'
            break;
          case 'assignment':
            //url = 'assignment/'+item.id+'/info';
            this.objectType = item.type
            this.focusedObject = item
            //todo: show submissions as well
            break;
          case 'document':
            switch (item.document_type){
              case "file":
                url = 'course/'+this.course_id+'/materials/gp/'+item.id;
                break;
              case "external_tool":
                url = `external_tool/${item.id}/launch`;
                break;
              default:
                console.log(item)
                url = 'course/'+this.course_id+'/materials/link/view/'+item.id;
                break;
            }

            break;
        }
        if (url) window.open('https://pausd.schoology.com/'+url, '_blank');
        this.active=  [];
      }
    }
}
</script>

<style scoped>

</style>
