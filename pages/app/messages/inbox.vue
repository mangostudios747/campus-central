<template>
<v-row>
  <v-col cols='3'>
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
    <v-card style='max-height: 77vh; overflow: scroll' v-if='focusedMessage' elevation='0' color='#0F326144' class='my-5 mr-5 px-4'>
      <v-sheet style='position: sticky;top: 0;z-index: 5' color='#071F45'>
        <v-card-title style='color:#fff'>{{focusedMessage[0].subject}}</v-card-title>

      </v-sheet>
      <div
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
      </div>


      <v-textarea clearable placeholder='Type a response . . . (just for fun, nothing will send.)' color='accent' filled>

      </v-textarea>
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
      focusedMessage:null
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
      this.focusedMessage= await this.fetchMessage(id)
    }
  }
}
</script>

<style scoped>
.v-card__text, .v-card__title {
  word-break: normal; /* maybe !important  */
}


</style>
