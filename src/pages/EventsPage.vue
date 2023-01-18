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
          @change-event="changeEvent"
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
import { computed, ref } from 'vue'
// import { useQuasar } from 'quasar'
import SearchNotFoundComponent from 'src/components/SearchNotFoundComponent.vue'
import EventsList from 'src/components/EventsPage/EventsList.vue'
import HeaderCardComponent from 'src/components/EventsPage/HeaderCardComponent.vue'
// import { exportAllDeclaration } from '@babel/types'

type Event = {
  name: string,
  description: string,
  imgUrl: string,
  dateRange: { from: number, to: number },
  created_at: number,
  id: number,
}

const isLoading = ref(false)
// const $q = useQuasar()

const example1: Event = {
  name: 'Новый год 2023',
  description: 'Войти в аккаунт в новогодние каникулы 2023',
  imgUrl: 'https://cdn.quasar.dev/img/boy-avatar.png',
  dateRange: { from: Date.now(), to: Date.now() + 24 * 60 * 60 * 1000 },
  created_at: Date.now(),
  id: 1,
}

const example2: Event = {
  name: 'Событие2',
  description: 'Описание события',
  imgUrl: 'https://cdn.quasar.dev/img/boy-avatar.png',
  dateRange: { from: Date.now(), to: Date.now() + 24 * 60 * 60 * 1000 },
  created_at: Date.now(),
  id: 2,
}

const eventsArray = ref<Event[]>([example1, example2])
const filterValue = ref('')
const filteredAndSortedArray = computed<Event[]>(() => {
  const arr = [...eventsArray.value].sort((a, b) => b.created_at - a.created_at)
  const filterValueLower = filterValue.value.toLowerCase()
  return arr.filter((item) => item.name.toLowerCase().includes(filterValueLower) || item.description?.toLowerCase().includes(filterValueLower))
})

const changeFilter = (newValue: string): void => {
  filterValue.value = newValue
}

const changeEvent = (newEvent: Event) => {
  const oldEvent = filteredAndSortedArray.value.find(({ id }) => id === newEvent.id)
  if (oldEvent !== undefined) {
    const oldEventIndex = filteredAndSortedArray.value.indexOf(oldEvent)
    filteredAndSortedArray.value[oldEventIndex] = newEvent
  }
}
</script>
