<template>
  <v-container>

    <div v-if='updates'>
      <update @like='like' :update='update' :key='update.id' v-for='update of updates'
      >
      </update>
    </div>
    <v-container class='text-center align-center justify-center pt-16' v-else>
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>

    </v-container>
  </v-container>
</template>

<script>
export default {
  name: 'updates',
  async  asyncData({ $axios, params }) {
    const updates = await $axios.$get('/cc/api/sections/'+params.course+'/updates')

    return { updates }
  },
  methods: {
    like(id, response){
      Object.assign(this.updates.find(e=>e.id===id), response)
    }
  }
}
</script>

<style scoped>

</style>
