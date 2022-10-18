import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/test1',
    name: 'test1',
    component: () => import(/* webpackChunkName: "about" */ '../views/test1.vue')
  },
  {
    path: '/test2',
    name: 'test2',
    component: () => import(/* webpackChunkName: "about" */ '../views/test2.vue')
  },
  {
    path: '/test3',
    name: 'test3',
    component: () => import(/* webpackChunkName: "about" */ '../views/test3.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
