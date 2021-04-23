<template>
<v-container>
  <h1>Settings</h1>

  <v-switch color='accent' v-model='$vuetify.theme.dark' label='Dark Mode'></v-switch>
</v-container>
</template>

<script>
export default {
  name: 'Settings',
  head(){
    return {
      title:'Settings'
    }
  },
}
</script>

<style scoped>

</style>
