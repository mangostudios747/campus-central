import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _0e088c62 = () => interopDefault(import('../src/pages/app.vue' /* webpackChunkName: "pages/app" */))
const _b7427d36 = () => interopDefault(import('../src/pages/app/index.vue' /* webpackChunkName: "pages/app/index" */))
const _1aa5f2ea = () => interopDefault(import('../src/pages/app/courses.vue' /* webpackChunkName: "pages/app/courses" */))
const _a1c18e64 = () => interopDefault(import('../src/pages/app/courses/index.vue' /* webpackChunkName: "pages/app/courses/index" */))
const _286a7036 = () => interopDefault(import('../src/pages/app/courses/_course.vue' /* webpackChunkName: "pages/app/courses/_course" */))
const _b199138e = () => interopDefault(import('../src/pages/app/courses/_course/index.vue' /* webpackChunkName: "pages/app/courses/_course/index" */))
const _df4803a2 = () => interopDefault(import('../src/pages/app/courses/_course/todo.vue' /* webpackChunkName: "pages/app/courses/_course/todo" */))
const _75ecba71 = () => interopDefault(import('../src/pages/app/courses/_course/updates.vue' /* webpackChunkName: "pages/app/courses/_course/updates" */))
const _72a3df0e = () => interopDefault(import('../src/pages/app/grades.vue' /* webpackChunkName: "pages/app/grades" */))
const _db342dee = () => interopDefault(import('../src/pages/app/messages.vue' /* webpackChunkName: "pages/app/messages" */))
const _23107668 = () => interopDefault(import('../src/pages/app/messages/index.vue' /* webpackChunkName: "pages/app/messages/index" */))
const _d4887700 = () => interopDefault(import('../src/pages/app/messages/inbox.vue' /* webpackChunkName: "pages/app/messages/inbox" */))
const _1d5d00e4 = () => interopDefault(import('../src/pages/app/messages/sent.vue' /* webpackChunkName: "pages/app/messages/sent" */))
const _012c0bfc = () => interopDefault(import('../src/pages/app/profile.vue' /* webpackChunkName: "pages/app/profile" */))
const _2347dcd4 = () => interopDefault(import('../src/pages/app/schedule.vue' /* webpackChunkName: "pages/app/schedule" */))
const _04473f40 = () => interopDefault(import('../src/pages/app/settings.vue' /* webpackChunkName: "pages/app/settings" */))
const _551c2ac6 = () => interopDefault(import('../src/pages/app/updates.vue' /* webpackChunkName: "pages/app/updates" */))
const _12fc441b = () => interopDefault(import('../src/pages/inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _181701a0 = () => interopDefault(import('../src/pages/stats.vue' /* webpackChunkName: "pages/stats" */))
const _63841453 = () => interopDefault(import('../src/pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/app",
    component: _0e088c62,
    children: [{
      path: "",
      component: _b7427d36,
      name: "app"
    }, {
      path: "courses",
      component: _1aa5f2ea,
      children: [{
        path: "",
        component: _a1c18e64,
        name: "app-courses"
      }, {
        path: ":course",
        component: _286a7036,
        children: [{
          path: "",
          component: _b199138e,
          name: "app-courses-course"
        }, {
          path: "todo",
          component: _df4803a2,
          name: "app-courses-course-todo"
        }, {
          path: "updates",
          component: _75ecba71,
          name: "app-courses-course-updates"
        }]
      }]
    }, {
      path: "grades",
      component: _72a3df0e,
      name: "app-grades"
    }, {
      path: "messages",
      component: _db342dee,
      children: [{
        path: "",
        component: _23107668,
        name: "app-messages"
      }, {
        path: "inbox",
        component: _d4887700,
        name: "app-messages-inbox"
      }, {
        path: "sent",
        component: _1d5d00e4,
        name: "app-messages-sent"
      }]
    }, {
      path: "profile",
      component: _012c0bfc,
      name: "app-profile"
    }, {
      path: "schedule",
      component: _2347dcd4,
      name: "app-schedule"
    }, {
      path: "settings",
      component: _04473f40,
      name: "app-settings"
    }, {
      path: "updates",
      component: _551c2ac6,
      name: "app-updates"
    }]
  }, {
    path: "/inspire",
    component: _12fc441b,
    name: "inspire"
  }, {
    path: "/stats",
    component: _181701a0,
    name: "stats"
  }, {
    path: "/",
    component: _63841453,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
