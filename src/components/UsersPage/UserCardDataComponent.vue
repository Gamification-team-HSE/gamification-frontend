<template>
  <div class="row items-center q-gutter-x-md ">
    <q-avatar size="5em">
      <img :src="user.avatar ?? `https://cdn.quasar.dev/img/boy-avatar.png`">
    </q-avatar>
    <div class="column">
      <div class="text-h6">
        {{ user.email }}
        <q-badge
          v-if="user.role && user.role !== Role.User"
          :color="user.role === Role.Admin ? 'primary' : 'negative'"
          align="middle"
          class="g-rounded q-py-sm"
        >
          {{ LABELS_BY_ROLE[user.role] }}
        </q-badge>
      </div>
      <div class="text-subtitle1">
        {{ user.name }}
      </div>
      <div class="row q-gutter-x-sm">
        <div class="text-caption">
          {{ $t('added') }}: {{ new Date((user.created_at ?? 0) * 1000).toLocaleDateString('ru-RU') }}
        </div>
        <div
          v-if="user.deleted_at"
          class="text-caption text-negative"
        >
          {{ $t('blocked') }}: {{ new Date(user.deleted_at * 1000).toLocaleDateString('ru-RU') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Role, type User } from 'src/api/generated'
import { PropType } from 'vue'

defineProps({
  user: {
    type: Object as PropType<Partial<User>>,
    required: true,
  },
})

const LABELS_BY_ROLE = {
  [Role.Admin]: 'Admin',
  [Role.SuperAdmin]: 'Super admin',
}
</script>
