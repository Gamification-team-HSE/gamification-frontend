<template>
  <q-page class="row items-center justify-center">
    <div class="col-6 q-gutter-y-lg">
      <div class="text-h1 text-center text-primary">
        #{{ state.ratingPlace }}
      </div>
      <q-card flat>
        <q-card-section class="row justify-between">
          <div class="column">
            <div class="text-subtitle1">
              Username
            </div>
            <div class="text-h5">
              {{ state.fullName }}
            </div>
          </div>
          <div class="column">
            <div class="text-subtitle1">
              Email
            </div>
            <div class="text-h5">
              {{ state.email }}
            </div>
          </div>
        </q-card-section>
      </q-card>
      <q-separator />
      <div class="row justify-between q-gutter-x-lg">
        <q-card
          flat
          class="column col-grow"
        >
          <q-card-section class="column">
            <span class="text-subtitle1">Rating place</span>
            <span class="text-h4">#{{ state.ratingPlace }}/{{ state.ratingTotalPlaces }}</span>
          </q-card-section>
        </q-card>
        <q-card
          flat
          class=" column col-grow"
        >
          <q-card-section class="column">
            <span class="text-subtitle1">Achievements</span>
            <span class="text-h4">{{ state.achievements }}/{{ state.achievementsTotal }}</span>
          </q-card-section>
        </q-card>
        <q-card
          flat
          class=" column col-grow"
        >
          <q-card-section class="column">
            <span class="text-subtitle1">Events</span>
            <span class="text-h4">{{ state.events }}</span>
          </q-card-section>
        </q-card>
      </div>

      <div class=" text-h5 q-mt-xl">
        Achievements list
      </div>

      <q-list>
        <q-item>
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
            5 min ago
          </q-item-section>
        </q-item>

        <q-separator
          spaced
          inset
        />
        <q-item>
          <q-item-section
            top
            avatar
          >
            <q-avatar
              size="66px"
              rounded
            >
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label class=" text-h6">
              Login into app!
            </q-item-label>
            <q-item-label
              lines="2"
              class=" text-subtitle1"
            >
              First login into gamefication app
            </q-item-label>
          </q-item-section>
          <q-item-section
            side
            top
          >
            10 days ago
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { User } from 'src/types'
import { ref } from 'vue'

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
