<template>
  <q-page
    class="row justify-evenly"
    padding
  >
    <div class=" col-lg-6 col-xl-5 col-md-8 col-sm-8 col-11 q-gutter-y-lg">
      <HeaderCardComponent
        :is-loading="isLoading"
        :filter="filterValue"
        @change-filter="changeFilter"
      />
      <template v-if="!isLoading">
        <SearchNotFoundComponent v-if="!filteredAndSortedArray.length" />

        <EventsList
          v-else
          :events="filteredAndSortedArray"
        />
      </template>
      <div
        v-else
        class="row justify-center q-mt-xl"
      >
        <q-spinner
          color="primary"
          size="7em"
        />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
// import { computed, ref, reactive } from 'vue'
import { computed, ref } from 'vue'
// import { useQuasar } from 'quasar'
import SearchNotFoundComponent from 'src/components/SearchNotFoundComponent.vue'
import EventsList from 'src/components/EventsPage/EventsList.vue'
import HeaderCardComponent from 'src/components/EventsPage/HeaderCardComponent.vue'
import { useEventsStore, type Event } from 'src/stores/eventsStore'
// import { exportAllDeclaration } from '@babel/types'

const eventsStore = useEventsStore()

const isLoading = ref(false)
// const $q = useQuasar()

const filterValue = ref('')
const filteredAndSortedArray = computed<Event[]>(() => {
  const arr = [...eventsStore.events].sort((a, b) => b.created_at - a.created_at)
  const filterValueLower = filterValue.value.toLowerCase()
  return arr.filter((item) => item.name.toLowerCase().includes(filterValueLower) || item.description?.toLowerCase().includes(filterValueLower))
})

const changeFilter = (newValue: string): void => {
  filterValue.value = newValue
}

</script>
