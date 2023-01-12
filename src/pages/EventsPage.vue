<template>
  <q-page
    class="row justify-evenly"
    padding
  >
    <div class=" col-lg-6 col-xl-5 col-md-8 col-sm-8 col-11 q-gutter-y-lg">
      <q-card class=" g-shadow g-rounded">
        <q-card-section class=" text-h4 q-pb-none">
          {{ $t('events') }}
        </q-card-section>
        <q-card-section>
          <q-input
            v-model="filterValue"
            outlined
            class="full-width text-h6"
            :placeholder="$t('findByName')"
            autofocus
            clearable
            hide-bottom-space
          >
            <template #prepend>
              <q-icon name="sym_o_search" />
            </template>
          </q-input>
        </q-card-section>
      </q-card>
      <q-card
        v-for="event in filteredAndSortedArray"
        :key="event.id"
        class="g-shadow g-shadow-hover g-rounded"
      >
        <div class="row justify-around items-center q-gutter-x-md ">
          <q-avatar size="5em">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            <!-- тут потом будет картинка ивента -->
          </q-avatar>
          <q-card-section class="column q-pb-none">
            <div class="text-h6">
              {{ event.name }}
            </div>
            <div class="text-subtitle1 q-mt-sm">
              {{ event.description || $t('noDescription') }}
            </div>
            <div class="text-caption">
              {{ $t('eventDuration') }}: {{ event.dateRange.from == event.dateRange.to ? new Date(event.dateRange.from).toLocaleDateString('ru-RU') : new Date(event.dateRange.from).toLocaleDateString('ru-RU') + '-' + new Date(event.dateRange.to).toLocaleDateString('ru-RU') }}
            </div>
          </q-card-section>
          <q-card-actions class="row no-wrap">
            <q-btn
              flat
              icon="sym_o_edit"
              size="md"
              outline
              color="primary"
              class="g-rounded full-width"
              no-caps
            >
              {{ $t('edit') }}
            </q-btn>
            <q-btn
              flat
              icon="sym_o_delete"
              size="md"
              outline
              color="negative"
              class="g-rounded full-width"
              no-caps
              @click="deleteEvent(event.id)"
            >
              {{ $t('delete') }}
            </q-btn>
          </q-card-actions>
        </div>
      </q-card>
      <SearchNotFoundComponent v-if="!filteredAndSortedArray.length" />
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useQuasar } from 'quasar'
import SearchNotFoundComponent from 'src/components/SearchNotFoundComponent.vue'
import { exportAllDeclaration } from '@babel/types'

type Event = {
  name: string,
  description: string,
  imgUrl: string,
  dateRange: { from: number, to: number },
  created_at: number,
  id: number,
}

const $q = useQuasar()

const example1: Event = {
  name: 'Событие1',
  description: 'Описание события',
  imgUrl: 'https://cdn.quasar.dev/img/boy-avatar.png',
  dateRange: { from: Date.now(), to: Date.now() },
  created_at: Date.now(),
  id: 1,
}

const example2: Event = {
  name: 'Событие2',
  description: 'Описание события',
  imgUrl: 'https://cdn.quasar.dev/img/boy-avatar.png',
  dateRange: { from: Date.now(), to: Date.now() },
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

const deleteEvent = (id: Event['id']): void => {
  $q.dialog({
    ok: {
      color: 'negative',
      label: 'Удалить',
      unelevated: true,
      'no-caps': true,
      class: 'g-rounded',
      padding: 'sm lg',
      flat: true,
    },
    cancel: {
      unelevated: true,
      'no-caps': true,
      class: 'g-rounded',
      label: 'Отменить',
      padding: 'sm lg',
      color: 'primary',
      flat: true,
    },
    title: 'Удалить событие',
    message: 'Вы уверены, что хотите удалить событие?',
    class: 'g-rounded',
    position: $q.platform.is.mobile ? 'bottom' : 'standard',
  }).onOk(() => {
    $q.notify({
      icon: 'sym_o_delete',
      message: 'Событие удалено',
      timeout: 2000,
      position: 'top-right',
      color: 'primary',
    })

    eventsArray.value = eventsArray.value.filter((event) => event.id !== id)
  })
}
</script>
