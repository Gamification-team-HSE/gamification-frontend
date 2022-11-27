import { defineStore } from 'pinia'
import { adminEmail, userEmail } from 'src/constants/mockAuth'
import { LocalStorageService } from 'src/services/LocalStorageService'

type State = {
  isAdmin: boolean
  isLoggedIn: boolean
  authToken: string | null
}

export const useUserStore = defineStore('user', {
  state: (): State => ({
    isAdmin: false,
    isLoggedIn: false,
    authToken: null,
  }),
  getters: {
    email: (state) => (state.isAdmin ? adminEmail : userEmail),
  },
  actions: {
    setAuth(authToken: State['authToken'], isAdmin = false) {
      this.isLoggedIn = true
      this.isAdmin = isAdmin

      this.authToken = authToken

      LocalStorageService.set('isAdmin', isAdmin)

      if (authToken) LocalStorageService.set('authToken', authToken)
    },
    signOut() {
      this.isLoggedIn = false
      this.authToken = null

      LocalStorageService.remove('isAdmin')
      LocalStorageService.remove('authToken')

      this.router.push({ name: 'login' })
    },
  },
})
