<template>
  <q-page
    class="row items-center justify-evenly"
    padding
  >
    <div class=" col-lg-6 col-xl-5 col-md-8 col-sm-8 col-11 q-gutter-y-lg">
      <q-card class="g-rounded g-shadow">
        <q-card-section class=" text-h4 text-primary row items-center  q-pb-none">
          <q-icon
            name="sym_o_admin_panel_settings"
            size="lg"
            class=" q-mr-md"
          />
          {{ $t('profileAdmin') }}
        </q-card-section>
        <q-card-section class=" text-subtitle1">
          {{ $t('adminMainText') }}
        </q-card-section>
      </q-card>
      <q-card class="g-rounded g-shadow">
        <q-card-section class="text-primary row items-center text-h5  q-pb-none">
          <q-icon
            name="sym_o_group"
            size="lg"
            class=" q-mr-md"
          />
          {{ $t('users') }} - 150
        </q-card-section>
        <q-card-section class=" text-subtitle1">
          {{ $t('adminUsersText', {
            count: '150',
            deleted: '25'
          })
          }}
        </q-card-section>
        <q-card-actions class="row q-gutter-y-sm">
          <q-btn
            no-caps
            color="primary"
            class="g-rounded"
            icon="sym_o_add"
            :label="$t('adminAddUserViaForm')"
            @click="showNotImplemented"
          />
          <q-btn
            no-caps
            color="primary"
            class="g-rounded"
            icon="sym_o_table"
            outline
            :label="$t('adminAddUserViaExcel')"
            @click="showNotImplemented"
          />
          <q-btn
            no-caps
            color="primary"
            class="g-rounded"
            icon="sym_o_turn_right"
            flat
            :label="$t('adminGoToUsers')"
            @click="$router.push({name: 'admin.users'})"
          />
        </q-card-actions>
      </q-card>
      <q-card class="g-rounded g-shadow">
        <q-card-section class="text-primary row items-center text-h5 q-pb-none">
          <q-icon
            name="sym_o_trending_up"
            size="lg"
            class=" q-mr-md"
          />
          {{ $t('usersRating') }}
        </q-card-section>
        <q-card-section class=" text-subtitle1">
          {{ $t('adminRating1') }}
          <br>
          {{ $t('adminRating2') }}
        </q-card-section>
        <q-card-actions class="row q-gutter-y-sm">
          <q-btn
            no-caps
            color="primary"
            class="g-rounded full-width"
            icon="sym_o_turn_right"
            :label="$t('adminGoToRating')"
            @click="$router.push({name: 'admin.ratings'})"
          />
        </q-card-actions>
      </q-card>
      <q-card class="g-rounded g-shadow">
        <q-card-section class="text-primary row items-center text-h5  q-pb-none">
          <q-icon
            name="sym_o_hotel_class"
            size="lg"
            class=" q-mr-md"
          />
          {{ $t('achievements') }} - 25
        </q-card-section>
        <q-card-section class=" text-subtitle1">
          {{ $t('adminAchievText', {
            count: 25,
          }) }}
        </q-card-section>
        <q-card-actions class="row  q-gutter-y-sm">
          <q-btn
            no-caps
            color="primary"
            class="g-rounded"
            icon="sym_o_add"
            :label="$t('adminAddAchiev')"
            @click="showNotImplemented"
          />
          <q-btn
            no-caps
            color="primary"
            class="g-rounded"
            icon="sym_o_turn_right"
            flat
            :label="$t('adminGoToAchieves')"
            @click="$router.push({name: 'admin.achievements'})"
          />
        </q-card-actions>
      </q-card>
      <q-card class="g-rounded g-shadow">
        <q-card-section class="text-primary row items-center text-h5  q-pb-none">
          <q-icon
            name="sym_o_celebration"
            size="lg"
            class=" q-mr-md"
          />
          {{ $t('events') }} - 15
        </q-card-section>
        <q-card-section class=" text-subtitle1">
          {{ $t('adminEventsText', {
            count: 25,
          }) }}
        </q-card-section>
        <q-card-actions class="row  q-gutter-y-sm">
          <q-btn
            no-caps
            color="primary"
            class="g-rounded"
            icon="sym_o_add"
            :label="$t('adminAddEvent')"
            @click="showNotImplemented"
          />
          <q-btn
            no-caps
            color="primary"
            class="g-rounded"
            icon="sym_o_turn_right"
            flat
            :label="$t('adminGoToEvents')"
            @click="$router.push({name: 'admin.events'})"
          />
        </q-card-actions>
      </q-card>
      <q-card class="g-rounded g-shadow">
        <q-card-section class="text-primary row items-center text-h5  q-pb-none">
          <q-icon
            name="sym_o_analytics"
            size="lg"
            class=" q-mr-md"
          />
          {{ $t('stats') }} - 25
        </q-card-section>
        <q-card-section class=" text-subtitle1">
          {{ $t('adminStatsText', {
            count: 25,
          }) }}
        </q-card-section>
        <q-card-actions class="row  q-gutter-y-sm">
          <q-btn
            no-caps
            color="primary"
            class="g-rounded"
            icon="sym_o_add"
            :label="$t('adminAddStat')"
            @click="showNotImplemented"
          />
          <q-btn
            no-caps
            color="primary"
            class="g-rounded"
            icon="sym_o_turn_right"
            flat
            :label="$t('adminGoToStats')"
            @click="$router.push({name: 'admin.stats'})"
          />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { useQuasar } from 'quasar'

const $q = useQuasar()

const showNotImplemented = () => {
  $q.notify({
    icon: 'sym_o_bug_report',
    message: 'Chill out',
    caption: 'Feature in progress',
    timeout: 2000,
    position: 'top-right',
    color: 'primary',
  })
}
</script>
