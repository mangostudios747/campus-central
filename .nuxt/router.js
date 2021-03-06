import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _1d241e66 = () => interopDefault(import('../pages/app.vue' /* webpackChunkName: "pages/app" */))
const _99382ce0 = () => interopDefault(import('../pages/app/index.vue' /* webpackChunkName: "pages/app/index" */))
const _5508cff6 = () => interopDefault(import('../pages/app/courses.vue' /* webpackChunkName: "pages/app/courses" */))
const _fc09f40e = () => interopDefault(import('../pages/app/courses/index.vue' /* webpackChunkName: "pages/app/courses/index" */))
const _98f0c2be = () => interopDefault(import('../pages/app/courses/_course.vue' /* webpackChunkName: "pages/app/courses/_course" */))
const _2370e864 = () => interopDefault(import('../pages/app/courses/_course/index.vue' /* webpackChunkName: "pages/app/courses/_course/index" */))
const _b63bcab8 = () => interopDefault(import('../pages/app/courses/_course/todo.vue' /* webpackChunkName: "pages/app/courses/_course/todo" */))
const _4ed36448 = () => interopDefault(import('../pages/app/courses/_course/updates.vue' /* webpackChunkName: "pages/app/courses/_course/updates" */))
const _cf6424a4 = () => interopDefault(import('../pages/app/grades.vue' /* webpackChunkName: "pages/app/grades" */))
const _7b834cfe = () => interopDefault(import('../pages/app/messages.vue' /* webpackChunkName: "pages/app/messages" */))
const _77159d01 = () => interopDefault(import('../pages/app/messages/index.vue' /* webpackChunkName: "pages/app/messages/index" */))
const _1e599cb5 = () => interopDefault(import('../pages/app/messages/inbox.vue' /* webpackChunkName: "pages/app/messages/inbox" */))
const _77a5668e = () => interopDefault(import('../pages/app/messages/sent.vue' /* webpackChunkName: "pages/app/messages/sent" */))
const _6387d567 = () => interopDefault(import('../pages/app/profile.vue' /* webpackChunkName: "pages/app/profile" */))
const _0c6540c9 = () => interopDefault(import('../pages/app/schedule.vue' /* webpackChunkName: "pages/app/schedule" */))
const _320c7756 = () => interopDefault(import('../pages/app/settings.vue' /* webpackChunkName: "pages/app/settings" */))
const _37cdb408 = () => interopDefault(import('../pages/app/updates.vue' /* webpackChunkName: "pages/app/updates" */))
const _9096116a = () => interopDefault(import('../pages/stats.vue' /* webpackChunkName: "pages/stats" */))
const _032209fe = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _1d241e66,
    children: [{
      path: "",
      component: _99382ce0,
      name: "app"
    }, {
      path: "courses",
      component: _5508cff6,
      children: [{
        path: "",
        component: _fc09f40e,
        name: "app-courses"
      }, {
        path: ":course",
        component: _98f0c2be,
        children: [{
          path: "",
          component: _2370e864,
          name: "app-courses-course"
        }, {
          path: "todo",
          component: _b63bcab8,
          name: "app-courses-course-todo"
        }, {
          path: "updates",
          component: _4ed36448,
          name: "app-courses-course-updates"
        }]
      }]
    }, {
      path: "grades",
      component: _cf6424a4,
      name: "app-grades"
    }, {
      path: "messages",
      component: _7b834cfe,
      children: [{
        path: "",
        component: _77159d01,
        name: "app-messages"
      }, {
        path: "inbox",
        component: _1e599cb5,
        name: "app-messages-inbox"
      }, {
        path: "sent",
        component: _77a5668e,
        name: "app-messages-sent"
      }]
    }, {
      path: "profile",
      component: _6387d567,
      name: "app-profile"
    }, {
      path: "schedule",
      component: _0c6540c9,
      name: "app-schedule"
    }, {
      path: "settings",
      component: _320c7756,
      name: "app-settings"
    }, {
      path: "updates",
      component: _37cdb408,
      name: "app-updates"
    }]
  }, {
    path: "/stats",
    component: _9096116a,
    name: "stats"
  }, {
    path: "/",
    component: _032209fe,
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
