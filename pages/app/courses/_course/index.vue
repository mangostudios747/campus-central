<template>
<div>
  <h2 class='my-2'>Materials</h2>
  <div

  >
    <course-materials :courseid='courseid'></course-materials>
    <!---<v-treeview
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
    </v-treeview>--->
  </div>

</div>
</template>

<script>
export default {
  name: 'materials',
  data:()=>({

  }),
  async asyncData({ params, $axios }) {
    const courseid = params.course;
    return {courseid}
  }
}
</script>

<style scoped>

</style>
