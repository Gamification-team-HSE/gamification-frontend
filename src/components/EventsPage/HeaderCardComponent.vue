<template>
  <q-card class=" g-shadow g-rounded">
    <q-card-section class=" text-h4">
      {{ $t('events') }} ({{ eventsStore.events.length }})
    </q-card-section>
    <q-card-section>
      <q-input
        :model-value="props.filter"
        outlined
        class="full-width text-h6"
        :placeholder="$t('findByName')"
        autofocus
        clearable
        hide-bottom-space
        :disable="isLoading"
        :readonly="isLoading"
        @update:model-value="value => emit('changeFilter', value?.toString() ?? '')"
      >
        <template #prepend>
          <q-icon name="sym_o_search" />
        </template>
      </q-input>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useEventsStore } from 'src/stores/eventsStore'

const props = defineProps({
  isLoading: Boolean,
  filter: {
    type: String,
    required: true,
  },
})

const emit = defineEmits<{(e: 'changeFilter', filter: string): void}>()

const eventsStore = useEventsStore()
</script>
