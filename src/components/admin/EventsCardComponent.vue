<template>
  <q-card class="g-rounded g-shadow">
    <q-card-section class="text-primary row items-center text-h5  q-pb-none">
      <q-icon
        name="sym_o_celebration"
        size="lg"
        class=" q-mr-md"
      />
      {{ $t('events') }} - 15
    </q-card-section>
    <q-card-section class=" text-subtitle1">
      {{ $t('adminEventsText', {
        count: 25,
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
        :label="$t('adminAddEvent')"
        @click="showNotImplemented"
      />
      <q-btn
        no-caps
        color="primary"
        class="g-rounded"
        icon="sym_o_turn_right"
        flat
        :label="$t('adminGoToEvents')"
        :to="{ name: 'admin.events' }"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { useUtils } from './utils'

const { showNotImplemented } = useUtils()
</script>
