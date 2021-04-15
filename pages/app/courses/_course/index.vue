<template>
<div>
  <h2 class='my-2'>Materials</h2>
  <div
    v-if='folderContents'
  >
    <v-treeview
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
          {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
        </v-icon>
        <v-icon  v-else-if='item.type==="document"'>
          mdi-file-document
        </v-icon>
        <v-icon v-else-if="item.type==='page'">
          mdi-book
        </v-icon>
        <v-icon v-else-if="item.type==='assignment'">
          mdi-pencil
        </v-icon>
        <v-icon v-else-if="item.type==='assessment'">
          mdi-pencil-ruler
        </v-icon>
      </template>
      <template v-slot:label='{item}'>
        <span  v-html='item.name'></span>
      </template>
    </v-treeview>
  </div>

</div>
</template>

<script>
export default {
  name: 'materials',
  data:()=>({
    active:[],

  }),
  async asyncData({ params, $axios }) {
    const courseid = params.course;
    const course  = await $axios.$get(`/api/users/me/sections/${courseid}`)
    const folderContents = await $axios.$get('/api/sections/'+courseid+'/folder/0')
    const items = {};
    folderContents.forEach(function(item) {
      items[item.id] = item;
    })
    return {courseid, course_id:(+course.parent_id != 0)? course.parent_id : course.id, folderContents, items}
  },
  methods:{
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
          url = 'course/'+this.course_id+'/materials/link/view/'+item.id;
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
