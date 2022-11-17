<template>
  <q-layout
    view="lHh Lpr lFf"
    class="bg-grey-2"
  >
    <q-header class="bg-transparent text-dark q-py-sm">
      <q-toolbar>
        <ToolbarTitleComponent />

        <div
          v-if="!$q.platform.is.mobile"
          class="row q-gutter-x-sm"
        >
          <q-btn
            v-for="(userRoute, index) in layout.routes.value"
            :key="index"
            flat
            rounded
            no-caps
            dense
            padding="xs md"
            class="text-h5"
            :color="userRoute.color"
            @click="$router.push({ name: userRoute.route })"
          >
            {{ userRoute.label }}
          </q-btn>

          <q-btn
            flat
            rounded
            no-caps
            dense
            padding="xs md"
            class=" text-h5"
            color="negative"
            @click="layout.signOut"
          >
            Sign out
          </q-btn>
        </div>
        <div v-else>
          <q-btn
            flat
            round
            dense
            icon="menu"
            class="q-mr-sm"
            @click="layout.drawer.value = !layout.drawer.value"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="layout.drawer.value"
      overlay
      :breakpoint="500"
      bordered
      class="bg-grey-3"
    >
      <q-scroll-area class="fit">
        <q-list>
          <q-item
            v-for="(menuItem, index) in layout.routes.value"
            :key="index"
            v-ripple
            clickable
            @click="$router.push({ name: menuItem.route })"
          >
            <q-item-section>
              {{ menuItem.label }}
            </q-item-section>
          </q-item>
          <q-item
            v-ripple
            clickable
            @click="layout.signOut"
          >
            <q-item-section>
              Sign out
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import ToolbarTitleComponent from 'src/components/layouts/ToolbarTitleComponent.vue'
import { useLayout } from './layout'

const layout = useLayout()
</script>
