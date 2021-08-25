import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _b2e69a4e = () => interopDefault(import('../pages/app.vue' /* webpackChunkName: "pages/app" */))
const _e4981ac8 = () => interopDefault(import('../pages/app/index.vue' /* webpackChunkName: "pages/app/index" */))
const _490a73fc = () => interopDefault(import('../pages/app/courses.vue' /* webpackChunkName: "pages/app/courses" */))
const _67674305 = () => interopDefault(import('../pages/app/courses/index.vue' /* webpackChunkName: "pages/app/courses/index" */))
const _224e6ea6 = () => interopDefault(import('../pages/app/courses/_course.vue' /* webpackChunkName: "pages/app/courses/_course" */))
const _1e855970 = () => interopDefault(import('../pages/app/courses/_course/index.vue' /* webpackChunkName: "pages/app/courses/_course/index" */))
const _d7954fd0 = () => interopDefault(import('../pages/app/courses/_course/todo.vue' /* webpackChunkName: "pages/app/courses/_course/todo" */))
const _6052abe8 = () => interopDefault(import('../pages/app/courses/_course/updates.vue' /* webpackChunkName: "pages/app/courses/_course/updates" */))
const _07ff0622 = () => interopDefault(import('../pages/app/grades.vue' /* webpackChunkName: "pages/app/grades" */))
const _795fcf1c = () => interopDefault(import('../pages/app/messages.vue' /* webpackChunkName: "pages/app/messages" */))
const _3f310175 = () => interopDefault(import('../pages/app/messages/index.vue' /* webpackChunkName: "pages/app/messages/index" */))
const _3315fdae = () => interopDefault(import('../pages/app/messages/inbox.vue' /* webpackChunkName: "pages/app/messages/inbox" */))
const _acccec76 = () => interopDefault(import('../pages/app/messages/sent.vue' /* webpackChunkName: "pages/app/messages/sent" */))
const _2c0c691a = () => interopDefault(import('../pages/app/profile.vue' /* webpackChunkName: "pages/app/profile" */))
const _54320c3d = () => interopDefault(import('../pages/app/schedule.vue' /* webpackChunkName: "pages/app/schedule" */))
const _2ec68fc9 = () => interopDefault(import('../pages/app/settings.vue' /* webpackChunkName: "pages/app/settings" */))
const _8380abd8 = () => interopDefault(import('../pages/app/updates.vue' /* webpackChunkName: "pages/app/updates" */))
const _30eb51dc = () => interopDefault(import('../pages/inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _bfa93352 = () => interopDefault(import('../pages/stats.vue' /* webpackChunkName: "pages/stats" */))
const _28cf0dec = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _b2e69a4e,
    children: [{
      path: "",
      component: _e4981ac8,
      name: "app"
    }, {
      path: "courses",
      component: _490a73fc,
      children: [{
        path: "",
        component: _67674305,
        name: "app-courses"
      }, {
        path: ":course",
        component: _224e6ea6,
        children: [{
          path: "",
          component: _1e855970,
          name: "app-courses-course"
        }, {
          path: "todo",
          component: _d7954fd0,
          name: "app-courses-course-todo"
        }, {
          path: "updates",
          component: _6052abe8,
          name: "app-courses-course-updates"
        }]
      }]
    }, {
      path: "grades",
      component: _07ff0622,
      name: "app-grades"
    }, {
      path: "messages",
      component: _795fcf1c,
      children: [{
        path: "",
        component: _3f310175,
        name: "app-messages"
      }, {
        path: "inbox",
        component: _3315fdae,
        name: "app-messages-inbox"
      }, {
        path: "sent",
        component: _acccec76,
        name: "app-messages-sent"
      }]
    }, {
      path: "profile",
      component: _2c0c691a,
      name: "app-profile"
    }, {
      path: "schedule",
      component: _54320c3d,
      name: "app-schedule"
    }, {
      path: "settings",
      component: _2ec68fc9,
      name: "app-settings"
    }, {
      path: "updates",
      component: _8380abd8,
      name: "app-updates"
    }]
  }, {
    path: "/inspire",
    component: _30eb51dc,
    name: "inspire"
  }, {
    path: "/stats",
    component: _bfa93352,
    name: "stats"
  }, {
    path: "/",
    component: _28cf0dec,
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
