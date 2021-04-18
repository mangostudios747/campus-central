<template>
<v-container>
  <h1>Updates</h1>
  <div v-if='updates'>
    <v-card class='my-3 py-2' elevation='0' color='blueLayer' :key='update.id' v-for='update of updates'
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
      <div class='px-10' v-if='update.poll'>
        <v-progress-linear
          :key='option.id'
          v-for='option in update.poll.options'
          :color="option.selected?'accent darken-1':'primary'"
          height="30"
          rounded
          :value="option.count*100/(Math.max(...update.poll.options.map(e=>e.count))+1)"
          class='my-2'
        >
          <template v-slot:default>
            <v-row class='px-6'><strong :style='{color: (option.selected&&false ? "#141414":"#eff3fc")}' > {{ option.title }}</strong><v-spacer/><strong>{{option.count}}</strong></v-row>
          </template>
        </v-progress-linear>
      </div>
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

  async  asyncData({ $axios }) {
    const updates = await $axios.$get('/api/users/me/recent')
    return { updates }
  }
}
</script>

<style >
.linkified{
  color: var(--v-accent-base) !important;
}
</style>
