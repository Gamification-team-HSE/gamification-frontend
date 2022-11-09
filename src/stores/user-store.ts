import { defineStore } from 'pinia'
import { LocalStorageService } from 'src/services/LocalStorageService'

type State = {
  isAdmin: boolean
  isLoggedIn: boolean
  refreshToken: string | null
  accessToken: string | null
}

export const useUserStore = defineStore('user', {
  state: (): State => ({
    isAdmin: false,
    isLoggedIn: false,
    refreshToken: null,
    accessToken: null,
  }),
  getters: {
  },
  actions: {
    setAuth(refreshToken: string | null, accessToken: string | null, isAdmin = false) {
      this.isLoggedIn = true
      this.isAdmin = isAdmin

      this.refreshToken = refreshToken
      this.accessToken = accessToken

      if (!refreshToken) return
      LocalStorageService.set('refresh_token', refreshToken)

      if (!accessToken) return
      LocalStorageService.set('access_token', accessToken)
    },
    signOut() {
      this.isLoggedIn = false

      LocalStorageService.remove('access_token')
      LocalStorageService.remove('refresh_token')

      this.router.push({ name: 'login' })
    },
  },
})