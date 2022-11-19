import { boot } from 'quasar/wrappers'
import { LocalStorageService } from 'src/services/LocalStorageService'
import { Dark } from 'quasar'

export default boot(() => {
  const isDark = Boolean(LocalStorageService.get('isDark'))

  Dark.set(isDark)
})
