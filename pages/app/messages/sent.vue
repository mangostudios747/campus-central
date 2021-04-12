<template>
<v-row>
  <v-col cols='3'>


  <v-list
    style='overflow: scroll; max-height: 77vh'
    color='tertiary'
    class='ml-2'
    v-if='messages.length > 0'
    three-line
    nav
  >
    <v-list-item
      link
      @click='focusMessage(message.id)'
      v-for='message of messages'

      :key='message.id'
    ><v-list-item-avatar v-if='message.recipients' > <!-- we're not going to even be fetching the author for a bit --->
      <v-img :src="message.recipients[0].picture_url"></v-img>
    </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-content>
          <v-list-item-title v-if='message.recipients' v-html='message.recipients[0].name_display'>
          </v-list-item-title>
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
  <v-card style='max-height: 77vh; overflow: scroll' v-if='focusedMessage' elevation='0' color='#0F326144' class='my-5 mr-5 px-4'>
    <v-card-title>{{focusedMessage[0].subject}}</v-card-title>
    <div
    v-for='entry in focusedMessage'
    >
      <v-list-item >
        <v-list-item-avatar>
          <v-img  :src='entry.author.picture_url'/>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-html='entry.author.name_display'></v-list-item-title>
        </v-list-item-content>

      </v-list-item>
      <v-card-text style='white-space: pre-wrap' v-text='entry.message'>
      </v-card-text>
    </div>


    <v-textarea placeholder='Type a response . . . (just for fun, nothing will send.)' color='white' filled>

    </v-textarea>
  </v-card>
  </v-col>
</v-row>
</template>

<script>
export default {
  name: 'sent',
  data(){
    return {
      messages:[],
      focusedMessage: null
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
  fetchOnServer: false,
  methods:{
    async fetchMessage(id){
      return await this.$axios.$get('/api/users/me/messages/sent/'+id);
    },
    async focusMessage(id){
      this.focusedMessage= await this.fetchMessage(id)
    }
  }
}
</script>

<style scoped>
::-webkit-scrollbar-thumb {
  background: #5bd938;
}
</style>
