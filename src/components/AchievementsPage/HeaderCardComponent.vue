<template>
  <q-card class=" g-shadow g-rounded">
    <q-card-section class=" text-h4">
      {{ $t('achievements') }} ({{ achievementsStore.achievements.length }})
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
        @update:model-value="value => updateValueDebounced(value)"
      >
        <template #prepend>
          <q-icon name="sym_o_search" />
        </template>
      </q-input>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useAchievementsStore } from 'src/stores/achievementsStore'
import { debounce } from 'quasar'

const props = defineProps({
  isLoading: Boolean,
  filter: {
    type: String,
    required: true,
  },
})

const emit = defineEmits<{(e: 'changeFilter', filter: string): void }>()

const updateValueDebounced = debounce((value) => {
  emit('changeFilter', value?.toString() ?? '')
}, 200)

const achievementsStore = useAchievementsStore()

</script>
