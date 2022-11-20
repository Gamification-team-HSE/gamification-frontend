<template>
  <q-page
    class="row items-center justify-evenly"
    padding
  >
    <div class=" col-lg-6 col-xl-5 col-md-8 col-sm-8 col-11 q-gutter-y-lg">
      <MainCardComponent />
      <UsersCardComponent />
      <RatingsCardComponent />
      <AchievementsCardComponent />
      <EventsCardComponent />
      <StatsCardComponent />
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import MainCardComponent from 'src/components/admin/MainCardComponent.vue'
import UsersCardComponent from 'src/components/admin/UsersCardComponent.vue'
import RatingsCardComponent from 'src/components/admin/RatingsCardComponent.vue'
import AchievementsCardComponent from 'src/components/admin/AchievementsCardComponent.vue'
import EventsCardComponent from 'src/components/admin/EventsCardComponent.vue'
import StatsCardComponent from 'src/components/admin/StatsCardComponent.vue'
</script>
