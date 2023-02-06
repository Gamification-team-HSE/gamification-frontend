<template>
  <q-card
    v-for="user in users"
    :key="user.id"
    class="g-shadow g-shadow-hover g-rounded cursor-pointer"
    @click="goToUserPage(user.id)"
  >
    <q-card-section class="text-subtitle1">
      <div class="row items-center justify-between">
        <UserCardDataComponent
          :user="user"
        />

        <UserCardActionsComponent
          :user="user"
          :mode="mode"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
import { type User } from 'src/api/generated'
import { PropType } from 'vue'
import { useRouter } from 'vue-router'

import { Mode } from './types'
import UserCardActionsComponent from './UserCardActionsComponent.vue'
import UserCardDataComponent from './UserCardDataComponent.vue'

const props = defineProps({
  users: {
    type: Array as PropType<Array<Partial<User>>>,
    required: true,
  },
  mode: {
    type: String as PropType<Mode>,
    required: true,
  },
})

const router = useRouter()

const goToUserPage = (userId?: User['id']): void => {
  if (!userId) throw new Error('User doesnt have an ID')
  if (props.mode === 'active') {
    router.push({
      name: 'user',
      params: {
        id: userId.toString(),
      },
    })
  }
}

</script>
