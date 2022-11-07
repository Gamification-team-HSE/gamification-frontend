import { useUserStore } from 'src/stores/user-store'
import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/UserLayout.vue'),
    children: [
      {
        path: '',
        name: 'main',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: 'users/',
        name: 'users',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: 'users/:id',
        name: 'user',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: 'achievements/',
        name: 'achievements',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: 'achievements/:id',
        name: 'achievement',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: 'ratings',
        name: 'ratings',
        component: () => import('pages/IndexPage.vue'),
      },
    ],
    beforeEnter: (to, from, next) => {
      const userStore = useUserStore()
      if (!userStore.isLoggedIn) {
        next({ name: 'login' })
        return
      }

      next()
    },
  },
  {
    path: '/login/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('pages/LoginPage.vue'),
      },
    ],
    beforeEnter: () => {
      const userStore = useUserStore()
      if (userStore.isLoggedIn) return false

      return true
    },
  },
  {
    path: '/admin/',
    component: () => import('layouts/AdminLayout.vue'),
    beforeEnter: (to, from, next) => {
      const userStore = useUserStore()
      if (!userStore.isLoggedIn) {
        next({ name: 'login' })
        return
      }

      if (!userStore.isAdmin) {
        next({ name: 'main' })
        return
      }

      next()
    },
    children: [
      {
        path: '',
        name: 'admin',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: 'goals/',
        name: 'admin.goals',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: 'goals/:id',
        name: 'admin.goal',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: 'events/',
        name: 'admin.events',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: 'events/:id',
        name: 'admin.event',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: 'users/',
        name: 'admin.users',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: 'users/:id',
        name: 'admin.user',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: 'achievements/',
        name: 'admin.achievements',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: 'achievements/:id',
        name: 'admin.achievement',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: 'ratings',
        name: 'admin.ratings',
        component: () => import('pages/IndexPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
