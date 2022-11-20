<template>
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
</template>
