import { useQuasar } from 'quasar'
import { User } from 'src/api/generated'
import { useI18n } from 'vue-i18n'
import { Mode } from './types'

export const useUserActions = () => {
  const i18n = useI18n()
  const $q = useQuasar()

  const deleteUser = (mode: Mode, userId?: User['id']): void => {
    if (!userId) throw new Error('User doesnt have an ID')
    if (mode === 'deleted') throw new Error('Wrong mode for deleting user')

    const DIALOG_LABELS_BY_MODE = {
      admins: { // delete admins
        message: i18n.t('deleteAdminConfirmMessage'),
        okLabel: i18n.t('deleteAdminConfirmOkLabel'),
        title: i18n.t('deleteAdminConfirmTitle'),
      },
      active: { // delete common user
        message: i18n.t('deleteUserConfirmMessage'),
        okLabel: i18n.t('deleteUserConfirmOkLabel'),
        title: i18n.t('deleteUserConfirmTitle'),
      },
    }

    const labels = DIALOG_LABELS_BY_MODE[mode]

    $q.dialog({
      ok: {
        color: 'negative',
        label: labels.okLabel,
        unelevated: true,
        'no-caps': true,
        class: 'g-rounded',
        padding: 'sm lg',
        flat: true,
      },
      cancel: {
        unelevated: true,
        'no-caps': true,
        class: 'g-rounded',
        label: i18n.t('cancel'),
        padding: 'sm lg',
        color: 'primary',
        flat: true,
      },
      title: labels.title,
      message: labels.message,
      class: 'g-rounded',
      position: $q.platform.is.mobile ? 'bottom' : 'standard',
    }).onOk(() => {
      // eslint-disable-next-line no-console
      console.warn('ASD CONFIRM DELETE', userId)
    })
  }

  const editUser = (userId?: User['id']): void => {
    if (!userId) throw new Error('User doesnt have an ID')

    // eslint-disable-next-line no-console
    console.warn('ASd edit', userId)

    $q.notify({
      icon: 'sym_o_bug_report',
      message: 'Please wait',
      caption: 'Feature in progress',
      timeout: 2000,
      position: 'top-right',
      color: 'primary',
    })
  }

  const recoverUser = (mode: Mode, userId?: User['id']): void => {
    if (!userId) throw new Error('User doesnt have an ID')
    if (mode !== 'deleted') throw new Error('Wrong mode for recovering user')

    $q.dialog({
      ok: {
        color: 'negative',
        label: i18n.t('unblock'),
        unelevated: true,
        'no-caps': true,
        class: 'g-rounded',
        padding: 'sm lg',
        flat: true,
      },
      cancel: {
        unelevated: true,
        'no-caps': true,
        class: 'g-rounded',
        label: i18n.t('cancel'),
        padding: 'sm lg',
        color: 'primary',
        flat: true,
      },
      title: i18n.t('recoverUserConfirmTitle'),
      message: i18n.t('recoverUserConfirmMessage'),
      class: 'g-rounded',
      position: $q.platform.is.mobile ? 'bottom' : 'standard',
    }).onOk(() => {
      // eslint-disable-next-line no-console
      console.warn('ASD CONFIRM RECOVERING', userId)
    })
  }

  return { editUser, recoverUser, deleteUser }
}
