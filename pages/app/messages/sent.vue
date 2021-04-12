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
    ><v-list-item-avatar v-if='message.recipient' > <!-- we're not going to even be fetching the author for a bit --->
      <v-img :src="message.recipient.picture_url"></v-img>
    </v-list-item-avatar>

      <v-list-item-content>

        <v-list-item-content>
          <v-list-item-title v-if='message.recipient' v-html='message.recipient.name_display'>
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
  name: 'sent',
  data(){
    return {
      messages:[]
    }
  },
  async fetch() {
    if (this.$store.state.messages.sent.length > 0){
      this.messages= this.$store.state.messages.sent
    }
    else {
      const messages = await this.$axios.$get('/api/users/me/messages/sent');
      this.$store.commit('setMessagesSent', messages)
      this.messages = messages
    }
  },
  fetchOnServer: false
}
</script>

<style scoped>

</style>
