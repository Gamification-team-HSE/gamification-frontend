import { useQuasar } from 'quasar'
import { LocalStorageService } from 'src/services/LocalStorageService'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

export const useLayoutSettings = () => {
  const $q = useQuasar()
  const i18n = useI18n()

  const theme = computed(() => $q.dark.mode)

  const lang = computed(() => (i18n.locale.value === 'ru-RU' ? 'RU' : 'EN'))
  const reverseLang = computed(() => (lang.value === 'EN' ? 'RU' : 'EN'))

  const toggleLang = () => {
    if (lang.value === 'EN') {
      i18n.locale.value = 'ru-RU'
      LocalStorageService.set('lang', 'ru-RU')
    } else {
      i18n.locale.value = 'en-US'
      LocalStorageService.set('lang', 'en-US')
    }
  }

  const toggleTheme = () => {
    $q.dark.toggle()
    LocalStorageService.set('isDark', theme.value === true)
  }

  return {
    theme,
    toggleTheme,
    lang: reverseLang,
    toggleLang,
  }
}
