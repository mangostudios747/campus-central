import colors from 'vuetify/es5/util/colors'

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

export const state = () => ({
  theSchedule: {
    'holidays': {
      '8-7-2020': 'Labor Day',
      '10-11-2020': 'Veteran\'s Day',
      '10-23-2020': 'Thanksgiving Break',
      '10-24-2020': 'Thanksgiving Break',
      '10-25-2020': 'Thanksgiving Break',
      '10-26-2020': 'Thanksgiving Break',
      '10-27-2020': 'Thanksgiving Break',
      '11-21-2020': 'Winter Break',
      '11-22-2020': 'Winter Break',
      '11-23-2020': 'Winter Break',
      '11-24-2020': 'Winter Break',
      '11-25-2020': 'Winter Break',
      '11-26-2020': 'Winter Break',
      '11-27-2020': 'Winter Break',
      '11-28-2020': 'Winter Break',
      '11-29-2020': 'Winter Break',
      '11-30-2020': 'Winter Break',
      '11-31-2020': 'Winter Break',
      '0-1-2021': 'Winter Break',
      '0-2-2021': 'Winter Break',
      '0-3-2021': 'Winter Break',
      '0-4-2021': 'Winter Break',
      '0-5-2021': 'Winter Break',
      '0-6-2021': 'Winter Break',
      '0-7-2021': 'Winter Break'
    },
    'vacations': {},
    'overrides': {
      '7-17-2020': [
        {
          'name': 'Assembly',
          'start': [
            10,
            0
          ],
          'end': [
            11,
            0
          ]
        },
        {
          'name': 'Period 1',
          'start': [
            11,
            10
          ],
          'end': [
            11,
            30
          ]
        },
        {
          'name': 'Period 2',
          'start': [
            11,
            40
          ],
          'end': [
            12,
            0
          ]
        },
        {
          'name': 'Period 3',
          'start': [
            12,
            10
          ],
          'end': [
            12,
            30
          ]
        },
        {
          'name': 'Lunch',
          'start': [
            12,
            30
          ],
          'end': [
            13,
            0
          ]
        },
        {
          'name': 'Period 4',
          'start': [
            13,
            10
          ],
          'end': [
            13,
            35
          ]
        },
        {
          'name': 'Period 5',
          'start': [
            13,
            45
          ],
          'end': [
            14,
            5
          ]
        },
        {
          'name': 'Period 6',
          'start': [
            14,
            15
          ],
          'end': [
            14,
            35
          ]
        },
        {
          'name': 'Period 7',
          'start': [
            14,
            45
          ],
          'end': [
            15,
            5
          ]
        },
        {
          'name': 'Period 8',
          'start': [
            15,
            15
          ],
          'end': [
            15,
            35
          ]
        }
      ],
      '7-19-2020': [
        {
          'name': 'Period 5',
          'start': [
            9,
            40
          ],
          'end': [
            10,
            55
          ]
        },
        {
          'name': 'Go to Period 5',
          'start': [
            11,
            5
          ],
          'end': [
            11,
            40
          ]
        },
        {
          'name': 'Lunch',
          'start': [
            11,
            40
          ],
          'end': [
            12,
            10
          ]
        },
        {
          'name': 'Period 6',
          'start': [
            12,
            20
          ],
          'end': [
            13,
            35
          ]
        },
        {
          'name': 'Period 7',
          'start': [
            13,
            45
          ],
          'end': [
            15,
            0
          ]
        }
      ],
      '8-2-2020': [
        {
          'name': 'Period 5',
          'start': [
            9,
            40
          ],
          'end': [
            10,
            55
          ]
        },
        {
          'name': 'SELF',
          'start': [
            11,
            5
          ],
          'end': [
            11,
            40
          ]
        },
        {
          'name': 'Lunch',
          'start': [
            11,
            40
          ],
          'end': [
            12,
            10
          ]
        },
        {
          'name': 'Period 6',
          'start': [
            12,
            20
          ],
          'end': [
            13,
            40
          ]
        },
        {
          'name': 'Period 7',
          'start': [
            13,
            50
          ],
          'end': [
            15,
            5
          ]
        }
      ],
      '8-4-2020': [
        {
          'name': 'Collab/Prep',
          'start': [
            8,
            30
          ],
          'end': [
            9,
            35
          ]
        },
        {
          'name': 'Period 5',
          'start': [
            9,
            40
          ],
          'end': [
            10,
            45
          ]
        },
        {
          'name': 'Period 6',
          'start': [
            10,
            55
          ],
          'end': [
            12,
            5
          ]
        },
        {
          'name': 'Period 7',
          'start': [
            12,
            15
          ],
          'end': [
            1,
            20
          ]
        }
      ],
      '10-9-2020': [
        {
          'name': 'Period 1',
          'start': [
            9,
            0
          ],
          'end': [
            10,
            15
          ]
        },
        {
          'name': 'Period 2',
          'start': [
            10,
            25
          ],
          'end': [
            11,
            40
          ]
        },
        {
          'name': 'Lunch',
          'start': [
            11,
            40
          ],
          'end': [
            12,
            10
          ]
        },
        {
          'name': 'Period 3',
          'start': [
            12,
            20
          ],
          'end': [
            13,
            40
          ]
        },
        {
          'name': 'Period 4',
          'start': [
            13,
            50
          ],
          'end': [
            15,
            5
          ]
        },
        {
          'name': 'Period 8',
          'start': [
            15,
            45
          ],
          'end': [
            17,
            0
          ]
        }
      ],
      '10-10-2020': [
        {
          'name': 'Period 5',
          'start': [
            9,
            40
          ],
          'end': [
            10,
            55
          ]
        },
        {
          'name': 'SELF',
          'start': [
            11,
            5
          ],
          'end': [
            11,
            40
          ]
        },
        {
          'name': 'Lunch',
          'start': [
            11,
            40
          ],
          'end': [
            12,
            10
          ]
        },
        {
          'name': 'Period 6',
          'start': [
            12,
            20
          ],
          'end': [
            13,
            40
          ]
        },
        {
          'name': 'Period 7',
          'start': [
            13,
            50
          ],
          'end': [
            15,
            5
          ]
        }
      ],
      '11-18-2020': [
        {
          'name': 'Period 5',
          'start': [
            9,
            40
          ],
          'end': [
            10,
            45
          ]
        },
        {
          'name': 'Period 6',
          'start': [
            10,
            55
          ],
          'end': [
            12,
            5
          ]
        },
        {
          'name': 'Period 7',
          'start': [
            12,
            15
          ],
          'end': [
            13,
            20
          ]
        }
      ],
      '11-16-2020': [
        {
          'name': 'Period 5',
          'start': [
            9,
            40
          ],
          'end': [
            10,
            55
          ]
        },
        {
          'name': 'SELF',
          'start': [
            11,
            5
          ],
          'end': [
            11,
            40
          ]
        },
        {
          'name': 'Lunch',
          'start': [
            11,
            40
          ],
          'end': [
            12,
            10
          ]
        },
        {
          'name': 'Period 6',
          'start': [
            12,
            20
          ],
          'end': [
            13,
            40
          ]
        },
        {
          'name': 'Period 7',
          'start': [
            13,
            50
          ],
          'end': [
            15,
            5
          ]
        }
      ]
    },
    'defaults': [
      null,
      [
        {
          'name': 'Period 1',
          'start': [
            10,
            0
          ],
          'end': [
            10,
            30
          ]
        },
        {
          'name': 'Period 2',
          'start': [
            10,
            40
          ],
          'end': [
            11,
            10
          ]
        },
        {
          'name': 'Period 3',
          'start': [
            11,
            20
          ],
          'end': [
            11,
            50
          ]
        },
        {
          'name': 'Period 4',
          'start': [
            12,
            0
          ],
          'end': [
            12,
            35
          ]
        },
        {
          'name': 'Lunch',
          'start': [
            12,
            35
          ],
          'end': [
            13,
            5
          ]
        },
        {
          'name': 'Period 5',
          'start': [
            13,
            15
          ],
          'end': [
            13,
            45
          ]
        },
        {
          'name': 'Period 6',
          'start': [
            13,
            55
          ],
          'end': [
            14,
            25
          ]
        },
        {
          'name': 'Period 7',
          'start': [
            14,
            35
          ],
          'end': [
            15,
            5
          ]
        },
        {
          'name': 'Period 8',
          'start': [
            15,
            45
          ],
          'end': [
            16,
            15
          ]
        }
      ],
      [
        {
          'name': 'Period 1',
          'start': [
            9,
            0
          ],
          'end': [
            10,
            15
          ]
        },
        {
          'name': 'Period 2',
          'start': [
            10,
            25
          ],
          'end': [
            11,
            40
          ]
        },
        {
          'name': 'Lunch',
          'start': [
            11,
            40
          ],
          'end': [
            12,
            10
          ]
        },
        {
          'name': 'Period 3',
          'start': [
            12,
            20
          ],
          'end': [
            13,
            40
          ]
        },
        {
          'name': 'Period 4',
          'start': [
            13,
            50
          ],
          'end': [
            15,
            5
          ]
        },
        {
          'name': 'Period 8',
          'start': [
            15,
            45
          ],
          'end': [
            17,
            0
          ]
        }
      ],
      [
        {
          'name': 'Period 5',
          'start': [
            9,
            40
          ],
          'end': [
            10,
            55
          ]
        },
        {
          'name': 'Gunn Together',
          'start': [
            11,
            5
          ],
          'end': [
            11,
            40
          ]
        },
        {
          'name': 'Lunch',
          'start': [
            11,
            40
          ],
          'end': [
            12,
            10
          ]
        },
        {
          'name': 'Period 6',
          'start': [
            12,
            20
          ],
          'end': [
            13,
            40
          ]
        },
        {
          'name': 'Period 7',
          'start': [
            13,
            50
          ],
          'end': [
            15,
            5
          ]
        }
      ],
      [
        {
          'name': 'Period 1',
          'start': [
            9,
            0
          ],
          'end': [
            10,
            15
          ]
        },
        {
          'name': 'Period 2',
          'start': [
            10,
            25
          ],
          'end': [
            11,
            40
          ]
        },
        {
          'name': 'Lunch',
          'start': [
            11,
            40
          ],
          'end': [
            12,
            10
          ]
        },
        {
          'name': 'Period 3',
          'start': [
            12,
            20
          ],
          'end': [
            13,
            40
          ]
        },
        {
          'name': 'Period 4',
          'start': [
            13,
            50
          ],
          'end': [
            15,
            5
          ]
        },
        {
          'name': 'Period 8',
          'start': [
            15,
            45
          ],
          'end': [
            17,
            0
          ]
        }
      ],
      [
        {
          'name': 'Period 5',
          'start': [
            9,
            40
          ],
          'end': [
            10,
            55
          ]
        },
        {
          'name': 'SELF',
          'start': [
            11,
            5
          ],
          'end': [
            11,
            40
          ]
        },
        {
          'name': 'Lunch',
          'start': [
            11,
            40
          ],
          'end': [
            12,
            10
          ]
        },
        {
          'name': 'Period 6',
          'start': [
            12,
            20
          ],
          'end': [
            13,
            40
          ]
        },
        {
          'name': 'Period 7',
          'start': [
            13,
            50
          ],
          'end': [
            15,
            5
          ]
        }
      ],
      null
    ]
  },
  customizations: {
    'Period 1': {
      color: colors.deepOrange.base
    },
    'Period 2': {
      color: colors.yellow.darken2
    },
    'Period 3': {
      color: colors.green.base
    },
    'Period 4': {
      color: colors.blue.base
    },
    'Period 5': {
      color: colors.teal.lighten1
    },
    'Period 6': {
      color: colors.indigo.base
    },
    'Period 7': {
      color: colors.deepPurple.base
    },
    'Period 8': {
      color: colors.brown.lighten1
    },
    'Lunch': {
      color: colors.blueGrey.base
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
  }
}

export const actions = {
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
        return {
          name: (state.customizations[event.name] || { name: undefined }).name || event.name,
          meta: (state.customizations[event.name] || { meta: {} }).meta,
          id: event.name,
          start: new Date(dob.getFullYear(), dob.getMonth(), dob.getDate(), event.start[0], event.start[1]),
          end: new Date(dob.getFullYear(), dob.getMonth(), dob.getDate(), event.end[0], event.end[1]),
          timed: true,
          color: (state.customizations[event.name] || { color: 'blue-grey' }).color
        }
      })//regular schedule for this day of the week
    }
  },
  currentEvent: (state, getters) => {
    const now = state.now
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
          isValid: true
        }

      }

    }
    return {
      type: 'none',
      name: 'the day',
      isValid: false,
      remaining: 'No School'
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
