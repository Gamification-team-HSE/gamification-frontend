<template>
  <div class="row items-center justify-between q-gutter-x-md no-wrap full-width q-pa-md">
    <div
      class="column"
      style="width: 40%;"
    >
      <div class="text-h6">
        {{ user.email }}
      </div>
      <div class="text-subtitle1">
        {{ user.fullName }}
      </div>
    </div>
    <div
      class="row justify-around no-wrap items-center q-ma-none"
      style="width: 60%;"
    >
      <div>
        <p
          class="q-ma-none text-subtitle1"
          style="text-align: center;"
        >
          {{ user.achievements }} / {{ user.achievementsTotal }}
        </p>
      </div>

      <p class="q-ma-none text-subtitle1">
        {{ user.events }}
      </p>
      <p class="q-ma-none text-subtitle1 text-weight-bold">
        {{ user.ratingPlace }} / {{ user.ratingTotalPlaces }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { User } from 'src/types'

defineProps({
  user: {
    type: Object as PropType<User>,
    required: true,
  },
})

</script>
