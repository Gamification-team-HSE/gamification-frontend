<template>
  <q-card class="g-rounded g-shadow">
    <q-card-section class="text-primary row items-center text-h5  q-pb-none">
      <q-icon
        name="sym_o_group"
        size="lg"
        class=" q-mr-md"
      />
      {{ $t('users') }} - 150
    </q-card-section>
    <q-card-section class=" text-subtitle1">
      {{ $t('adminUsersText', {
        count: '150',
        deleted: '25'
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
        :label="$t('adminAddUserViaForm')"
        @click="openCreateUser = true"
      />
      <q-btn
        no-caps
        color="primary"
        class="g-rounded"
        icon="sym_o_table"
        outline
        :label="$t('adminAddUserViaExcel')"
        @click="showNotImplemented"
      />
      <q-btn
        no-caps
        color="primary"
        class="g-rounded"
        icon="sym_o_turn_right"
        flat
        :label="$t('adminGoToUsers')"
        :to="{ name: 'admin.users' }"
      />
    </q-card-actions>
  </q-card>

  <AddUserModal
    v-if="openCreateUser"
    :open-create-user="openCreateUser"
    @close="openCreateUser = false"
    @open-excel="openCreateUser = false"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AddUserModal from '../modals/AddUserModal.vue'
import { useUtils } from './utils'

const { showNotImplemented } = useUtils()

const openCreateUser = ref(false)
</script>
