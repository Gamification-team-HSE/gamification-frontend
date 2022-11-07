<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-transparent text-dark">
      <q-toolbar>
        <q-toolbar-title class="text-h4">
          Gamification
        </q-toolbar-title>

        <q-btn
          flat
          rounded
          no-caps
          dense
          padding="xs md"
          size="lg"
          color="negative"
          @click="userStore.unlogin"
        >
          Sign out
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useUserStore } from 'src/stores/user-store'

const userStore = useUserStore()
</script>
