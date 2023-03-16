<template>
  <q-dialog
    :model-value="openModal"
    :full-width="$q.platform.is.mobile"
    :position="$q.platform.is.mobile ? 'bottom' : 'standard'"
    @update:model-value="emit('close')"
  >
    <q-card
      class="g-rounded"
      :style="{ 'min-width': $q.platform.is.mobile ? 'auto' : '500px' }"
    >
      <q-card-section class="row items-center no-wrap q-py-md">
        <q-icon
          name="sym_o_edit"
          size="lg"
          color="primary"
          class="q-mr-xs"
        />
        <div
          class="text-primary"
          :class="$q.platform.is.mobile ? 'text-h6' : 'text-h5'"
        >
          {{ $t('editStatHeader') }}
        </div>
        <q-space />
        <q-btn
          v-close-popup
          icon="close"
          flat
          round
          dense
        />
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div class="row no-wrap text-subtitle1 items-center q-mb-md">
          <q-icon
            name="sym_o_analytics"
            class="q-mr-sm"
            size="md"
          />
          <span>{{ $t('statInfo') }}</span>
        </div>

        <q-input
          v-model="name"
          outlined
          class="full-width text-subtitle1 q-mb-md"
          :placeholder="$t('statName')"
          autofocus
          :clearable="!name || name !== oldName"
          :error="statNameError"
          clear-icon="sym_o_restart_alt"
          tabindex="1"
          :hint="$t('uniqueRequired')"
          @update:model-value="statNameError = false"
          @clear="restoreStatName"
          @keyup.prevent.enter="editStat"
        />

        <q-input
          v-model="description"
          outlined
          class="full-width text-subtitle1"
          :placeholder="$t('statDesc')"
          autofocus
          :clearable="!description || description !== oldDescription"
          tabindex="2"
          autogrow
          :hint="$t('nonRequired')"
          @clear="restoreStatDesc"
          @keyup.prevent.enter="editStat"
        />

        <q-separator class="q-my-md" />

        <div class="row no-wrap text-subtitle1 items-center q-mb-md">
          <q-icon
            name="sym_o_settings"
            class="q-mr-sm"
            size="md"
          />
          <span>{{ $t('resetSettings') }}</span>
        </div>

        <q-input
          v-model.number="period"
          outlined
          class="full-width text-subtitle1 q-mb-md"
          bottom-slots
          :placeholder="$t('period')"
          autofocus
          :clearable="!period || period !== oldPeriod"
          tabindex="3"
          :suffix="period ? $t('days') : ''"
          :hint="$t('periodHint')"
          @clear="restoreStatPeriod"
          @keyup.prevent.enter="editStat"
        />

        <q-input
          v-show="period"
          :model-value="startAt || defaultDate"
          outlined
          class="full-width text-subtitle1 q-mb-md"
          bottom-slots
          :hint="$t('fitstResetDate')"
          autofocus
          :clearable="!startAt || new Date(startAt).getTime() !== oldStartAt"
          tabindex="4"
          readonly
          @clear="restoreStatStartAt"
          @keyup.prevent.enter="editStat"
        >
          <template #append>
            <q-btn
              icon="event"
              round
              color="primary"
              flat
            >
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="startAt"
                  minimal
                  mask="DD.MM.YYYY"
                  :options="dateValidator"
                />
              </q-popup-proxy>
            </q-btn>
          </template>
        </q-input>

        <q-input
          v-model="seqPeriod"
          outlined
          class="full-width text-subtitle1"
          bottom-slots
          :placeholder="$t('seqPeriod')"
          :hint="$t(seqPeriodHint'')"
          autofocus
          :clearable="!seqPeriod || seqPeriod !== oldSeqPeriod"
          :suffix="seqPeriod ? $t('days') : ''"
          tabindex="5"
          @clear="restoreStatSeqPeriod"
          @keyup.prevent.enter="editStat"
        />
      </q-card-section>

      <q-card-actions class="q-px-lg q-py-lg">
        <q-btn
          :label="$t('saveChanges')"
          color="primary"
          no-caps
          size="lg"
          tabindex="6"
          class="g-rounded full-width text-subtitle1"
          @click="editStat"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { date, useQuasar } from 'quasar'
import { Stat, UpdateStat } from 'src/api/generated'
import {
  computed, onMounted, PropType, ref,
} from 'vue'
import { logError } from 'src/utils/utils'
import { useStatsStore } from 'src/stores/statsStore'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  openModal: Boolean,
  statId: {
    type: Number as PropType<Stat['id']> | undefined,
    default: undefined,
  },
})

const emit = defineEmits<{(e: 'close'): void,
  (e: 'changeStat', value: Stat): void,
}>()

const $q = useQuasar()
const i18n = useI18n()
const statsStore = useStatsStore()

const stat = statsStore.stats.find((item) => item.id === props.statId) as Stat

const defaultDate = new Date().toLocaleDateString('ru-RU')

const id = computed(() => props.statId)
const name = ref(stat.name)
const description = ref(stat.description)
const period = ref(stat.period)
const seqPeriod = ref(stat.seq_period)
const startAt = ref(new Date(stat.start_at * 1000).toLocaleDateString('ru-RU'))

const oldName = ref(stat.name)
const oldDescription = ref(stat.description)
const oldPeriod = ref(stat.period)
const oldSeqPeriod = ref(stat.seq_period)
const oldStartAt = ref(stat.start_at * 1000)

const statNameError = ref(false)

const restoreStatName = (): void => {
  name.value = oldName.value
}

const restoreStatDesc = (): void => {
  description.value = oldDescription.value
}

const restoreStatPeriod = (): void => {
  period.value = oldPeriod.value
}

const restoreStatSeqPeriod = (): void => {
  seqPeriod.value = oldSeqPeriod.value
}

const restoreStatStartAt = (): void => {
  startAt.value = new Date(oldStartAt.value).toLocaleDateString('ru-RU')
}

const dateValidator = (dateToValidate: string): boolean => {
  const [years, months, days] = dateToValidate.split('/')

  const dateToCompare = new Date()
  dateToCompare.setFullYear(Number(years), Number(months) - 1, Number(days))

  const validateDate = new Date()
  validateDate.setDate(validateDate.getDate() + 1)

  return dateToCompare.getTime() >= validateDate.getTime()
}

const editStat = (): void => {
  if (!props.statId) return

  name.value = name.value.trim()
  if (!name.value.length) {
    statNameError.value = true
    return
  }

  if (name.value === oldName.value && description.value === oldDescription.value && period.value === oldPeriod.value && seqPeriod.value === oldSeqPeriod.value) {
    $q.notify({
      icon: 'sym_o_close',
      message: i18n.t('nothingChanged'),
      timeout: 2000,
      position: 'top-right',
      color: 'warning',
    })
  } else {
    const startAtDate = date.extractDate(startAt.value, 'DD.MM.YYYY')

    const newStat: UpdateStat = {
      name: name.value,
      description: description.value,
      period: period.value,
      seq_period: seqPeriod.value,
      id: props.statId,
      start_at: startAtDate.getTime() / 1000,
    }
    statsStore.changeStat(newStat)
    emit('close')
    $q.notify({
      icon: 'sym_o_edit',
      message: i18n.t('edited'),
      timeout: 2000,
      position: 'top-right',
      color: 'primary',
    })
  }
}

onMounted(() => {
  if (!id.value) {
    logError('Edit modal without id')
    emit('close')
  }
})
</script>
