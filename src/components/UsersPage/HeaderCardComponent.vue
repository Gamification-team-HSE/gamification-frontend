<template>
  <q-card class=" g-shadow g-rounded">
    <q-card-section class=" text-h4">
      {{ $t('usersList') }}
    </q-card-section>
    <q-card-section :class="{'q-pb-none': userStore.isAdmin}">
      <q-input
        :model-value="props.filter"
        outlined
        class="full-width text-h6"
        :placeholder="$t('searchByEmail')"
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
    <q-card-section
      v-if="userStore.isAdmin"
      class="q-gutter-x-md"
    >
      <q-btn
        no-caps
        class="g-rounded"
        unelevated
        :color="mode === 'active' ? 'primary' : undefined"
        :disable="isLoading"
        @click="emit('switchMode', 'active')"
      >
        {{ $t('activeUsers', {count: usersStore.totalCounters.active}) }}
      </q-btn>
      <q-btn
        v-if="userStore.isAdmin"
        no-caps
        class="g-rounded"
        unelevated
        :color="mode === 'deleted' ? 'primary' : undefined"
        :disable="isLoading"
        @click="emit('switchMode', 'deleted')"
      >
        {{ $t('deletedUsers', {count: usersStore.totalCounters.banned}) }}
      </q-btn>
      <q-btn
        v-if="userStore.canCreateAdmin"
        no-caps
        class="g-rounded"
        unelevated
        :color="mode === 'admins' ? 'primary' : undefined"
        :disable="isLoading"
        @click="emit('switchMode', 'admins')"
      >
        {{ $t('adminsUsers', {count: usersStore.totalCounters.admins}) }}
      </q-btn>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useUsersStore } from 'src/stores/usersStore'
import { useUserStore } from 'src/stores/userStore'
import type { PropType } from 'vue'
import type { Mode } from './types'

const props = defineProps({
  isLoading: Boolean,
  filter: {
    type: String,
    required: true,
  },
  mode: {
    type: String as PropType<Mode>,
    required: true,
  },
})

const emit = defineEmits<{(e: 'switchMode', mode: Mode): void,
(e: 'changeFilter', filter: string): void
}>()

const userStore = useUserStore()
const usersStore = useUsersStore()
</script>
