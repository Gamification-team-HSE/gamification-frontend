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
      @click="editEvent(event.id)"
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
      @click="deleteEvent(event.id)"
    >
      Удалить
    </q-btn>
  </q-card-actions>

  <EditEventModal
    v-if="openEditModal"
    :open-modal="openEditModal"
    :event-id="openIdForEditing"
    :event="event"
    @close="closeEditModal"
  />
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { Event } from 'src/api/generated'
import { useEventActions } from './eventActions'
import EditEventModal from '../modals/EditEventModal.vue'

defineProps({
  event: {
    type: Object as PropType<Event>,
    required: true,
  },
})

const {
  editEvent, deleteEvent,
  openEditModal,
  openIdForEditing,
  closeEditModal,
} = useEventActions()

</script>
