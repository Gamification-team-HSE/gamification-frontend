<template>
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
        :to="{ name: 'admin.ratings' }"
      />
    </q-card-actions>
  </q-card>
</template>
