<template>
  <q-card class="g-rounded g-shadow">
    <q-card-section class="text-primary row items-center text-h5  q-pb-none">
      <q-icon
        name="sym_o_analytics"
        size="lg"
        class=" q-mr-md"
      />
      {{ $t('stats') }} - {{ statsStore.stats.length }}
    </q-card-section>
    <q-card-section class=" text-subtitle1">
      {{ $t('adminStatsText', {
        count: statsStore.stats.length,
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
        :label="$t('adminAddStat')"
        @click="isAddModalOpen = true"
      />
      <q-btn
        no-caps
        color="primary"
        class="g-rounded"
        icon="sym_o_turn_right"
        flat
        :label="$t('adminGoToStats')"
        :to="{ name: 'admin.stats' }"
      />
    </q-card-actions>
  </q-card>
  <AddStatModal
    v-if="isAddModalOpen"
    :is-open="isAddModalOpen"
    @close="isAddModalOpen = false"
  />
</template>

<script setup lang="ts">
import { useStatsStore } from 'src/stores/statsStore'
import { ref } from 'vue'
import AddStatModal from '../modals/AddStatModal.vue'

const isAddModalOpen = ref(false)

const statsStore = useStatsStore()
</script>
