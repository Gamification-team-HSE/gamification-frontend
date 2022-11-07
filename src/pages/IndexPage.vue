<template>
  <q-page class="row items-center justify-evenly">
    {{ $route.fullPath }}
    {{ $route.name }}
    {{ userStore.isLoggedIn }}
    {{ userStore.isAdmin }}
  </q-page>
</template>

<script setup lang="ts">
import { useUserStore } from 'src/stores/user-store'

const userStore = useUserStore()

</script>
