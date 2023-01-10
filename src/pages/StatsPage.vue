<template>
  <q-page
    class="row justify-evenly"
    padding
  >
    <div class=" col-lg-6 col-xl-5 col-md-8 col-sm-8 col-11 q-gutter-y-lg">
      <q-card class=" g-shadow g-rounded">
        <q-card-section class=" text-h4 q-pb-none">
          Показатели (N)
        </q-card-section>
        <q-card-section>
          <q-input
            v-model="filterValue"
            outlined
            class="full-width text-h6"
            placeholder="Найти по названию"
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
        v-for="stat in filteredAndSortedArray"
        :key="stat.id"
        class="g-shadow g-shadow-hover g-rounded"
      >
        <q-card-section class="column q-pb-none">
          <div class="text-h6">
            {{ stat.name }}
          </div>
          <div class="text-caption">
            Создан: {{ new Date(stat.created_at).toLocaleDateString('ru-RU') }}
          </div>
          <div class="text-subtitle1 q-mt-sm">
            {{ stat.description || 'Описания нет' }}
          </div>
        </q-card-section>
        <q-card-section class="column">
          <div
            v-if="stat.period"
            class="row items-center"
          >
            <q-icon
              name="sym_o_restart_alt"
              color="primary"
              size="md"
            />
            <div class="column q-ml-md text-subtitle2">
              <span>Показатель сбрасывается раз в {{ stat.period }}.</span>
              <span>Начало периода: {{ new Date(stat.start_at).toLocaleDateString('ru-RU') }}.</span>
            </div>
          </div>
          <q-separator
            v-if="stat.seq_period && stat.period"
            class="q-my-sm"
          />
          <div
            v-if="stat.seq_period"
            class="row items-center"
          >
            <q-icon
              name="sym_o_rotate_90_degrees_cw"
              color="primary"
              size="md"
            />
            <div class="column q-ml-md text-subtitle2">
              <span>Пользователь должен</span>
              <span>увеличивать показатель раз в {{ stat.seq_period }}, иначе он обнулится.</span>
            </div>
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
            Редактировать
          </q-btn>
          <q-btn
            flat
            icon="sym_o_delete"
            size="md"
            outline
            color="negative"
            class="g-rounded full-width"
            no-caps
            @click="deleteStat(stat.id)"
          >
            Удалить
          </q-btn>
        </q-card-actions>
      </q-card>
      <SearchNotFoundComponent v-if="!filteredAndSortedArray.length" />
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useQuasar } from 'quasar'
import { Stat } from 'src/api/generated'
import SearchNotFoundComponent from 'src/components/SearchNotFoundComponent.vue'

const example: Stat = {
  __typename: 'Stat',
  created_at: Date.now() - 1000,
  description: 'Пользователь должен заходить в систему каждый день в течение 30 дней',
  name: 'Заход в систему каждый день в месяце',
  period: '30d',
  seq_period: '1d',
  start_at: Date.now(),
  id: 1,
}

const example2: Stat = {
  __typename: 'Stat',
  created_at: Date.now(),
  description: 'Показатель сотрудников по созданию новых задач',
  name: 'Создание задачи каждый день',
  period: '',
  seq_period: '1d',
  start_at: 0,
  id: 2,
}

const $q = useQuasar()

const statsArray = ref<Stat[]>([example, example2])
const filterValue = ref('')

const filteredAndSortedArray = computed<Stat[]>(() => {
  const arr = [...statsArray.value].sort((a, b) => b.created_at - a.created_at)
  const filterValueLower = filterValue.value.toLowerCase()
  return arr.filter((item) => item.name.toLowerCase().includes(filterValueLower) || item.description?.toLowerCase().includes(filterValueLower))
})

const deleteStat = (id: Stat['id']): void => {
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
    title: 'Удалить показатель',
    message: 'Вы уверены что хотите удалить показатель?',
    class: 'g-rounded',
    position: $q.platform.is.mobile ? 'bottom' : 'standard',
  }).onOk(() => {
    $q.notify({
      icon: 'sym_o_delete',
      message: 'Показатель удален',
      timeout: 2000,
      position: 'top-right',
      color: 'primary',
    })

    statsArray.value = statsArray.value.filter((stat) => stat.id !== id)
  })
}
</script>
