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
            @click="editStat(stat.id)"
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
          <EditStatModal
            v-if="openEditModal"
            :open-modal="openEditModal"
            :stat-id="openIdForEditing"
            :stat="stat"
            @close="closeEditModal"
          />
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
import EditStatModal from 'src/components/modals/EditStatModal.vue'
import { useStatsStore } from 'src/stores/statsStore'

const $q = useQuasar()
const statsStore = useStatsStore()

const filterValue = ref('')

const filteredAndSortedArray = computed<Stat[]>(() => {
  const arr = [...statsStore.stats].sort((a, b) => b.created_at - a.created_at)
  const filterValueLower = filterValue.value.toLowerCase()
  return arr.filter((item) => item.name.toLowerCase().includes(filterValueLower) || item.description?.toLowerCase().includes(filterValueLower))
})

const openEditModal = ref(false)
const openIdForEditing = ref<number | undefined>(undefined)

const closeEditModal = (): void => {
  openEditModal.value = false
  openIdForEditing.value = undefined
}

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

    statsStore.stats = statsStore.stats.filter((stat) => stat.id !== id)
  })
}

const editStat = (id: Stat['id']): void => {
  if (!id) throw new Error('Event doesnt have an ID')

  openEditModal.value = true
  openIdForEditing.value = id
}
</script>
