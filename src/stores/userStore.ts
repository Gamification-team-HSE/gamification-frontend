import { defineStore } from 'pinia'
import { Role } from 'src/api/generated'
import { client, graphqlSDK } from 'src/boot/grapqhl'
import { LocalStorageService } from 'src/services/LocalStorageService'
import { useEventsStore } from './eventsStore'
import { useStatsStore } from './statsStore'
import { useUsersStore } from './usersStore'

type State = {
  isLoggedIn: boolean
  authToken: string | null
  email: string | null
  username: string | null
  avatarUrl: string | null
  id: number | null
  role: Role
}

const defaultState: State = {
  role: Role.User,
  isLoggedIn: false,
  authToken: null,
  email: null,
  username: null,
  avatarUrl: null,
  id: null,
}

export const useUserStore = defineStore('user', {
  state: (): State => ({
    ...defaultState,
  }),
  getters: {
    isAdmin: (state) => state.role !== Role.User,
    canCreateAdmin: (state) => state.role === Role.SuperAdmin,
  },
  actions: {
    async setAuth(authToken: State['authToken'], email: State['email'] = null) {
      this.isLoggedIn = true
      this.email = email
      this.authToken = authToken

      if (!authToken) return

      client.setHeader('authorization', `Bearer ${authToken}`)
      LocalStorageService.set('authToken', authToken)

      await this.loadUser()

      const usersStore = useUsersStore()
      const statsStore = useStatsStore()
      const eventsStore = useEventsStore()

      usersStore.tryLoadActiveUsers()
      statsStore.load()
      eventsStore.load()
    },
    async loadUser() {
      const { GetCurrentUser: user } = await graphqlSDK.GetCurrentUser()

      this.email = user.email
      this.avatarUrl = user.avatar ?? null
      this.username = user.name ?? null
      this.role = user.role
      this.id = user.id
    },
    pushToProfile() {
      this.router.push({
        name: this.role === Role.User ? 'main' : 'admin.main',
      })
    },
    signOut() {
      this.$state = {
        ...defaultState,
      }

      LocalStorageService.remove('isAdmin')

      client.setHeader('authorization', '')
      LocalStorageService.remove('authToken')

      this.router.push({ name: 'login' })
    },
  },
})
