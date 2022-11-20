import { defineStore } from 'pinia'
import { adminEmail, userEmail } from 'src/constants/mockAuth'
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
    email: (state) => (state.isAdmin ? adminEmail : userEmail),
  },
  actions: {
    setAuth(refreshToken: string | null, accessToken: string | null, isAdmin = false) {
      this.isLoggedIn = true
      this.isAdmin = isAdmin

      this.refreshToken = refreshToken
      this.accessToken = accessToken

      LocalStorageService.set('isAdmin', isAdmin)

      if (!refreshToken) return
      LocalStorageService.set('refresh_token', refreshToken)

      if (!accessToken) return
      LocalStorageService.set('access_token', accessToken)
    },
    signOut() {
      this.isLoggedIn = false

      LocalStorageService.remove('access_token')
      LocalStorageService.remove('refresh_token')
      LocalStorageService.remove('isAdmin')

      this.router.push({ name: 'login' })
    },
  },
})
