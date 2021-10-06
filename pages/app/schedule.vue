<template>
  <div class="flex flex-col">
    <div class="px-10 flex flex-row w-full m-0">
      <v-btn @click="prevDay" icon><v-icon>mdi-chevron-left</v-icon></v-btn>
      <v-spacer />
      <h1 class="hidden sm:block">
        {{ focusedDate | moment('dddd, MMMM Do, YYYY') }}
      </h1>
      <h3 class="block sm:hidden my-auto">
        {{ focusedDate | moment('ddd, MMM Do, YYYY') }}
      </h3>
      <v-spacer />
      <v-btn @click="nextDay" icon><v-icon>mdi-chevron-right</v-icon></v-btn>
    </div>
    <v-row v-if="schedule.length > 0">
      <v-col class="mx-10">
        <v-progress-linear
          elevation="0"
          :value="period.progress"
          height="none"
          class="mr-16 rounded-sm h-32 md:h-16 my-3"
          :color="period.color + 'bb'"
          :key="period.hcname"
          rounded
          v-for="period in schedule"
        >
          <div class="text-center flex flex-row big-screen px-8">
            <div style="align-self: center; text-align: left">
              <span
              >{{
                  period.status === periodStates.FUTURE ? 'Starting' : 'Started'
                }}
                {{ period.start | moment('from', 'now') }}</span
              ><br />
              <span style="color: var(--text)"
              >at {{ period.start | moment('h:mm A') }}</span
              >
            </div>
            <v-spacer />
            <h2 style="align-self: center">{{ period.name }}</h2>
            <v-spacer />
            <div style="align-self: center; text-align: right">
              <span
              >{{ period.status === periodStates.PAST ? 'Ended' : 'Ending' }}
                {{ period.end | moment('from', 'now') }}</span
              ><br />
              <span style="color: var(--text)"
              >at {{ period.end | moment('h:mm A') }}</span
              >
            </div>
          </div>
          <div class="text-center flex flex-row small-screen px-3">
            <v-col
            ><div class="flex flex-row"
            ><span class="font-semibold text-xl">{{ period.name }}</span></div
            >
              <div class="flex flex-row"><span
              ><span :style="`color: var(--text)`">{{
                  period.start | moment('h:mm A')
                }}</span> - <span :style="`color: var(--text)`">{{
                  period.end | moment('h:mm A')
                }}</span></span
              ></div>
              <div class="flex flex-row">
                <span v-if="period.status === periodStates.FUTURE" style="color: var(--text);">
                  Starting {{period.start | moment('from', 'now')}}
                  </span>
                <span v-else
                >{{ period.status === periodStates.PAST ? 'Ended' : 'Ending' }}
                {{ period.end | moment('from', 'now') }}</span
                >
              </div>
            </v-col>
          </div>
        </v-progress-linear>
      </v-col>
    </v-row>
    <v-row class="mx-16 my-5 text-center" v-else>
      <v-col class="mx-auto text-center">
        <v-icon class="big-screen" size="300">mdi-sofa-single</v-icon>
        <v-icon class="small-screen" size="200">mdi-sofa-single</v-icon>
        <h1 >{{schedule.reason || "No School Today"}}</h1>
        <div class='pt-4 ' v-if='fact'>
          <p class='text-xl'>{{fact.text}}</p>
          <a target='_blank' :href='fact.source_url'>- {{fact.source}}</a>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'todo',
  data: () => ({
    focusedDate: new Date(), //.addDays(2),
    periodStates: {
      PAST: -1,
      PRESENT: 0,
      FUTURE: 1,
    },
    schedule: [],
    fact:null
  }),
  head() {
    return {
      title: 'Schedule',
    }
  },
  async mounted() {
    const v = this
    setInterval(() => {
      const now = new Date();
      if (Math.abs(now - v.focusedDate) < 1000) {
        v.focusedDate = now;
      }
      v.schedule = v.$store.getters['hc/scheduleForDate'](v.focusedDate)
    }, 10);
    this.fact = await this.$axios.$get('https://uselessfacts.jsph.pl/today.json?language=en');

  },
  computed: {
    /*schedule(){
      return this.$store.getters['hc/scheduleForDate'](this.focusedDate);
    }*/
  },
  methods: {
    nextDay() {
      this.focusedDate = this.focusedDate.addDays(1)
      console.warn("time changed")
    },
    prevDay() {
      this.focusedDate = this.focusedDate.addDays(-1)
    },
  },
}
</script>

<style >
.big-screen {
  @apply hidden sm:flex !important;
}

.small-screen {
  @apply sm:hidden flex !important;
}
</style>
