import { boot } from 'quasar/wrappers'
import { LocalStorageService } from 'src/services/LocalStorageService'
import { useUserStore } from 'src/stores/user-store'

export default boot(({ redirect, urlPath }) => {
  const userStore = useUserStore()

  const refreshToken = LocalStorageService.get(
    'refresh_token',
  )

  const accessToken = LocalStorageService.get(
    'access_token',
  )

  if (refreshToken) {
    userStore.setAuth(refreshToken, accessToken)
  } else {
    if (urlPath.includes('login')) return

    redirect({ name: 'login' })
  }
})
