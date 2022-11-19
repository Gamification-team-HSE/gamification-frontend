<template>
  <q-layout
    view="lHh Lpr lFf"
  >
    <q-header
      class="bg-white text-dark q-py-sm"
    >
      <q-toolbar>
        <ToolbarTitleComponent />

        <ToolbarSettingsComponent />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import ToolbarSettingsComponent from 'src/components/layouts/ToolbarSettingsComponent.vue'
import ToolbarTitleComponent from 'src/components/layouts/ToolbarTitleComponent.vue'

</script>
