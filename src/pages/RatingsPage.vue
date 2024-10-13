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
        <div class="q-pa-md">
          <div
            class="q-gutter-md row justify-between"
            :class="{ 'column': $q.platform.is.mobile }"
          >
            <q-select
              v-model="model"
              outlined
              class="col"
              :options="sortby"
              :label="$t('sortBy')"
              @update:model-value="changeType"
            />
            <q-select
              v-if="!isAchievementRating"
              :model-value="statId"
              outlined
              use-input
              input-debounce="0"
              class="col"
              :options="statsStore.stats"
              behavior="menu"
              :label="$t('ratingSortStat')"
              option-value="id"
              :option-label="(obj) => obj.name ?? statsStore.stats.find(item => item.id === obj)?.name"
              @update:model-value="option => fetchStats(option.id)"
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
          <q-btn
            no-caps
            color="secondary"
            icon="sym_o_table"
            class="g-rounded row q-mt-md"
            @click="downloadRating"
          >
            Скачать таблицу
          </q-btn>
        </div>
      </q-card>
      <div
        v-if="!$q.platform.is.mobile"
        class="row text-subtitle1 text-bold justify-evenly q-pa-none"
      >
        <div class="col-7 q-pl-xl">
          {{ $t('users') }}
        </div>
        <div class="col-3">
          {{ isAchievementRating || statId === -1 ? $t('achievements') : $t('stats') }}
        </div>
        <div class="col-2">
          {{ $t('rating') }}
        </div>
      </div>
      <q-card
        v-for="user in users"
        :key="user.user_id"
        class="g-shadow g-shadow-hover g-rounded cursor-pointer"
        @click="$router.push({
          'name': 'user', params: {
            id: user.user_id.toString(),
          },
        })"
      >
        <UserCardComponent
          :user="user"
          :is-achievement="isAchievementRating"
          :total="total"
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
import {
  ref, onMounted,
} from 'vue'
import { useI18n } from 'vue-i18n'
import UserCardComponent from 'src/components/RatingsPage/UserCardComponent.vue'
import { graphqlSDK } from 'src/boot/grapqhl'
import { UserRatingByAch, UserRatingByStat } from 'src/api/generated'
import { useStatsStore } from 'src/stores/statsStore'
import * as XLSX from 'xlsx'

const { t } = useI18n()
const statsStore = useStatsStore()

const model = ref(t('achievements'))
const isAchievementRating = ref(true)
const selectModel = ref('')
const statId = ref(-1)

const users = ref<Array<UserRatingByAch | UserRatingByStat>>([])
const total = ref(0)

const fetchAchives = () => {
  graphqlSDK.GetRatingByAchs().then((res) => {
    users.value = res.GetRatingByAchs.users
    total.value = res.GetRatingByAchs.total
  })
}

const fetchStats = (id: number) => {
  statId.value = id
  graphqlSDK.GetRatingByStat({ id }).then((res) => {
    users.value = res.GetRatingByStat?.users ?? []
    total.value = res.GetRatingByStat?.total ?? 0
  })
}

const changeType = () => {
  if (model.value === t('achievements')) {
    isAchievementRating.value = true
    fetchAchives()
  } else {
    selectModel.value = t('ratingSortStat')
    isAchievementRating.value = false
  }
}

const sortby = [t('achievements'), t('stats')]

const downloadRating = () => {
  const workbook = XLSX.utils.book_new()
  const worksheet = XLSX.utils.json_to_sheet(users.value)
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
  XLSX.writeFile(workbook, 'data.xlsx')
}

onMounted(() => {
  fetchAchives()
})
</script>
