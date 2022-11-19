<template>
  <q-layout
    view="lHh Lpr lFf"
    class="bg-body"
  >
    <q-header
      class="bg-header text-header q-py-sm"
      bordered
    >
      <q-toolbar>
        <ToolbarTitleComponent />

        <ToolbarSettingsComponent />
        <q-btn
          icon="menu"
          flat
          size="lg"
          rounded
        >
          <q-menu
            class="g-rounded"
            style="min-width: 300px"
          >
            <div class="column q-py-md">
              <q-item
                v-for="route, index in layout.routes.value"
                :key="index"
                v-ripple
                clickable
                class="text-subtitle1 g-rounded"
                :class="route.color ? `text-${route.color}` : ''"
                @click="$router.push({name: route.route})"
              >
                <q-item-section side>
                  <q-icon
                    :name="route.icon"
                    :color="route.color"
                  />
                </q-item-section>

                <q-item-section>{{ $t(route.label) }}</q-item-section>
              </q-item>

              <q-separator class="q-mx-md q-my-sm" />

              <q-item
                v-ripple
                clickable
                class="text-subtitle1 text-negative g-rounded"
                @click="layout.signOut"
              >
                <q-item-section side>
                  <q-icon
                    name="sym_o_logout"
                    color="negative"
                  />
                </q-item-section>
                <q-item-section>Sign out</q-item-section>
              </q-item>
            </div>
          </q-menu>
        </q-btn>
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
import { useLayout } from './layout'

const layout = useLayout()
</script>
