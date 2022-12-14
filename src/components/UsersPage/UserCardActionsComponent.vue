<template>
  <div class="row q-gutter-x-sm">
    <template v-if="userStore.isAdmin">
      <template v-if="mode !== 'deleted'">
        <q-btn
          v-if="mode ==='active'"
          flat
          icon="sym_o_edit"
          size="xl"
          outline
          dense
          color="primary"
          class="g-rounded"
          @click.stop="editUser(user.id)"
        >
          <q-tooltip
            :offset="[0,5]"
            :delay="250"
            transition-duration="0"
          >
            {{ $t('edit') }}
          </q-tooltip>
        </q-btn>
        <q-btn
          v-if="user.role !== Role.SuperAdmin"
          flat
          icon="sym_o_delete"
          size="xl"
          outline
          dense
          color="negative"
          class="g-rounded"
          @click.stop="deleteUser(mode, user.id)"
        >
          <q-tooltip
            :offset="[0,5]"
            :delay="250"
            transition-duration="0"
          >
            {{ mode === 'admins' ? $t('delete') : $t('block') }}
          </q-tooltip>
        </q-btn>
      </template>
      <q-btn
        v-else
        flat
        icon="sym_o_settings_backup_restore"
        size="xl"
        outline
        dense
        color="negative"
        class="g-rounded"
        @click.stop="recoverUser(mode, user.id)"
      >
        <q-tooltip
          :offset="[0,5]"
          :delay="250"
          transition-duration="0"
        >
          {{ $t('recover') }}
        </q-tooltip>
      </q-btn>
    </template>
  </div>
</template>

<script setup lang="ts">
import { type User, Role } from 'src/api/generated'
import { useUserStore } from 'src/stores/userStore'
import { PropType } from 'vue'
import { useUserActions } from './userActions'
import { Mode } from './types'

defineProps({
  user: {
    type: Object as PropType<Partial<User>>,
    required: true,
  },
  mode: {
    type: String as PropType<Mode>,
    required: true,
  },
})

const {
  editUser, recoverUser, deleteUser,
} = useUserActions()
const userStore = useUserStore()

</script>
