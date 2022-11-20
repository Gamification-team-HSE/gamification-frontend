import { boot } from 'quasar/wrappers'
import { LocalStorageService } from 'src/services/LocalStorageService'
import { useUserStore } from 'src/stores/user-store'

export default boot(({ redirect, urlPath }) => {
  const userStore = useUserStore()

  const refreshToken = LocalStorageService.get(
    'refresh_token',
  )

  if (refreshToken) {
    const accessToken = LocalStorageService.get(
      'access_token',
    )

    userStore.setAuth(refreshToken, accessToken, Boolean(LocalStorageService.get('isAdmin')))
    return
  }

  // Redirect to login but not in loop reloads
  if (urlPath.includes('login')) return
  redirect({ name: 'login' })
})
