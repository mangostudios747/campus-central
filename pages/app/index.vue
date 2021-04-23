<template>
  <div >
  <v-row v-if="$store.getters['hc/currentEvent'].isValid" class='mt-10 px-4'>
    <v-col cols='4'>
      <v-card  elevation='0' color='background' style='border: 1px solid #ffffff22 !important' class='text-center py-7'>
        <v-progress-circular class=' elevation-10 ' style='border-radius: 50%'
                             :rotate='270'
                             :size='350'
                             :width='35'
                             :value="$store.getters['hc/currentEvent'].percent"
                             :color="($store.state.hc.customizations[$store.getters['hc/currentEvent'].id]||{color:'blue-grey'}).color"
        >
          <v-col class='text-center'>
            <v-row>
              <span
                class='display-4 mx-auto'>{{ Math.ceil($store.getters['hc/currentEvent'].remaining || $store.getters['hc/currentEvent'].elapsed) }}</span>
            </v-row>
            <v-row><span class=' mx-auto'>minutes {{ $store.getters['hc/currentEvent'].displayText }}</span></v-row>
            <v-row><span class=' display-1 mx-auto mt-2'>{{ $store.getters['hc/currentEvent'].name }}</span></v-row>
            <v-row></v-row>
          </v-col>
        </v-progress-circular>
      </v-card>

    </v-col>
    <v-col>
      <v-card v-if=" $store.getters['hc/currentEvent'].meta" class='py-3' elevation='0' color='background' style='border: 1px solid #ffffff22 !important'>
        <v-list-item class='ml-3 '>
          <v-list-item-avatar>
            <v-img
              :src="$store.getters['hc/currentEvent'].meta.photo"
            ></v-img>
          </v-list-item-avatar>
          <v-card-title>
            {{ $store.getters['hc/currentEvent'].name }}
          </v-card-title>

          <v-list-item-action>
            <v-btn color='accent' v-if='$store.getters["hc/currentEvent"].meta.course_home' title='Course Home Page'
                   target='_blank' :href='$store.getters["hc/currentEvent"].meta.course_home' icon>
              <!--<v-avatar size='35'>
                <img src='/schoology-logo.png'/>
              </v-avatar>--->
              <v-icon>mdi-open-in-new</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>

        <course-materials :key='$store.getters["hc/currentEvent"].meta.id' v-if='$store.getters["hc/currentEvent"].meta.id'
                          :courseid='$store.getters["hc/currentEvent"].meta.id'></course-materials>
      </v-card>
    </v-col>
  </v-row>
    <v-row v-else>
      <v-col>
    <week-calendar/>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CourseMaterials from '@/components/CourseMaterials'

export default {
  name: 'index',
  components: {
    CourseMaterials
  },
  head(){
    return {
      title:'Home'
    }
  },
}
</script>

<style scoped>

</style>
