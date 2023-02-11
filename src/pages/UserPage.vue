<template>
  <q-page class="row items-center justify-evenly">
    <div
      v-if="!isLoading"
      class="col-lg-6 col-xl-5 col-md-8 col-sm-8 col-11 q-gutter-y-lg q-mt-none"
    >
      <q-card class="g-rounded g-shadow col-grow">
        <div class="g-rounded g-shadow q-pa-md q-ma-none row items-center q-gutter-x-md bg-white q-mt-lg">
          <q-avatar
            size="10em"
          >
            <img
              :src="user.avatar ?? 'https://cdn.quasar.dev/img/boy-avatar.png'"
            >
          </q-avatar>
          <div class="column">
            <q-card-section class="text-h2">
              {{ user.name }}
            </q-card-section>
            <q-card-section class="text-h5">
              <q-icon
                name="alternate_email"
                color="primary"
                size="lg"
                class="q-mr-sm"
              />{{ user.email }}
            </q-card-section>
          </div>
        </div>
        <div class="row full-width">
          <UserActionsComponent
            :user="user"
            :mode="mode"
          />
        </div>
      </q-card>
      <div class="row justify-between q-mt-none q-gutter-lg no-wrap-md">
        <q-card
          class="g-rounded g-shadow col-grow"
        >
          <q-card-section class="row justify-between no-wrap">
            <div class="column q-gutter-y-md">
              <div class="text-h5">
                {{ $t('achievements') }}
              </div>
              <div class="text-subtitle1">
                {{ $t('userStatistics', {count: state.achievements, total: state.achievementsTotal}) }}
              </div>
            </div>
            <div class="column">
              <q-circular-progress
                :min="0"
                :max="state.achievementsTotal"
                :value="state.achievements"
                size="100px"
                :thickness="0.22"
                color="green-5"
                track-color="green-1"
                class="q-ma-md"
                show-value
              >
                <span class="text-h4 text-green-5"> {{
                  state.achievements
                }}</span>
              </q-circular-progress>
            </div>
          </q-card-section>
        </q-card>
        <q-card
          class="g-rounded g-shadow col-grow"
        >
          <q-card-section class="row full-height no-wrap justify-between">
            <div class="column q-gutter-y-md">
              <div class=" text-h5 ">
                {{ $t('rating') }}
              </div>

              <div class="text-subtitle1">
                {{ $t('userStatistics', {count: state.ratingPlace, total: state.ratingTotalPlaces}) }}
              </div>
              <div>
                <q-btn
                  color="primary"
                  flat
                  no-caps
                  class="text-subtitle1 text-no-wrap g-rounded"
                  :label="$t('whatIsThis')"
                  @click="showRatingTooltip = true"
                >
                  <q-tooltip
                    v-model="showRatingTooltip"
                    class="text-subtitle1 bg-blue-2 text-dark"
                    max-width="350px"
                  >
                    {{ $t('aboutRating') }}
                  </q-tooltip>
                </q-btn>
              </div>
            </div>
            <div class="column q-mx-md text-h2 text-weight-medium text-primary justify-center items-center">
              <div class="row no-wrap items-center">
                <q-icon
                  name="sym_o_trending_up"
                  size="50px"
                  color="primary"
                />
                <span>{{ state.ratingPlace }}
                </span>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <q-card
        class="column g-rounded g-shadow q-px-lg q-pb-lg q-gutter-y-md"
      >
        <div class="row q-gutter-x-lg">
          <q-btn
            flat
            :color="showFeed ? 'primary' : ''"
            no-caps
            class="text-h5 g-rounded"
            dense
            padding="sm xl"
            :label="$t('feed')"
            @click="showFeed = true"
          />
          <q-btn
            flat
            :color="!showFeed ? 'primary' : ''"
            no-caps
            class="text-h5 g-rounded"
            dense
            padding="sm xl"
            :label="$t('achievements')"
            @click="showFeed = false"
          />
        </div>

        <q-separator />

        <!-- TODO показатели -->

        <div class="column">
          <q-list class=" q-gutter-y-sm">
            <q-item
              v-for="_, index in [0, 1, 2, 3]"
              :key="index"
              clickable
              class="g-rounded"
            >
              <q-item-section
                top
                avatar
              >
                <q-avatar
                  size="66px"
                  rounded
                >
                  <img src="https://cdn-icons-png.flaticon.com/512/5968/5968923.png">
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label class=" text-h6">
                  What a good sprint
                </q-item-label>
                <q-item-label
                  lines="2"
                  class=" text-subtitle1"
                >
                  Done 10 tasks in one sprint
                </q-item-label>
              </q-item-section>
              <q-item-section
                side
                top
              >
                {{ $t('minsAgo', {count: 5}) }}
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-card>
    </div>
    <div
      v-else
      class="row justify-center q-mt-xl"
    >
      <q-spinner
        color="primary"
        size="7em"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { graphqlSDK } from 'src/boot/grapqhl'
import { logError } from 'src/utils/utils'
import { Mode } from 'src/components/UsersPage/types'
import { type User, Role } from 'src/api/generated'
import UserActionsComponent from 'src/components/UserPage/UserActionsComponent.vue'

const isLoading = ref(true)
const showRatingTooltip = ref(false)
const showFeed = ref(true)

const router = useRoute()
const { id } = router.params

const user: User = reactive<User>({
  name: '',
  created_at: Date.now(),
  email: '',
  id: 0,
  role: Role.User,
})

const state = {
  achievements: 5,
  achievementsTotal: 20,
  events: 7,
  ratingPlace: 18,
  ratingTotalPlaces: 25,
}

const mode = ref<Mode>('active')

onMounted(() => {
  if (!id) {
    logError('No user id')
    return
  }
  graphqlSDK.GetUser({ id: Number(id) }).then((res) => {
    user.name = res.GetUser.name ?? ''
    user.email = res.GetUser.email
    user.created_at = res.GetUser.created_at
    user.avatar = res.GetUser.avatar ?? 'https://cdn.quasar.dev/img/boy-avatar.png'
    user.id = Number(id)
    isLoading.value = false
  }).catch((error) => {
    logError(error)
  })
})
</script>
