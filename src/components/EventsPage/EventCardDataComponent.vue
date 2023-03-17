<template>
  <div class="row items-center q-gutter-x-md">
    <q-avatar size="7em">
      <img :src="event.image || `https://cdn-icons-png.flaticon.com/512/1458/1458512.png`">
    </q-avatar>
    <div class="column">
      <div class="text-h6">
        {{ event.name }}
      </div>
      <div
        v-if="userStore.isAdmin"
        class="text-subtitle2"
      >
        API key: <kbd class=" text-h6 text-primary">{{ event.id }}</kbd>
      </div>
      <div class="text-subtitle1 q-mt-sm">
        {{ event.description || $t('noDescription') }}
      </div>
      <div class="text-caption">
        {{ $t('eventDuration') }}: {{ duration }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Event } from 'src/api/generated'
import { useUserStore } from 'src/stores/userStore'
import { computed, PropType } from 'vue'

const props = defineProps({
  event: {
    type: Object as PropType<Event>,
    required: true,
  },
})

const userStore = useUserStore()

const duration = computed<string>(() => {
  const startAt = props.event.start_at
  const endAt = props.event.end_at

  if (!endAt) return new Date(startAt * 1000).toLocaleDateString('ru-RU')

  return `${new Date(startAt * 1000).toLocaleDateString('ru-RU')} - ${new Date(endAt * 1000).toLocaleDateString('ru-RU')}`
})

</script>
