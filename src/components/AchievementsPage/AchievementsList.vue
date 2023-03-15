<template>
  <q-card
    v-for="achievement in achievements"
    :key="achievement.id"
    class="g-shadow g-shadow-hover g-rounded cursor-pointer"
  >
    <q-card-section class="text-subtitle1">
      <AchievementCardDataComponent
        :achievement="achievement"
      />
    </q-card-section>

    <AchievementCardActionsComponent
      :achievement="achievement"
    />
  </q-card>
</template>

<script lang="ts" setup>
import { Achievement } from 'src/api/generated'
import { PropType } from 'vue'
import AchievementCardActionsComponent from './AchievementCardActionsComponent.vue'
import AchievementCardDataComponent from './AchievementCardDataComponent.vue'

defineProps({
  achievements: {
    type: Array as PropType<Array<Achievement>>,
    required: true,
  },
})

</script>
