<template>
  <q-card
    v-for="event in events"
    :key="event.id"
    class="g-shadow g-shadow-hover g-rounded"
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
import { Event } from 'src/api/generated'
import { PropType } from 'vue'
import EventCardActionsComponent from './EventCardActionsComponent.vue'
import EventCardDataComponent from './EventCardDataComponent.vue'

defineProps({
  events: {
    type: Array as PropType<Array<Event>>,
    required: true,
  },
})

</script>
