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
        component: () => import('pages/ProfilePageV2.vue'),
      },
      {
        path: 'users/',
        name: 'users',
        component: () => import('pages/UsersPage.vue'),
      },
      {
        path: 'users/:id',
        name: 'user',
        component: () => import('pages/UserPage.vue'),
      },
      {
        path: 'achievements/',
        name: 'achievements',
        component: () => import('pages/AchievementsPage.vue'),
      },
      {
        path: 'achievements/:id',
        name: 'achievement',
        component: () => import('pages/AchievementPage.vue'),
      },
      {
        path: 'ratings',
        name: 'ratings',
        component: () => import('pages/RatingsPage.vue'),
      },
    ],
    beforeEnter: (to, from, next) => {
      const userStore = useUserStore()
      if (!userStore.isLoggedIn) {
        next({ name: 'login' })
        return
      }

      if (userStore.isAdmin) {
        const nextName = to?.name ?? 'main'
        next({ name: `admin.${nextName.toString()}` })
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
    component: () => import('layouts/UserLayout.vue'),
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
        name: 'admin.main',
        component: () => import('pages/AdminPage.vue'),
      },
      {
        path: 'stats/', // Also CRUD modal for single stat
        name: 'admin.stats',
        component: () => import('pages/StatsPage.vue'),
      },
      {
        path: 'events/', // Also CRUD modal for single event
        name: 'admin.events',
        component: () => import('pages/EventsPage.vue'),
      },
      {
        path: 'users/',
        name: 'admin.users',
        component: () => import('pages/UsersPage.vue'),
      },
      {
        path: 'users/:id',
        name: 'admin.user',
        component: () => import('pages/UserPage.vue'),
      },
      {
        path: 'achievements/',
        name: 'admin.achievements',
        component: () => import('pages/AchievementsPage.vue'),
      },
      {
        path: 'achievements/:id',
        name: 'admin.achievement',
        component: () => import('pages/AchievementPage.vue'),
      },
      {
        path: 'ratings',
        name: 'admin.ratings',
        component: () => import('pages/RatingsPage.vue'),
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
