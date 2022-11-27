import { boot } from 'quasar/wrappers'
import { LocalStorageService } from 'src/services/LocalStorageService'
import { useUserStore } from 'src/stores/userStore'

export default boot(({ redirect, urlPath }) => {
  const userStore = useUserStore()

  const authToken = LocalStorageService.get('authToken')

  if (!authToken) {
  // Redirect to login but not in loop reloads
    if (urlPath.includes('login')) return
    redirect({ name: 'login' })
    return
  }

  const isAdmin = Boolean(LocalStorageService.get('isAdmin'))

  userStore.setAuth(authToken, isAdmin)
})
