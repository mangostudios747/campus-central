<template>
  <div
  >
    <v-treeview
      v-if='folderContents'
      :items='folderContents'
      :load-children='fetchChildren'
      open-on-click
      dense
      :active='active'
      activatable
      @update:active='openItem'
    >
      <template v-slot:prepend="{ item, open }">
        <v-icon :color='item.color' v-if="item.type=='folder'">
          {{ open ? 'mdi-folder-open-outline' : 'mdi-folder-outline' }}
        </v-icon>
        <v-icon  v-else-if='item.type==="document"'>
          {{ ((name)=>{
          const parts = name.split('.');
          if (parts.length === 2){
            const ext = parts[1].toLowerCase();
            switch (ext){
              case "pdf":
                return "mdi-pdf-box"
              case "mp4":
                return "mdi-file-video"
              default:
                return "mdi-file-document"
            }
          }
          else return "mdi-file-document"
        })(item.name)}}
        </v-icon>
        <v-icon v-else-if="item.type==='page'">
          mdi-book
        </v-icon>
        <v-icon v-else-if="item.type==='assignment'">
          mdi-pencil
        </v-icon>
        <v-icon v-else-if="item.type==='assessment'||item.type==='assessment_v2'">
          mdi-pencil-ruler
        </v-icon>
      </template>
      <template v-slot:label='{item}'>
        <span  v-html='item.name'></span>
      </template>
    </v-treeview>
    <v-skeleton-loader
      style='background:transparent'

      type='article@3'
      v-else/>
  </div>
</template>

<script>
export default {
  name: 'CourseMaterials',
  props:['courseid'],
  data:()=>({
    active:[],
    folderContents:null,
    items: {  },
    course_id:null,
  }),
  mounted() {
    this.fetchData();
  },
  methods:{
    async fetchData() {
      const {$axios} = this;
      //console.log(this.courseid)
      const course  = await $axios.$get(`/api/users/me/sections/${this.courseid}`)
      this.folderContents = await $axios.$get('/api/sections/'+this.courseid+'/folder/0');
      //this.items = {};
      console.log(course)
      const v = this
      this.folderContents.forEach(function(item) {
        v.items[item.id] = item;
      })
      this.course_id = (+course.parent_id != 0)? course.parent_id : course.id
    },
    async fetchChildren(item){
      const folderContents = await this.$axios.$get('/api/sections/'+this.courseid+'/folder/'+item.id);
      item.children = folderContents;
      const vapp = this;
      folderContents.forEach(function(item) {
        vapp.items[item.id] = item;
      })
    },
    openItem([itemid]){
      if (!itemid) return;
      const item = this.items[itemid];
      let url;
      switch (item.type) {
        case 'page':
          url = 'page/'+item.id;
          break;
        case 'assessment':
          url = 'assignment/'+item.id+'/assessment'
          break;
        case 'assignment':
          url = 'assignment/'+item.id+'/info';
          break;
        case 'document':
          const parts = item.name.split('.');
          if (parts.length === 2){
            const ext = parts[1].toLowerCase();
            switch (ext){
              case "pdf":
                url = 'course/'+this.course_id+'/materials/gp/'+item.id;
                break;
              case "mp4":
                url = 'course/'+this.course_id+'/materials/gp/'+item.id;
                break;
              default:
                url = 'course/'+this.course_id+'/materials/link/view/'+item.id;
                break;
            }
          }
          else {
            url = 'course/'+ this.course_id + '/materials/link/view/' + item.id
          }
          break;
      }
      if (url) window.open('https://pausd.schoology.com/'+url, '_blank');
      this.active=  [];
    }
  }
}
</script>

<style>
.v-skeleton-loader .v-skeleton-loader__actions, .v-skeleton-loader .v-skeleton-loader__article, .v-skeleton-loader .v-skeleton-loader__card-heading, .theme--dark.v-skeleton-loader .v-skeleton-loader__card-text, .theme--dark.v-skeleton-loader .v-skeleton-loader__date-picker, .theme--dark.v-skeleton-loader .v-skeleton-loader__list-item, .theme--dark.v-skeleton-loader .v-skeleton-loader__list-item-avatar, .theme--dark.v-skeleton-loader .v-skeleton-loader__list-item-text, .theme--dark.v-skeleton-loader .v-skeleton-loader__list-item-two-line, .theme--dark.v-skeleton-loader .v-skeleton-loader__list-item-avatar-two-line, .theme--dark.v-skeleton-loader .v-skeleton-loader__list-item-three-line, .theme--dark.v-skeleton-loader .v-skeleton-loader__list-item-avatar-three-line, .theme--dark.v-skeleton-loader .v-skeleton-loader__table-heading, .theme--dark.v-skeleton-loader .v-skeleton-loader__table-thead, .theme--dark.v-skeleton-loader .v-skeleton-loader__table-tbody, .theme--dark.v-skeleton-loader .v-skeleton-loader__table-tfoot{
  background: transparent !important;
}
</style>
