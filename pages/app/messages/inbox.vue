<template>
<v-row>
  <v-col :cols='focusedMessage?3:12'>
  <v-list

    style='overflow: scroll; max-height: 77vh'
    color='transparent'
    class='ml-2 my-5'
    v-if='messages.length > 0'
    three-line
    nav
  >

  <v-list-item
    link
    :class="{'v-list-item--active ':focusedMessage&&(message.id===focusedMessage[0].id)}"
    @click='focusMessage(message.id)'
  v-for='message of messages'
  :key='message.id'
  >

    <v-list-item-avatar v-if='message.author' > <!-- we're not going to even be fetching the author for a bit --->
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
    </v-col>
  <v-col>
    <v-card style='max-height: 77vh; overflow: scroll' v-if='focusedMessage' elevation='0' color='blueLayer' class='my-5 mr-5 px-4'>
      <v-sheet style='position: sticky;top: 0;z-index: 5' color='blueLayer'>
        <v-card-title>{{focusedMessage[0].subject}}</v-card-title>

      </v-sheet>
      <v-sheet rounded color='transparent'
               :key='index'
               v-for='(entry, index) in focusedMessage'
      >
        <v-list-item   >
          <v-list-item-avatar>
            <v-img  :src='entry.author.picture_url'/>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-html='entry.author.name_display'></v-list-item-title>
          </v-list-item-content>

        </v-list-item>

        <v-card-text >
          <div v-linkified v-html='entry.message' style='white-space: pre-wrap'>

          </div>
        </v-card-text>
      </v-sheet>


      <v-textarea rows='3' v-model='response[focusedMessage[0].id]' clearable placeholder='Type a response . . . ' color='accent' filled>

      </v-textarea>
      <v-row class='mb-5 mr-4'>
        <v-spacer/>
        <v-btn
          @click='sendReply'
          :loading='sending'
          :disabled='sending'
          color='accent'>
          <v-icon left>mdi-send</v-icon>
          Send</v-btn>
      </v-row>
    </v-card>
  </v-col>
</v-row>
</template>

<script>
export default {
  name: 'inbox',
  data(){
    return {
      messages:[],
      focusedMessage:null,
      response:{},
      sending:false
    }
  },
  head(){
    return {
      title:'Inbox'
    }
  },
  async fetch() {
    if (this.$store.state.messages.inbox.length > 0){
      this.messages= this.$store.state.messages.inbox
    }
    else {
      const messages = await this.$axios.$get('/api/users/me/messages/inbox');
      this.$store.commit('setMessagesInbox', messages)
      this.messages = messages
    }
  },
  fetchOnServer: false,
  methods:{
    async fetchMessage(id){
      return await this.$axios.$get('/api/users/me/messages/inbox/'+id);
    },
    async focusMessage(id){
      this.focusedMessage= await this.fetchMessage(id);

    },
    async sendReply(){
      if (!this.response[this.focusedMessage[0].id]) return;
      this.sending = true;
      await this.$axios.$post('/api/users/me/messages/'+this.focusedMessage[0].id, {
        subject: this.focusedMessage[0].subject,
        message: this.response[this.focusedMessage[0].id],
        recipient_ids: this.focusedMessage[0].recipient_ids
      });
      await this.focusMessage(this.focusedMessage[0].id)
      this.sending = false
      this.response[this.focusedMessage[0].id] = null
    }
  }
}
</script>

<style scoped>
.v-card__text, .v-card__title {
  word-break: normal; /* maybe !important  */
}


</style>
