<template>
  <q-page
    class="row justify-evenly"
    padding
  >
    <div
      class="col-lg-6 col-xl-5 col-md-8 col-sm-8 col-11 q-gutter-y-lg q-mt-none"
    >
      <q-card class="g-shadow g-rounded">
        <q-card-section class=" text-h4">
          {{ $t('ratingTitle') }}
        </q-card-section>
        <div
          class="q-pa-md"
        >
          <div class="q-gutter-md row justify-between">
            <q-select
              v-model="model"
              outlined
              :options="sortby"
              :label="$t('sortBy')"
              style="min-width: 300px; width: 47%"
              @update:model-value="changeType"
            />
            <q-select
              v-model="model2"
              outlined
              use-input
              input-debounce="0"
              :options="options"
              style="min-width: 300px; width: 47%"
              behavior="menu"
              :label="selectModel"
              :disable="disable"
              @filter="filterFn"
            >
              <template #no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
        </div>
      </q-card>
      <div class="full-width row justify-between q-pa-md">
        <div
          style="width: 40%; text-align: center;"
          class="q-ma-none"
        >
          {{ $t('users') }}
        </div>
        <div
          style="width: 60%;"
          class="row justify-around"
        >
          <p class="q-ma-none">
            {{ $t('achievements') }}
          </p>
          <p class="q-ma-none">
            {{ $t('events') }}
          </p>
          <p class="q-ma-none">
            {{ $t('rating') }}
          </p>
        </div>
      </div>
      <q-card
        v-for="user in usersForRating"
        :key="user.fullName"
        class="g-shadow g-shadow-hover g-rounded"
      >
        <UserCardComponent
          :user="user"
        />
      </q-card>
    </div>
    <!-- <div
      v-else
      class="row justify-center q-mt-xl"
    >
      <q-spinner
        color="primary"
        size="7em"
      />
    </div> -->
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { User } from 'src/types'
import { useUsersStore } from 'src/stores/usersStore'
import UserCardComponent from 'src/components/RatingsPage/UserCardComponent.vue'

const usersStore = useUsersStore()
const $t = useI18n().t

const model = ref(null)
const model2 = ref(null)
const disable = ref(true)
const selectModel = ref('')
const changeType = () => {
  if (model.value === $t('achievements')) {
    selectModel.value = $t('ratingSortAchievement')
    disable.value = false
  } else {
    selectModel.value = $t('ratingSortStat')
    disable.value = false
  }
}

const sortby = ref([$t('achievements'), $t('stats')])
const stringOptions = ['achiev1', 'achievement 2', 'stat1', '...']
const options = ref(stringOptions)

const filterFn = (val: string, update) => {
  if (val === '') {
    update(() => {
      options.value = stringOptions
    })
    return
  }

  update(() => {
    const needle = val.toLowerCase()
    options.value = stringOptions.filter((v) => v.toLowerCase().indexOf(needle) > -1)
  })
}

const example: User = {
  fullName: 'Username',
  email: 'email@mail.ru',
  achievements: 5,
  achievementsTotal: 20,
  events: 7,
  ratingPlace: 18,
  ratingTotalPlaces: 25,
}

// const users = computed(() => usersStore.activeUsers)
const usersForRating = computed(() => {
  const users = computed(() => usersStore.activeUsers)
  const userslist = [example]
  if (users.value.length > 0) {
    userslist.pop()
    users.value.forEach((user) => {
      const state: User = {
        fullName: user.name ?? '',
        email: user.email,
        achievements: Math.floor(Math.random() * 20),
        achievementsTotal: 20,
        events: Math.floor(Math.random() * 10),
        ratingPlace: Math.floor(Math.random() * 25),
        ratingTotalPlaces: 25,
      }
      userslist.push(state)
    })
  }
  userslist.sort((a, b) => a.ratingPlace - b.ratingPlace)
  return userslist
})

</script>
