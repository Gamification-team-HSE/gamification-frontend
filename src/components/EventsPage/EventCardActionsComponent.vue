<template>
  <div class="row q-gutter-x-sm">
    <q-btn
      flat
      icon="sym_o_edit"
      size="xl"
      outline
      color="primary"
      class="g-rounded"
      no-caps
      @click="editEvent(event.id)"
    >
      <q-tooltip
        :offset="[0,5]"
        :delay="250"
        transition-duration="0"
      >
        {{ $t('edit') }}
      </q-tooltip>
    </q-btn>
    <q-btn
      flat
      icon="sym_o_delete"
      size="xl"
      outline
      color="negative"
      class="g-rounded"
      no-caps
      @click="deleteEvent(event.id)"
    >
      <q-tooltip
        :offset="[0,5]"
        :delay="250"
        transition-duration="0"
      >
        {{ $t('delete') }}
      </q-tooltip>
    </q-btn>
    <EditEventModal
      v-if="openEditModal"
      :open-modal="openEditModal"
      :event-id="openIdForEditing"
      :event="event"
      @close="closeEditModal"
      @change-event="changeEvent"
    />
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { useEventActions } from './eventActions'
import EditEventModal from '../modals/EditEventModal.vue'

type Event = {
  name: string,
  description: string,
  imgUrl: string,
  dateRange: { from: number, to: number },
  created_at: number,
  id: number,
}

defineProps({
  event: {
    type: Object as PropType<Event>,
    required: true,
  },
})

const emit = defineEmits<{(e: 'changeEvent', value: Event): void}>()

const {
  editEvent, deleteEvent,
  openEditModal,
  openIdForEditing,
  closeEditModal,
} = useEventActions()

const changeEvent = (newEvent: Event) => {
  emit('changeEvent', newEvent)
}

</script>
