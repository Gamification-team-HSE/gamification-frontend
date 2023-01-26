<template>
  <div class="row items-center q-gutter-x-md">
    <q-avatar size="5em">
      <img src="https://cdn.quasar.dev/img/boy-avatar.png">
      <!-- тут потом будет картинка ивента -->
    </q-avatar>
    <div class="column">
      <div class="text-h6">
        {{ event.name }}
      </div>
      <div class="text-subtitle1 q-mt-sm">
        {{ event.description || $t('noDescription') }}
      </div>
      <div class="text-caption">
        {{ $t('eventDuration') }}: {{ event.dateRange.from == event.dateRange.to ? new Date(event.dateRange.from).toLocaleDateString('ru-RU') : new Date(event.dateRange.from).toLocaleDateString('ru-RU') + '-' + new Date(event.dateRange.to).toLocaleDateString('ru-RU') }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

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

</script>
