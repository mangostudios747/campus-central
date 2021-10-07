<template>
<v-container>
  <h1>Settings</h1>

  <v-switch color='accent' v-model='$vuetify.theme.dark' label='Dark Mode'></v-switch>

  <v-list
				three-line
				subheader
		>
			<v-subheader>Class Settings</v-subheader>
			<v-list-item :key="event" v-for="(evSettings, event) in customizations">

				<v-menu  offset-y :close-on-content-click="false" >
					<template v-slot:activator="{on, attrs}">
						<v-list-item-avatar v-bind="attrs" v-on="on"  :color="(customizations[event]).color"></v-list-item-avatar>
					</template>
					<v-color-picker show-swatches mode="hexa" v-model="customizations[event].color"></v-color-picker>
				</v-menu>
				<v-list-item-content>
					<v-text-field  v-model="customizations[event].name" :value="customizations[event].name||event" :placeholder="event"></v-text-field>

				</v-list-item-content>
			</v-list-item>
		</v-list>

    <v-snackbar color='secondary' :light='!$vuetify.theme.dark' :dark='$vuetify.theme.dark' :timeout='-1'  v-model='unsavedChanges'>
      <span style='color:var(--text);'>You have unsaved changes!</span>
      <template #action='{attrs}'>
        <v-btn @click='setCustomizations' color='accent'>
          <v-progress-circular
            v-if='savingChanges'
            indeterminate
            color="accent"
          ></v-progress-circular>
          <span v-else>Save</span>
        </v-btn>
      </template>
    </v-snackbar>
</v-container>
</template>

<script>
export default {
  name: 'Settings',
  head(){
    return {
      title:'Settings'
    }
  },
  data:()=>({
    customizations:{},
    unsavedChanges: false,
    savingChanges: false,
    customizationsBuffer:{}
  }),
  mounted(){
     this.customizations = JSON.parse(JSON.stringify(this.$store.state.hc.customizations));
  },
  methods: {
    setCustomizations(){
      if (this.savingChanges) return;
      this.savingChanges = true;
      if (this.$store.state.user) this.$store.commit('hc/setCustomizations',this.customizations);
      else {
        // do stuff in localStorage
        if (!localStorage.customizations){
          localStorage.customizations = JSON.stringify({classes: this.customizations});
        } else {
          let c = JSON.parse(localStorage.customizations || '{}');
          c.classes = this.customizations;
          localStorage.customizations = JSON.stringify(c);
        }
      }
      this.unsavedChanges = false;
      this.savingChanges = false;
    }
  },
  watch:{
    customizations:{
      handler(n,o){
        const change = (JSON.stringify(n) !== JSON.stringify(this.customizationsBuffer)) && JSON.stringify(this.customizationsBuffer) !== '{}';
        this.customizationsBuffer = JSON.parse(JSON.stringify(n));
        if (change) this.unsavedChanges = true;
      },
      deep: true
    }
  },
  async asyncData(ctx) {
    let user;
    if (process.server)  user = ctx.req.user;
    return {user}
  },
}
</script>

<style scoped>

</style>
