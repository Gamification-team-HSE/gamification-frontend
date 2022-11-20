<template>
  <q-card class="g-rounded g-shadow">
    <q-card-section
      class=" no-wrap text-primary row items-center  q-pb-none"
      :class="$q.platform.is.mobile ? 'text-h5' : 'text-h4'"
    >
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
