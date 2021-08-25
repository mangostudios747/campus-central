import colors from 'vuetify/es5/util/colors'
import {  firebaseAction } from 'vuexfire'

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf())
  date.setDate(date.getDate() + days)
  return date
}

Date.prototype.addHours = function(hrs) {
  let date = new Date(this.valueOf())
  date.setHours(date.getHours() + hrs)
  return date
}

Date.prototype.addMinutes = function(hrs) {
  let date = new Date(this.valueOf())
  date.setMinutes(date.getMinutes() + hrs)
  return date
}

const periodStates = {
  PAST:-1,
  PRESENT:0,
  FUTURE:1
}

export const state = () => ({
  theSchedule: {
    "defaults" : [ null, [ {
      "end" : [ 9, 45 ],
      "name" : "Period 1",
      "start" : [ 9, 0 ]
    }, {
      "end" : [ 10, 40 ],
      "name" : "Period 2",
      "start" : [ 9, 55 ]
    }, {
      "end" : [ 10, 45 ],
      "name" : "Brunch",
      "start" : [ 10, 40 ]
    }, {
      "end" : [ 11, 40 ],
      "name" : "Period 3",
      "start" : [ 10, 55 ]
    }, {
      "end" : [ 12, 35 ],
      "name" : "Period 4",
      "start" : [ 11, 50 ]
    }, {
      "end" : [ 13, 5 ],
      "name" : "Lunch",
      "start" : [ 12, 35 ]
    }, {
      "end" : [ 14, 0 ],
      "name" : "Period 5",
      "start" : [ 13, 15 ]
    }, {
      "end" : [ 14, 55 ],
      "name" : "Period 6",
      "start" : [ 14, 10 ]
    }, {
      "end" : [ 15, 50 ],
      "name" : "Period 7",
      "start" : [ 15, 5 ]
    }, {
      "end" : [ 16, 45 ],
      "name" : "Period 8",
      "start" : [ 16, 0 ]
    } ], [ {
      "end" : [ 10, 35 ],
      "name" : "Period 1",
      "start" : [ 9, 0 ]
    }, {
      "end" : [ 10, 40 ],
      "name" : "Brunch",
      "start" : [ 10, 35 ]
    }, {
      "end" : [ 12, 20 ],
      "name" : "Period 2",
      "start" : [ 10, 50 ]
    }, {
      "end" : [ 12, 50 ],
      "name" : "Lunch",
      "start" : [ 12, 20 ]
    }, {
      "end" : [ 14, 30 ],
      "name" : "Period 3",
      "start" : [ 13, 0 ]
    }, {
      "end" : [ 16, 10 ],
      "name" : "Period 4",
      "start" : [ 14, 40 ]
    } ], [ {
      "end" : [ 10, 35 ],
      "name" : "Period 5",
      "start" : [ 9, 0 ]
    }, {
      "end" : [ 10, 40 ],
      "name" : "Brunch",
      "start" : [ 10, 35 ]
    }, {
      "end" : [ 12, 20 ],
      "name" : "Period 6",
      "start" : [ 10, 50 ]
    }, {
      "end" : [ 12, 50 ],
      "name" : "Lunch",
      "start" : [ 12, 20 ]
    }, {
      "end" : [ 14, 30 ],
      "name" : "Period 7",
      "start" : [ 13, 0 ]
    }, {
      "end" : [ 16, 30 ],
      "name" : "PRIME",
      "start" : [ 14, 40 ]
    } ], [ {
      "end" : [ 10, 35 ],
      "name" : "Period 1",
      "start" : [ 9, 0 ]
    }, {
      "end" : [ 10, 40 ],
      "name" : "Brunch",
      "start" : [ 10, 35 ]
    }, {
      "end" : [ 12, 20 ],
      "name" : "Period 2",
      "start" : [ 10, 50 ]
    }, {
      "end" : [ 12, 50 ],
      "name" : "Lunch",
      "start" : [ 12, 20 ]
    }, {
      "end" : [ 14, 30 ],
      "name" : "Period 3",
      "start" : [ 13, 0 ]
    }, {
      "end" : [ 16, 10 ],
      "name" : "Period 4",
      "start" : [ 14, 40 ]
    } ], [ {
      "end" : [ 10, 35 ],
      "name" : "Period 5",
      "start" : [ 9, 0 ]
    }, {
      "end" : [ 10, 40 ],
      "name" : "Brunch",
      "start" : [ 10, 35 ]
    }, {
      "end" : [ 12, 20 ],
      "name" : "Period 6",
      "start" : [ 10, 50 ]
    }, {
      "end" : [ 12, 50 ],
      "name" : "Lunch",
      "start" : [ 12, 20 ]
    }, {
      "end" : [ 13, 50 ],
      "name" : "SELF",
      "start" : [ 13, 0 ]
    }, {
      "end" : [ 15, 30 ],
      "name" : "Period 7",
      "start" : [ 14, 0 ]
    } ] ],
    "holidays" : {
      
    },
    "overrides" : {
    
     
    }
  }
  ,
  customizations: {
    'Period 1': {
      color: colors.lime.darken2
    },
    'Period 2': {
      color: colors.lightGreen.base
    },
    'Period 3': {
      color: colors.green.base
    },
    'Period 4': {
      color: colors.teal.base
    },
    'Period 5': {
      color: colors.lightBlue.base
    },
    'Period 6': {
      color: colors.blue.darken1
    },
    'Period 7': {
      color: colors.indigo.darken2
    },
    'Period 8': {
      color: colors.deepPurple.darken1
    },
    'Lunch': {
      color: colors.cyan.base
    },
    'Other': {
      color: colors.blueGrey.base
    }
  },
  now: new Date()
})

export const mutations = {

  resetTime(state) {
    //console.log('bye')
    state.now = (new Date())//.addHours(15);
  },
  setCustomizations(state, customizations) {
    state.customizations = customizations
  },
  updateSchedule:function(state, schedule){
    state.theSchedule = schedule
  },
}

export const actions = {
  bindSchedule: firebaseAction( function ({ bindFirebaseRef }) {
    const ref = this.$fire.database
      .ref('/schedule');
    
     return bindFirebaseRef('theSchedule', ref);
  }),
  customize({ state }, courses) {
    for (const { course_title, section_title, id, profile_url } of courses) {
      const key = section_title.split(' ')[0]
      if (+key) {
        // valid period class
        state.customizations['Period ' + key].meta = {};
        state.customizations['Period ' + key].meta.id = id
        state.customizations['Period ' + key].name = course_title
        state.customizations['Period ' + key].meta.photo = profile_url
        state.customizations['Period ' + key].meta.course_home = `https://pausd.schoology.com/course/${id}/materials`
      }
      else if (key==='SELF'){
        state.customizations[key] = {};
        state.customizations[key].meta = {};
        state.customizations[key].meta.id = id
        state.customizations[key].name = course_title
        state.customizations[key].meta.photo = profile_url
        state.customizations[key].meta.course_home = `https://pausd.schoology.com/course/${id}/materials`
      }
    }
    state.customizations['Gunn Together'] = {};
    state.customizations['Gunn Together'].meta = state.customizations['Period 5'].meta
  }
}

export const getters = {
  scheduleForDate: (state) => (dob) => {
    const sched = state.theSchedule
    const ref = dob.getMonth() + '-' + dob.getDate() + '-' + dob.getFullYear()
    if (dob < new Date(2020, 7, 17)) {
      return []
    }
    if (ref in sched.overrides) {
      //console.log("overridden");

      return sched.overrides[ref]
    } else if (ref in sched.holidays) {
      /* if (mainView) {
         this.holidayReason = sched.holidays[ref]
       }*/
      return [] //empty schedule, and set the holiday reason to what it is
    } else {
      //console.log("default");
      //if (mainView) this.holidayReason = null;
      return (sched.defaults[dob.getDay()] || []).map(function(event) {
        const start = new Date(dob.getFullYear(), dob.getMonth(), dob.getDate(), event.start[0], event.start[1]);
        const end = new Date(dob.getFullYear(), dob.getMonth(), dob.getDate(), event.end[0], event.end[1]);
        let progress;
        let status;
        const now = (new Date)//.addDays(2);
        if (now < start) {
          progress = 0;
          status = periodStates.FUTURE
        }
        else if (now > end) {
          progress = 100
          status = periodStates.PAST
        }
        else {
          progress = (now-start)*100/(end-start);
          status = periodStates.PRESENT
        }
        return {
          name: (state.customizations[event.name] || { name: undefined }).name || event.name,
          meta: (state.customizations[event.name] || { meta: {} }).meta,
          id: event.name,
          start,
          end,
          status,
          timed: true,
          progress,
          color: (state.customizations[event.name] || { color: 'blue-grey' }).color
        }
      })//regular schedule for this day of the week
    }
  },
  currentEvent: (state, getters) => {
    const now = state.now//.addDays(2)
    const sched = getters.scheduleForDate(now)
    for (let index in sched) {
      const event = sched[index]
      const start = event.start
      //console.log(start);
      // if we even got here, then either the previous doesn't exist or isn't happening.
      if (now < start) {

        return {
          type: 'future',
          name: (state.customizations[event.id] || { name: undefined }).name || event.name,
          meta: (state.customizations[event.id] || { meta: {} }).meta,
          id: event.id,
          displayText: 'until',
          remaining: (+start - now) / 60000,
          elapsed: null,
          total: null,
          percent: index !== 0 ? (100 - (+start - now) / 6000) : null,
          isValid: true
        }
      }
      const end = event.end
      if (start <= now && now <= end) {
        return {
          type: 'current',
          name: (state.customizations[event.name] || { name: undefined }).name || event.name,
          meta: (state.customizations[event.id] || { meta: {} }).meta,
          id: event.id,
          displayText: 'left in',
          remaining: (+end - now) / 60000,
          elapsed: (+now - start) / 60000,
          total: (+end - start) / 60000,
          percent: (+now - start) * (100) / (+end - start),
          isValid: true
        }
      }
      // ok so either it's the last period or some later period is happening
      else if (parseInt(index) === sched.length - 1) {
        // since!
        return {
          type: 'since',
          name: (state.customizations[event.name] || { name: undefined }).name || event.name,
          meta: (state.customizations[event.id] || { meta: {} }).meta,
          id: event.id,
          displayText: 'since',
          remaining: null,
          elapsed: (+now - end) / 60000,
          total: null,
          percent: null,
          isValid: false  // we don't want to be like since 7th period happened you're still at school
        }

      }

    }
    return {
      type:"none",
      name:"today",
      isHoliday:true,
      isValid:false,
      remaining: "No School",
      percent: 0
    }

  },
  upcomingEvents: (state, getters) => {
    const schedule = getters.scheduleForDate(state.now)
    const currId = getters.currentEvent.name
    let upcoming = []
    let ready = false
    for (let event of schedule) {
      if (ready) {
        upcoming.push(event)
      }

      if (event.name === currId) {

        ready = true
        if (getters.currentEvent.type === 'future') {
          upcoming.push(event)
        }
      }

    }
    return upcoming
  }
}
