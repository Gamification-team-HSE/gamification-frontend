import { useQuasar } from 'quasar'

export const useUtils = () => {
  const $q = useQuasar()

  const showNotImplemented = () => {
    $q.notify({
      icon: 'sym_o_bug_report',
      message: 'Please wait',
      caption: 'Feature in progress',
      timeout: 2000,
      position: 'top-right',
      color: 'primary',
    })
  }

  return {
    showNotImplemented,
  }
}
