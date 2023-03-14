<template>
  <q-card class="g-rounded g-shadow">
    <q-card-section class="text-primary row items-center text-h5  q-pb-none">
      <q-icon
        name="sym_o_hotel_class"
        size="lg"
        class=" q-mr-md"
      />
      {{ $t('achievements') }} - {{ achievementsStore.achievements.length }}
    </q-card-section>
    <q-card-section class=" text-subtitle1">
      {{ $t('adminAchievText', {
        count: achievementsStore.achievements.length,
      })
      }}
    </q-card-section>
    <q-card-actions
      class="row q-gutter-y-sm"
      :vertical="$q.platform.is.mobile"
    >
      <q-btn
        no-caps
        color="primary"
        class="g-rounded"
        icon="sym_o_add"
        :label="$t('adminAddAchiev')"
        @click="isAddModalOpen = true"
      />
      <q-btn
        no-caps
        color="primary"
        class="g-rounded"
        icon="sym_o_turn_right"
        flat
        :label="$t('adminGoToAchieves')"
        :to="{ name: 'admin.achievements' }"
      />
    </q-card-actions>
  </q-card>
  <AddAchievementModal
    v-if="isAddModalOpen"
    :is-open="isAddModalOpen"
    @close="isAddModalOpen = false"
  />
</template>

<script setup lang="ts">
import { useAchievementsStore } from 'src/stores/achievementsStore'
import { ref } from 'vue'
import AddAchievementModal from '../modals/AddAchievementModal.vue'

const isAddModalOpen = ref(false)

const achievementsStore = useAchievementsStore()
</script>
