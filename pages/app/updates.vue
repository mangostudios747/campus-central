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
          v-ripple
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
      <div v-if='update.attachments'>
        <div class='px-10' v-if='update.attachments.links'>


            <v-alert

              v-for='link in update.attachments.links.link'
              :key='link.id'

              border='left'
              text
              color='accent'>

              <h4><a style='color: var(--v-accent-base) !important;text-decoration: none' :href='link.url' >{{link.title}}</a></h4>
              <p v-if='link.summary' v-html='link.summary'></p>
            </v-alert>

        </div>
        <div class='px-10' v-if='update.attachments.files'>
          <v-row>
            <div class='py-3' :key='file.id' v-for='file of update.attachments.files.file'>
              <v-card style='cursor: pointer' v-ripple class='mx-3' v-if='file.filemime.split("/")[0]==="image"'>

                <v-img  :src='`https://pausd.schoology.com/attachment/${file.id}/image/attachment_image_thumb`'></v-img>
              </v-card>
            </div>
          </v-row>
        </div>
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
