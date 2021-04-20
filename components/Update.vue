<template>
  <v-card class='my-3 py-2' elevation='0' color='blueLayer'
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
            <v-dialog
              transition="dialog-bottom-transition"
              max-width="600"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-card v-bind='attrs' v-on='on' style='cursor: pointer' v-ripple class='mx-3' v-if='file.filemime.split("/")[0]==="image"'>

                  <v-img  :src='`https://pausd.schoology.com/attachment/${file.id}/image/attachment_image_thumb`'></v-img>
                </v-card>
              </template>
              <template v-slot:default="dialog">
                <v-card color='secondary'>
                  <v-card-actions class="justify-end">

                    <v-btn
                      text
                      icon
                      @click="dialog.value = false"
                    ><v-icon>mdi-close</v-icon></v-btn>
                  </v-card-actions>
                  <v-img lazy-src='`https://pausd.schoology.com/attachment/${file.id}/image/attachment_image_thumb`' :src='`https://pausd.schoology.com/attachment/${file.id}/image/lightbox_preview`'></v-img>

                </v-card>
              </template>
            </v-dialog>

          </div>
        </v-row>
      </div>
    </div>

    <v-card-actions>
      <v-btn @click='like(update.id, !update.user_like_action)' :text='!update.user_like_action'  color='accent'>
        <v-icon left>
          mdi-thumb-up
        </v-icon>
        {{update.likes}}
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
export default {
  name: 'Update',
  props:['update'],
  emits:['like'],
  methods:{
    async like(id, desiredOutcome){
      // post to axios to get the new data
      const response = await this.$axios.$post('/api/users/like/'+id, {
        desiredOutcome
      } )
      // emit the new data
      this.$emit('like', id, response)

    }
  }
}
</script>

<style scoped>

</style>
