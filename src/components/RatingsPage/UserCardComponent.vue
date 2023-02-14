<template>
  <q-card
    class="row items-center justify-between no-wrap q-pa-md"
    :class="{'column': $q.platform.is.mobile}"
  >
    <div
      class="col-6 items-start self-start row no-wrap q-gutter-x-md"
      :class="{'col-12': $q.platform.is.mobile}"
    >
      <q-avatar
        size="5em"
      >
        <img :src="user.avatar ?? `https://cdn.quasar.dev/img/boy-avatar.png`">
      </q-avatar>
      <div
        class="column text-no-wrap ellipsis justify-start justify-center"
      >
        <div class="text-h6">
          {{ user.email }}
        </div>
        <div class="text-subtitle1">
          {{ user.fullName }}
        </div>
      </div>
    </div>
    <div
      class="col-6 row  justify-around content-end no-wrap items-center q-ma-none"
      :class="{'column q-mt-md': $q.platform.is.mobile}"
    >
      <div
        class="row text-subtitle1 q-col-gutter-xs"
      >
        <div v-if="$q.platform.is.mobile">
          {{ isAchievement ? 'Достижения:' : 'Показатель:' }}
        </div>
        <div
          v-if="isAchievement"
          class="q-ma-none"
        >
          {{ user.achievements }} / {{ user.achievementsTotal }}
        </div>
        <div
          v-else
          class="q-ma-none text-subtitle1"
        >
          {{ user.statAmount }}
        </div>
      </div>
      <div class="row text-subtitle1 q-col-gutter-xs">
        <div v-if="$q.platform.is.mobile">
          Рейтинг:
        </div>
        <div class="q-ma-none text-weight-bold">
          {{ user.ratingPlace }} / {{ user.ratingTotalPlaces }}
        </div>
      </div>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

type RatingUser = {
  fullName: string,
  email: string,
  avatar: string,
  id: number,
  achievements: number,
  achievementsTotal: number,
  ratingPlace: number,
  ratingTotalPlaces: number,
  statAmount: number
}

defineProps({
  user: {
    type: Object as PropType<RatingUser>,
    required: true,
  },
  isAchievement: {
    type: Boolean,
    required: true,
  },
})

</script>
