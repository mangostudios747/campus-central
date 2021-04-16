<template>
  <v-container>
    <h1>Updates</h1>
    <div v-if='updates'>
      <v-card class='my-3 py-2' color='#0F326199' :key='update.id' v-for='update of updates'
      >
        <v-list-item two-line>
          <v-list-item-avatar>
            <v-img
              :src='update.author.picture_url'
            />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-html='update.author.name_display'></v-list-item-title>
            <v-list-item-subtitle>Posted {{ new Date(update.last_updated*1000) | moment('from', 'now') }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-card-text v-linkified style='white-space: pre-wrap' v-html='update.body'>
        </v-card-text>
        <v-card-actions>

          <v-btn :text='!update.user_like_action'  color='accent'>
            <v-icon left>
              mdi-thumb-up
            </v-icon>
            {{update.likes}}
          </v-btn>
        </v-card-actions>

      </v-card>
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
    const updates = await $axios.$get('/api/sections/'+params.course+'/updates')

    return { updates }
  }
}
</script>

<style scoped>

</style>
