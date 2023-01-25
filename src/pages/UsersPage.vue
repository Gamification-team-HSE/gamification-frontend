<template>
  <q-page
    class="row justify-evenly"
    padding
  >
    <div class=" col-lg-6 col-xl-5 col-md-8 col-sm-8 col-11 q-gutter-y-lg">
      <HeaderCardComponent
        :is-loading="isLoading"
        :filter="filter"
        :mode="mode"
        @change-filter="changeFilter"
        @switch-mode="switchMode"
      />

      <template v-if="!isLoading">
        <SearchNotFoundComponent v-if="!filteredUsers.length" />

        <UsersList
          v-else
          :mode="mode"
          :users="filteredUsers"
        />
      </template>
      <div
        v-else
        class="row justify-center q-mt-xl"
      >
        <q-spinner
          color="primary"
          size="7em"
        />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { Role } from 'src/api/generated'
import HeaderCardComponent from 'src/components/UsersPage/HeaderCardComponent.vue'
import SearchNotFoundComponent from 'src/components/SearchNotFoundComponent.vue'
import { Mode } from 'src/components/UsersPage/types'
import UsersList from 'src/components/UsersPage/UsersList.vue'
import {
  computed, ref,
} from 'vue'
import { useUsersStore } from 'src/stores/usersStore'

const mode = ref<Mode>('active')
const isLoading = ref(true)
const filter = ref('')

const usersStore = useUsersStore()

usersStore.tryLoadActiveUsers().then(() => {
  isLoading.value = false
})

const filtersByMode = {
  active: {
    shouldBeDeleted: false,
    roles: [Role.User],
  },
  deleted: {
    shouldBeDeleted: true,
    roles: [Role.User],
  },
  admins: {
    shouldBeDeleted: false,
    roles: [Role.Admin, Role.SuperAdmin],
  },
}

const filteredUsers = computed(() => {
  const filterByMode = filtersByMode[mode.value]

  const getUsers = () => {
    if (mode.value === 'active') return usersStore.activeUsers
    if (mode.value === 'deleted') return usersStore.bannedUsers

    return usersStore.adminsUsers
  }

  const localUsers = getUsers().filter((user) => {
    const emailInFilter = user.email?.includes(filter.value)
    if (!emailInFilter) return false

    const userRole = user.role
    if (!userRole) return false

    const userCorrectDeletedByFilter = (filterByMode.shouldBeDeleted ? user.deleted_at : !user.deleted_at)
    if (!userCorrectDeletedByFilter) return false

    const userCorrectRoleByFilter = filterByMode.roles.includes(userRole)
    return userCorrectRoleByFilter
  })

  return localUsers
})

const switchMode = (newMode: Mode): void => {
  if (newMode === mode.value) return

  isLoading.value = false

  if (newMode === 'active') {
    usersStore.tryLoadActiveUsers().then(() => {
      isLoading.value = false
    })
  } else if (newMode === 'admins') {
    usersStore.tryLoadAdminsUsers().then(() => {
      isLoading.value = false
    })
  } else if (newMode === 'deleted') {
    usersStore.tryLoadBannedUsers().then(() => {
      isLoading.value = false
    })
  }

  mode.value = newMode
}

const changeFilter = (newValue: string): void => {
  filter.value = newValue
}
</script>
