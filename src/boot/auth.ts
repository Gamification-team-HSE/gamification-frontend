import { boot } from 'quasar/wrappers'
import { LocalStorageService } from 'src/services/LocalStorageService'
import { useUserStore } from 'src/stores/userStore'

export default boot(async ({ redirect, urlPath }) => {
  const userStore = useUserStore()

  const authToken = LocalStorageService.get('authToken')

  if (!authToken) {
  // Redirect to login but not in loop reloads
    if (urlPath.includes('login')) return
    redirect({ name: 'login' })
    return
  }

  await userStore.setAuth(authToken)
})
