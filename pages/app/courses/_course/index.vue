<template>
<div>
  <v-row class='mt-0'
  >
    <v-col :cols='+!!objectType*4'>
      <course-materials :key='courseid' :on-open='openItem' :courseid='courseid'></course-materials>
    </v-col>
    <v-col v-if='objectType' cols='8'>
      <material-viewer :focused-object='focusedObject' :object-type='objectType'/>
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
    const course  = await $axios.$get(`/cc/api/users/me/sections/${courseid}`)
    const course_id = (+course.parent_id != 0)? course.parent_id : course.id
    return {courseid, course_id}
  },
  methods: {
      async openItem(item) {
        let url;
        switch (item.type) {

          case 'page':
            //url = 'page/'+item.id;
            const pageData = await this.$axios.$get(`/cc/api/users/me/sections/${this.courseid}/page/${item.id}`)
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
            const documentData = await this.$axios.$get(`/cc/api/users/me/sections/${this.courseid}/document/${item.id}`)
            item = Object.assign(item, documentData)
            console.log(documentData)
            this.objectType = item.type
            this.focusedObject = item
            switch (item.document_type){
              case "file":
                url = 'course/'+this.course_id+'/materials/gp/'+item.id;
                break;
              case "external_tool":
                url = `external_tool/${item.attachments.external_tools.external_tool[0].id}/launch`;
                break;
              case "embed":
                break;
              case "link":
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

<style >

  iframe
  {
    /*position: relative;
    height: 100% !important;*/
    max-width: 100% ;
  }

</style>
