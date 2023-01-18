<template>
  <q-card
    v-for="event in events"
    :key="event.id"
    class="g-shadow g-shadow-hover g-rounded cursor-pointer"
  >
    <q-card-section class="text-subtitle1">
      <div class="row items-center justify-between">
        <EventCardDataComponent
          :event="event"
        />

        <EventCardActionsComponent
          :event="event"
          :event-list="eventList"
          @change-event="changeEvent"
          @delete-event-emit="deleteEventEmit"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import EventCardActionsComponent from './EventCardActionsComponent.vue'
import EventCardDataComponent from './EventCardDataComponent.vue'

type Event = {
  name: string,
  description: string,
  imgUrl: string,
  dateRange: { from: number, to: number },
  created_at: number,
  id: number,
}

defineProps({
  events: {
    type: Array as PropType<Array<Event>>,
    required: true,
  },
  eventList: {
    type: Array as PropType<Array<Event>>,
    required: true,
  },
})

const emit = defineEmits<{(e: 'changeEvent', value: Event): void, (e: 'deleteEventEmit', value: Event): void}>()

const changeEvent = (newEvent: Event) => {
  emit('changeEvent', newEvent)
}

const deleteEventEmit = (eventToDelete: Event) => {
  emit('deleteEventEmit', eventToDelete)
}
</script>
