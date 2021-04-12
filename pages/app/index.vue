<template>
  <div style='height: 100%' class='text-center mt-10'>
    <v-progress-circular class=" elevation-10 " style="border-radius: 50%"
                         :rotate="270"
                         :size="350"
                         :width="35"

                         :value="50"
                         :color="({color:'blue-grey'}).color"
    >
      <v-col class="text-center">
        <v-row>
          <span class="display-4 mx-auto">{{15}}</span>
        </v-row>
        <v-row><span class=" mx-auto">minutes left in</span></v-row>
        <v-row><span class=" display-1 mx-auto mt-2">Hell</span></v-row>
        <v-row></v-row>
      </v-col>
    </v-progress-circular>
    </div>
</template>

<script>
export default {
  name: 'index'
}
</script>

<style scoped>

</style>
