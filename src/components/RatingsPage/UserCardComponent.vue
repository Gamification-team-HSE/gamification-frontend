<template>
  <div class="row items-center justify-between q-gutter-x-md no-wrap full-width q-pa-md">
    <div
      class="row no-wrap"
      style="width: 50%;"
    >
      <q-avatar size="5em">
        <img :src="user.avatar ?? `https://cdn.quasar.dev/img/boy-avatar.png`">
      </q-avatar>
      <div
        class="column justify-start q-ml-lg justify-center"
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
      class="row justify-around content-end no-wrap items-center q-ma-none"
      style="width: 50%;"
    >
      <div>
        <p
          v-if="isAchievement"
          class="q-ma-none text-subtitle1"
          style="text-align: center;"
        >
          {{ user.achievements }} / {{ user.achievementsTotal }}
        </p>
        <p
          v-else
          class="q-ma-none text-subtitle1"
          style="text-align: center;"
        >
          {{ user.statAmount }}
        </p>
      </div>
      <p class="q-ma-none text-subtitle1 text-weight-bold">
        {{ user.ratingPlace }} / {{ user.ratingTotalPlaces }}
      </p>
    </div>
  </div>
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
