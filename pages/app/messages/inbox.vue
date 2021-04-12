<template>
<div>
  <v-list
    color='tertiary'
    v-if='messages.length > 0'
  three-line
  >
  <v-list-item
  v-for='message of messages'
  :key='message.id'
  ><v-list-item-avatar v-if='message.author' > <!-- we're not going to even be fetching the author for a bit --->
    <v-img :src="message.author.picture_url"></v-img>
  </v-list-item-avatar>

    <v-list-item-content>

      <v-list-item-content>
        <v-list-item-title v-if='message.author' v-html='message.author.name_display'>
        </v-list-item-title>
        <!--- todo: show a loading placeholder for name and photo -->
        <v-list-item-subtitle>
          {{message.subject}}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item-content>

  </v-list-item>
  </v-list>
  <v-container class='text-center align-center justify-center pt-16' v-else>
    <v-progress-circular
      :size="50"
      color="primary"
      indeterminate
    ></v-progress-circular>

  </v-container>
</div>
</template>

<script>
export default {
  name: 'inbox',
  data(){
    return {
      messages:[]
    }
  },
  async fetch() {
    this.messages = await this.$axios.$get('/api/users/me/messages/inbox');
    // todo: metadata fetching logic here
  },
  fetchOnServer: false
}
</script>

<style scoped>

</style>
