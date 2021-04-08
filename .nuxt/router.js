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
const _6387d567 = () => interopDefault(import('../pages/app/profile.vue' /* webpackChunkName: "pages/app/profile" */))
const _5f3443f8 = () => interopDefault(import('../pages/app/todo.vue' /* webpackChunkName: "pages/app/todo" */))
const _42f37b06 = () => interopDefault(import('../pages/inspire.vue' /* webpackChunkName: "pages/inspire" */))
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
        name: "app-courses-course"
      }]
    }, {
      path: "profile",
      component: _6387d567,
      name: "app-profile"
    }, {
      path: "todo",
      component: _5f3443f8,
      name: "app-todo"
    }]
  }, {
    path: "/inspire",
    component: _42f37b06,
    name: "inspire"
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
