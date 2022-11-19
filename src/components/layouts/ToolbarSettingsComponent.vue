<template>
  <div class="row items-center q-gutter-x-sm">
    <q-btn
      flat
      class="text-subtitle1 g-rounded"
      dense
      :label="layout.lang.value"
      @click="layout.toggleLang"
    />
    <q-toggle
      :model-value="layout.theme.value === true"
      checked-icon="sym_o_dark_mode"
      color="primary"
      unchecked-icon="sym_o_light_mode"
      @update:model-value="layout.toggleTheme"
    />
  </div>
</template>
<script setup lang="ts">
import { useLayoutSettings } from './layoutSettings'

const layout = useLayoutSettings()
</script>
