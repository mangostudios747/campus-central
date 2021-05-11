<template>
  <div >
  <v-row v-if="$store.getters['hc/currentEvent'].isValid" class='mt-10 px-4'>
    <v-col v-if='false' cols='4'>
      <v-card  elevation='0' color='background' style='border: 1px solid #ffffff22 !important' class='text-center py-7'>
        <v-progress-circular class=' elevation-10 ' style='border-radius: 50%'
                             :rotate='270'
                             :size='350'
                             :width='35'
                             :value="$store.getters['hc/currentEvent'].percent"
                             :color="($store.state.hc.customizations[$store.getters['hc/currentEvent'].id]||{color:'blue-grey'}).color"
        >
          <v-col class='text-center'>
            <v-row>
              <span
                class='display-4 mx-auto'>{{ Math.ceil($store.getters['hc/currentEvent'].remaining || $store.getters['hc/currentEvent'].elapsed) }}</span>
            </v-row>
            <v-row><span class=' mx-auto'>minutes {{ $store.getters['hc/currentEvent'].displayText }}</span></v-row>
            <v-row><span class=' display-1 mx-auto mt-2'>{{ $store.getters['hc/currentEvent'].name }}</span></v-row>
            <v-row></v-row>
          </v-col>
        </v-progress-circular>
      </v-card>

    </v-col>
    <v-col :cols='objectType? 4: 8'>
      <v-card v-if=" $store.getters['hc/currentEvent'].meta" class='py-3' elevation='0' color='background' style='border: 1px solid #ffffff22 !important'>
        <v-list-item class='ml-3 '>
          <v-list-item-avatar>
            <v-img
              :src="$store.getters['hc/currentEvent'].meta.photo"
            ></v-img>
          </v-list-item-avatar>
          <v-card-title>
            {{ $store.getters['hc/currentEvent'].name }}
          </v-card-title>

          <v-list-item-action>
            <v-btn color='accent' v-if='$store.getters["hc/currentEvent"].meta.course_home' title='Course Home Page'
                   target='_blank' :href='$store.getters["hc/currentEvent"].meta.course_home' icon>
              <!--<v-avatar size='35'>
                <img src='/schoology-logo.png'/>
              </v-avatar>--->
              <v-icon>mdi-open-in-new</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>

        <course-materials :on-open='openItem' :key='$store.getters["hc/currentEvent"].meta.id' v-if='$store.getters["hc/currentEvent"].meta.id'
                          :courseid='$store.getters["hc/currentEvent"].meta.id'></course-materials>
      </v-card>
    </v-col>
    <v-col v-if='objectType' cols='8'>
        <material-viewer :focused-object='focusedObject' :object-type='objectType'/>
    </v-col>
  </v-row>
    <v-row v-else>
      <v-col>
    <week-calendar/>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CourseMaterials from '@/components/CourseMaterials'

export default {
  name: 'index',
  components: {
    CourseMaterials
  },
  data:()=>({
    objectType:null,
    focusedObject:{
      title:"Assignment title",
      body:"dfklaejrghwtgfnjeafreorgherarhrfnklsdfdewajtoqhrhgueirbghfbvadkjnjdknj\n" +
        "efjri[ofhr[ioghrirlfdmsklanfgjeawfjksdngfjbtreo"
    }
  }),
  head(){
    return {
      title:'Home'
    }
  },
  methods: {
    async openItem(item) {
      this.courseid = this.$store.getters["hc/currentEvent"].meta.id
      this.course_id = this.$store.getters["hc/currentEvent"].meta.id
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

<style scoped>

</style>
