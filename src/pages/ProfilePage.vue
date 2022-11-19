<template>
  <q-page class="row items-center justify-center">
    <div class=" col-lg-6 col-xl-5 col-md-8 col-sm-8 col-11 q-gutter-y-lg">
      <q-card
        class="g-rounded g-shadow q-pa-md"
      >
        <q-card-section class="text-h2">
          {{ state.fullName }}
        </q-card-section>
        <q-card-section class="text-h5">
          <q-icon
            name="alternate_email"
            color="primary"
            size="lg"
            class="q-mr-sm"
          />{{ state.email }}
        </q-card-section>
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
                {{ $t('youHaveAchivs', {count: state.achievements, total: state.achievementsTotal}) }}
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
                {{ $t('youAreInRating', {count: state.ratingPlace, total: state.ratingTotalPlaces}) }}
              </div>
              <div>
                <q-btn
                  color="primary"
                  flat
                  rounded
                  no-caps
                  class="text-subtitle1 text-no-wrap"
                  @click="showRatingTooltip = true"
                >
                  {{ $t('whatIsThis') }}
                  <q-tooltip
                    v-model="showRatingTooltip"
                    class="text-subtitle1 bg-blue-2 text-dark"
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
            class="text-h5"
            rounded
            dense
            padding="sm xl"
            @click="showFeed = true"
          >
            {{ $t('feed') }}
          </q-btn>
          <q-btn
            flat
            :color="!showFeed ? 'primary' : ''"
            no-caps
            class="text-h5"
            rounded
            dense
            padding="sm xl"
            @click="showFeed = false"
          >
            {{ $t('achievements') }}
          </q-btn>
        </div>

        <q-separator />

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
  </q-page>
</template>

<script setup lang="ts">
import { User } from 'src/types'
import { ref } from 'vue'

const showRatingTooltip = ref(false)

const showFeed = ref(true)

const state: User = {
  fullName: 'Artem Shuvaev',
  email: 'sh@gmail.com',
  achievements: 5,
  achievementsTotal: 20,
  events: 7,
  ratingPlace: 18,
  ratingTotalPlaces: 25,
}
</script>
