<template>
  <div class="row items-center q-gutter-x-md">
    <q-avatar size="5em">
      <img src="https://cdn.quasar.dev/img/boy-avatar.png">
      <!-- тут потом будет картинка достижения -->
    </q-avatar>
    <div class="column">
      <div class="text-h6">
        {{ achievement.name }}
      </div>
      <div class="text-subtitle1 q-mt-sm">
        {{ achievement.description || $t('noDescription') }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { Achievement } from '../../stores/achievementsStore'

defineProps({
  achievement: {
    type: Object as PropType<Achievement>,
    required: true,
  },
})

</script>
