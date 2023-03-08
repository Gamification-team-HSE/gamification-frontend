<template>
  <q-card-actions class="row no-wrap">
    <q-btn
      flat
      icon="sym_o_edit"
      size="md"
      outline
      color="primary"
      class="g-rounded full-width"
      no-caps
      @click="editAchievement(achievement.id)"
    >
      Редактировать
    </q-btn>
    <q-btn
      flat
      icon="sym_o_delete"
      size="md"
      outline
      color="negative"
      class="g-rounded full-width"
      no-caps
      @click="deleteAchievement(achievement.id)"
    >
      Удалить
    </q-btn>
  </q-card-actions>

  <EditAchievementModal
    v-if="openEditModal"
    :open-modal="openEditModal"
    :achievement-id="openIdForEditing"
    :achievement="achievement"
    @close="closeEditModal"
  />
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { useAchievementActions } from './achievementActions'
import EditAchievementModal from '../modals/EditAchievementModal.vue'
import { Achievement } from '../../stores/achievementsStore'

defineProps({
  achievement: {
    type: Object as PropType<Achievement>,
    required: true,
  },
})

const {
  editAchievement, deleteAchievement,
  openEditModal,
  openIdForEditing,
  closeEditModal,
} = useAchievementActions()

</script>
