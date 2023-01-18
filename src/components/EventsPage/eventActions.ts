import { useQuasar } from 'quasar'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

type Event = {
  name: string,
  description: string,
  imgUrl: string,
  dateRange: { from: number, to: number },
  created_at: number,
  id: number,
}

export const useEventActions = () => {
  const i18n = useI18n()
  const $q = useQuasar()

  const openEditModal = ref(false)
  const openIdForEditing = ref<number | undefined>(undefined)

  const closeEditModal = (): void => {
    openEditModal.value = false
    openIdForEditing.value = undefined
  }

  const deleteEvent = (id: Event['id']): void => {
    if (!id) throw new Error('Event doesnt have an ID')

    $q.dialog({
      ok: {
        color: 'negative',
        label: i18n.t('delete'),
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
      title: i18n.t('deleteEventTitle'),
      message: i18n.t('deleteEventConfirm'),
      class: 'g-rounded',
      position: $q.platform.is.mobile ? 'bottom' : 'standard',
    }).onOk(() => {
      $q.notify({
        icon: 'sym_o_delete',
        message: i18n.t('deleteEventSuccess'),
        timeout: 2000,
        position: 'top-right',
        color: 'primary',
      })
    })
  }

  const editEvent = (id: Event['id']): void => {
    if (!id) throw new Error('Event doesnt have an ID')

    openEditModal.value = true
    openIdForEditing.value = id
  }

  return {
    editEvent, deleteEvent, openEditModal, openIdForEditing, closeEditModal,
  }
}
