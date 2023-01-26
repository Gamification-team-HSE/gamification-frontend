<template>
  <q-card
    v-for="event in events"
    :key="event.id"
    class="g-shadow g-shadow-hover g-rounded cursor-pointer"
  >
    <q-card-section class="text-subtitle1">
      <EventCardDataComponent
        :event="event"
      />
    </q-card-section>

    <EventCardActionsComponent
      :event="event"
    />
  </q-card>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import EventCardActionsComponent from './EventCardActionsComponent.vue'
import EventCardDataComponent from './EventCardDataComponent.vue'
import { Event } from '../../stores/eventsStore'

defineProps({
  events: {
    type: Array as PropType<Array<Event>>,
    required: true,
  },
})

</script>
