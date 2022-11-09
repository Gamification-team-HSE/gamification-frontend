<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-transparent text-dark">
      <q-toolbar>
        <ToolbarTitleComponent />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import ToolbarTitleComponent from 'src/components/layouts/ToolbarTitleComponent.vue'

</script>
