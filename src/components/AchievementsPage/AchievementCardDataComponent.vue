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
  <div class="column q-pl-lg q-mt-md">
    <div class="row text-h6 q-mb-sm items-center">
      <q-icon
        name="sym_o_hotel_class"
        class="q-mr-sm"
        size="md"
      />
      <div>Как получить?</div>
    </div>
    <div
      v-for="condition in achievement.conditions"
      :key="condition.id"
      class="row items-center text-subtitle1"
    >
      <template v-if="condition.type === 'or'">
        <span class="text-h5">ИЛИ</span>
      </template>
      <template v-else-if="condition.type === 'event'">
        <strong>{{ textByChar[condition.char ?? '!='] }}</strong>
        <span class="q-mx-sm">в</span>
        <strong class="text-primary">{{ condition.value }}</strong>
      </template>
      <template v-else>
        <strong class="text-primary">{{ condition.value }}</strong>
        <span class="q-mx-sm text-h5">{{ condition.char }}</span>
        <strong>{{ condition.number }}</strong>
      </template>
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

const textByChar = {
  '=': 'Участвовал',
  '!=': 'не участвовал',
}

</script>
