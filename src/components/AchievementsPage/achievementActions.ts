import { useQuasar } from 'quasar'
import { useAchievementsStore } from 'src/stores/achievementsStore'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

type Achievement = {
  name: string,
  description: string,
  imgUrl: string,
  created_at: number,
  id: number,
}

export const useAchievementActions = () => {
  const i18n = useI18n()
  const $q = useQuasar()
  const achievementsStore = useAchievementsStore()

  const openEditModal = ref(false)
  const openIdForEditing = ref<number | undefined>(undefined)

  const closeEditModal = (): void => {
    openEditModal.value = false
    openIdForEditing.value = undefined
  }

  const deleteAchievement = (achievementId: Achievement['id']): void => {
    if (!achievementId) throw new Error('Achievement doesnt have an ID')

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
      title: i18n.t('deleteAchievementTitle'),
      message: i18n.t('deleteAchievementConfirm'),
      class: 'g-rounded',
      position: $q.platform.is.mobile ? 'bottom' : 'standard',
    }).onOk(() => {
      achievementsStore.deleteAchievement(achievementId)
      $q.notify({
        icon: 'sym_o_delete',
        message: i18n.t('deleteAchievementSuccess'),
        timeout: 2000,
        position: 'top-right',
        color: 'primary',
      })
    })
  }

  const editAchievement = (achievementId: Achievement['id']): void => {
    if (!achievementId) throw new Error('Achievement doesnt have an ID')

    openEditModal.value = true
    openIdForEditing.value = achievementId
  }

  return {
    editAchievement, deleteAchievement, openEditModal, openIdForEditing, closeEditModal,
  }
}
