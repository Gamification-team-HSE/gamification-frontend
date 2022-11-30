<template>
  <q-page
    class="row justify-evenly"
    padding
  >
    <div class=" col-lg-6 col-xl-5 col-md-8 col-sm-8 col-11 q-gutter-y-lg">
      <q-input
        v-model="filter"
        outlined
        class="full-width text-subtitle1"
        bottom-slots
        placeholder="Find by name"
        autofocus
        clearable
      />
      <q-card
        v-for="user, index in usersByName"
        :key="index"
      >
        <q-card-section>
          {{
            user.name
          }}
        </q-card-section>
        <q-card-section>
          {{
            user.email
          }}
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { User } from 'src/api/generated'
import { graphqlSDK } from 'src/boot/grapqhl'
import {
  computed, reactive, ref,
} from 'vue'

const users = reactive<Array<Partial<User>>>([])

const filter = ref('')

const usersByName = computed(() => users.filter((user) => user.name?.includes(filter.value)))

graphqlSDK.GetUsers().then((res) => {
  users.push(...res.GetUsers)
})

</script>
