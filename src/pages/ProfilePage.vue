<template>
  <q-page
    padding
    class="row items-center justify-center"
  >
    <div class=" col-lg-6 col-xl-5 col-md-8 col-sm-8 col-11 q-gutter-y-lg">
      <div
        class="g-rounded g-shadow q-pa-md row items-center bg-header"
      >
        <q-avatar
          size="10em"
        >
          <img :src="userStore.avatarUrl ?? `https://cdn.quasar.dev/img/boy-avatar.png`">
        </q-avatar>
        <div class="column">
          <q-card-section class="text-h2 row no-wrap">
            {{ userStore.username }}
            <q-btn
              flat
              icon="sym_o_edit"
              size="lg"
              outline
              dense
              color="primary"
              no-caps
              class="g-rounded justify-end"
              @click.stop="userStore.id ? editUser(userStore.id) : () => {}"
            />
          </q-card-section>
          <q-card-section class="text-h5">
            <q-icon
              name="alternate_email"
              color="primary"
              size="lg"
              class="q-mr-sm"
            />{{ userStore.email }}
          </q-card-section>
        </div>
      </div>
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
                {{ $t('youHaveAchivs', {count: achievements.length, total: achievementsStore.total}) }}
              </div>
            </div>
            <div class="column">
              <q-circular-progress
                :min="0"
                :max="achievementsStore.total"
                :value="achievements.length"
                size="100px"
                :thickness="0.22"
                color="green-5"
                track-color="green-1"
                class="q-ma-md"
                show-value
              >
                <span class="text-h4 text-green-5"> {{
                  achievements.length
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
                {{ $t('youAreInRating', {count: place, total: usersStore.activeUsers.length}) }}
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
                    <div v-if="place === '~'">
                      {{ $t('aboutRating2') }}
                    </div>
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
                <span>{{ place }}
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
            :color="feedMode === 'ach' ? 'primary' : ''"
            no-caps
            class="text-h5 g-rounded"
            dense
            padding="sm xl"
            :label="$t('achievements')"
            @click="feedMode = 'ach'"
          />
          <q-btn
            flat
            :color="feedMode === 'events' ? 'primary' : ''"
            no-caps
            class="text-h5 g-rounded"
            dense
            padding="sm xl"
            :label="$t('events')"
            @click="feedMode = 'events'"
          />
          <q-btn
            flat
            :color="feedMode === 'stats' ? 'primary' : ''"
            no-caps
            class="text-h5 g-rounded"
            dense
            padding="sm xl"
            :label="$t('stats')"
            @click="feedMode = 'stats'"
          />
        </div>

        <q-separator />

        <div class="column">
          <q-list class=" q-gutter-y-sm">
            <template v-if="feedMode === 'ach'">
              <q-item
                v-for="ach, index in achievements"
                :key="index"
                clickable
                class="g-rounded cursor-inherit"
              >
                <q-item-section
                  top
                  avatar
                >
                  <q-avatar
                    size="66px"
                    rounded
                  >
                    <img :src="ach.image ?? 'https://cdn-icons-png.flaticon.com/512/5968/5968923.png'">
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label class=" text-h6">
                    {{ ach.name }}
                  </q-item-label>
                  <q-item-label
                    lines="2"
                    class=" text-subtitle1"
                  >
                    {{ ach.description }}
                  </q-item-label>
                </q-item-section>
                <q-item-section
                  side
                  top
                >
                  {{ new Date(ach.created_at * 1000).toLocaleDateString('ru-RU') }}
                </q-item-section>
              </q-item>

              <div
                v-if="!achievements.length"
                class="text-center text-h6"
              >
                {{ $t('nothingHere') }}
              </div>
            </template>
            <template v-else-if="feedMode === 'events'">
              <q-item
                v-for="event, index in events"
                :key="index"
                clickable
                class="g-rounded cursor-inherit"
              >
                <q-item-section
                  top
                  avatar
                >
                  <q-avatar
                    size="66px"
                    rounded
                  >
                    <img :src="event.image ?? 'https://cdn-icons-png.flaticon.com/512/5968/5968923.png'">
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label class=" text-h6">
                    {{ event.name }}
                  </q-item-label>
                  <q-item-label
                    lines="2"
                    class=" text-subtitle1"
                  >
                    {{ event.description }}
                  </q-item-label>
                </q-item-section>
                <q-item-section
                  side
                  top
                >
                  {{ new Date(event.created_at * 1000).toLocaleDateString('ru-RU') }}
                </q-item-section>
              </q-item>
              <div
                v-if="!events.length"
                class="text-center text-h6"
              >
                {{ $t('nothingHere') }}
              </div>
            </template>
            <template v-else>
              <q-item
                v-for="stat, index in stats"
                :key="index"
                clickable
                class="g-rounded cursor-inherit"
              >
                <q-item-section>
                  <q-item-label class=" text-h6">
                    {{ `${index+1}. ${stat.name}` }}
                  </q-item-label>
                  <q-item-label
                    lines="2"
                    class=" text-subtitle1"
                  >
                    {{ stat.description }}
                  </q-item-label>
                </q-item-section>
                <q-item-section
                  side
                  class="text-h4"
                >
                  {{ stat.value }}
                </q-item-section>
              </q-item>
              <div
                v-if="!stats.length"
                class="text-center text-h6"
              >
                {{ $t('nothingHere') }}
              </div>
            </template>
          </q-list>
        </div>
      </q-card>
    </div>
    <EditUserModal
      v-if="openEditModal"
      :open-modal="openEditModal"
      :user-id="openIdForEditing"
      @close="closeEditModal"
    />
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useUserStore } from 'src/stores/userStore'
import { useUserActions } from 'src/components/UsersPage/userActions'
import EditUserModal from 'src/components/modals/EditUserModal.vue'
import { graphqlSDK } from 'src/boot/grapqhl'
import {
  UserAch, UserEvent, UserStat,
} from 'src/api/generated'
import { logError } from 'src/utils/utils'
import { useAchievementsStore } from 'src/stores/achievementsStore'
import { useUsersStore } from 'src/stores/usersStore'

const userStore = useUserStore()
const achievementsStore = useAchievementsStore()
const usersStore = useUsersStore()

const {
  editUser,
  openEditModal,
  openIdForEditing,
  closeEditModal,
} = useUserActions()
const showRatingTooltip = ref(false)

type FeedMode = 'ach' | 'events' | 'stats'
const feedMode = ref<FeedMode>('ach')

const events = ref<Array<UserEvent>>([])
const achievements = ref<Array<UserAch>>([])
const stats = ref<Array<UserStat>>([])
const place = ref<string | number>(-1)

onMounted(() => {
  if (!userStore.id) {
    logError('No user id')
    return
  }

  graphqlSDK.GetFullUser({ id: Number(userStore.id) }).then((res) => {
    events.value = res.GetFullUser.events as UserEvent[]
    achievements.value = res.GetFullUser.achievements
    stats.value = res.GetFullUser.stats as UserStat[]
    place.value = res.GetFullUser.place_by_achs

    if (place.value === -1) {
      place.value = '~'
    }
  }).catch((error) => {
    logError(error)
  })
})
</script>
