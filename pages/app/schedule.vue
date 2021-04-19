<template>
  <div style='height: 100%'>
    <iframe  style="width:100%;height: 100%" src="https://homeworkcentral.web.app"></iframe>
  </div>


</template>

<script>
export default {
  name: 'todo',
  data:()=>({
    dialog:false
  }),
  head(){
    return {
      title:'Schedule'
    }
  },
}
</script>

<style scoped>
iframe {
  border: none;
}
</style>
