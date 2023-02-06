<template>
  <q-card-actions class="row no-wrap full-width">
    <template v-if="userStore.isAdmin">
      <template v-if="mode !== 'deleted'">
        <q-btn
          v-if="mode ==='active'"
          flat
          icon="sym_o_edit"
          size="lg"
          outline
          color="primary"
          no-caps
          class="g-rounded full-width"
          @click.stop="editUser(user.id)"
        >
          {{ $t('edit') }}
        </q-btn>
        <q-btn
          v-if="user.role !== Role.SuperAdmin"
          flat
          icon="sym_o_delete"
          size="lg"
          outline
          color="negative"
          no-caps
          class="g-rounded full-width"
          @click.stop="deleteUser(mode, user.id)"
        >
          {{ mode === 'admins' ? $t('delete') : $t('block') }}
        </q-btn>
      </template>
    </template>
    <EditUserModal
      v-if="openEditModal"
      :open-modal="openEditModal"
      :user-id="openIdForEditing"
      @close="closeEditModal"
    />
  </q-card-actions>
</template>

<script setup lang="ts">
import { type User, Role } from 'src/api/generated'
import { useUserStore } from 'src/stores/userStore'
import { PropType } from 'vue'
import { useUserActions } from './userActions'
import { Mode } from './types'
import EditUserModal from '../modals/EditUserModal.vue'

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
  openEditModal,
  openIdForEditing,
  closeEditModal,
} = useUserActions()
const userStore = useUserStore()

</script>
