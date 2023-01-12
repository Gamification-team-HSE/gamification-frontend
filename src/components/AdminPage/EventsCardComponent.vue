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
        @click="openCreateEvent = true"
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

  <AddEventModal
    v-if="openCreateEvent"
    :open-create-event="openCreateEvent"
    @close="openCreateEvent = false"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUtils } from './utils'
import AddEventModal from '../modals/AddEventModal.vue'

const { showNotImplemented } = useUtils()

const openCreateEvent = ref(false)
</script>
