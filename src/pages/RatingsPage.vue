<template>
  <q-page
    class="row justify-evenly"
    padding
  >
    <div class="col-lg-6 col-xl-5 col-md-8 col-sm-8 col-11 q-gutter-y-lg q-mt-none">
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
              v-if="!isAchievementRating"
              v-model="statName"
              outlined
              use-input
              input-debounce="0"
              :options="options"
              style="min-width: 300px; width: 47%"
              behavior="menu"
              :label="$t('ratingSortStat')"
              @filter="filterFn"
              @update:model-value="getStatRating"
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
      <div class="full-width row justify-between q-pa-none">
        <div
          style="width: 50%; text-align: center;"
          class="q-ma-none"
        >
          {{ $t('users') }}
        </div>
        <div
          style="width: 50%;"
          class="row justify-around q-pr-lg"
        >
          <p
            v-if="isAchievementRating || statName === ''"
            class="q-ma-none"
          >
            {{ $t('achievements') }}
          </p>
          <p
            v-else
            class="q-ma-none"
          >
            {{ $t('stats') }}
          </p>
          <p class="q-ma-none">
            {{ $t('rating') }}
          </p>
        </div>
      </div>
      <q-card
        v-for="user in userslist"
        :key="user.id"
        class="g-shadow g-shadow-hover g-rounded"
      >
        <UserCardComponent
          :user="user"
          :is-achievement="isAchievementRating"
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
import { ref, computed, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUsersStore } from 'src/stores/usersStore'
import UserCardComponent from 'src/components/RatingsPage/UserCardComponent.vue'

const usersStore = useUsersStore()
const $t = useI18n().t

const model = ref($t('achievements'))
const statName = ref('')
const isAchievementRating = ref(true)
const selectModel = ref('')

type RatingUser = {
  fullName: string,
  email: string,
  avatar: string,
  id: number,
  achievements: number,
  achievementsTotal: number,
  ratingPlace: number,
  ratingTotalPlaces: number,
  statAmount: number,
}

const example: RatingUser = {
  fullName: 'Username',
  email: 'email@mail.ru',
  avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
  id: 0,
  achievements: 5,
  achievementsTotal: 20,
  ratingPlace: 18,
  ratingTotalPlaces: 25,
  statAmount: 0,
}

let achievementsNumber = 15
let placeNumber = 1

const usersForRating = computed(() => {
  const users = computed(() => usersStore.activeUsers)
  const userslist = [example]
  if (users.value.length > 0) {
    userslist.pop()
    users.value.forEach((user) => {
      const state: RatingUser = {
        fullName: user.name ?? '',
        email: user.email,
        avatar: user.avatar ?? 'https://cdn.quasar.dev/img/boy-avatar.png',
        id: user.id,
        achievements: achievementsNumber,
        achievementsTotal: 20,
        ratingPlace: placeNumber,
        ratingTotalPlaces: users.value.length,
        statAmount: Math.floor(Math.random() * 20),
      }
      userslist.push(state)
      achievementsNumber -= 1
      placeNumber += 1
    })
  }
  userslist.sort((a, b) => a.ratingPlace - b.ratingPlace)
  return userslist
})

const userslist = reactive(usersForRating)

const sortByAchievements = () => {
  userslist.value.sort((a, b) => b.achievements - a.achievements)
}

const sortByStats = () => {
  // здесь потом нужно будет по переданному показателю stat делать запрос чтобы узнать его значение для каждого пользователя
  userslist.value.sort((a, b) => b.statAmount - a.statAmount)
}

const changeType = () => {
  if (model.value === $t('achievements')) {
    isAchievementRating.value = true
    sortByAchievements()
  } else {
    selectModel.value = $t('ratingSortStat')
    isAchievementRating.value = false
  }
}

const sortby = ref([$t('achievements'), $t('stats')])
const statsList = ['количество сданных отчётов', 'количество входов в систему', 'дней с приема на работу', '...']
const options = ref(statsList)

const filterFn = (val: string, update: (callback: () => void) => void) => {
  if (val === '') {
    update(() => {
      options.value = statsList
    })
    return
  }

  update(() => {
    const needle = val.toLowerCase()
    options.value = statsList.filter((v) => v.toLowerCase().indexOf(needle) > -1)
  })
}

const getStatRating = (val: string) => {
  if (val !== '') {
    sortByStats()
  }
}
</script>
