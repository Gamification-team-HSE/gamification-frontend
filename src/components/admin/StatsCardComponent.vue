<template>
  <q-card class="g-rounded g-shadow">
    <q-card-section class="text-primary row items-center text-h5  q-pb-none">
      <q-icon
        name="sym_o_analytics"
        size="lg"
        class=" q-mr-md"
      />
      {{ $t('stats') }} - 25
    </q-card-section>
    <q-card-section class=" text-subtitle1">
      {{ $t('adminStatsText', {
        count: 25,
      })
      }}
    </q-card-section>
    <q-card-actions class="row  q-gutter-y-sm">
      <q-btn
        no-caps
        color="primary"
        class="g-rounded"
        icon="sym_o_add"
        :label="$t('adminAddStat')"
        @click="showNotImplemented"
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
</template>

<script setup lang="ts">
import { useUtils } from './utils'

const { showNotImplemented } = useUtils()
</script>
