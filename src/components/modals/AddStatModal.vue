<template>
  <q-dialog
    :model-value="props.isOpen"
    :full-width="$q.platform.is.mobile"
    :position="$q.platform.is.mobile ? 'bottom' : 'standard'"
    @update:model-value="emit('close')"
  >
    <q-card
      class="g-rounded"
      :style="{'min-width': $q.platform.is.mobile ? 'auto': '500px'}"
    >
      <q-card-section class="row items-center no-wrap q-py-md">
        <q-icon
          name="sym_o_add"
          size="lg"
          color="primary"
          class="q-mr-xs"
        />
        <div
          class="text-primary"
          :class="$q.platform.is.mobile ? 'text-h6' : 'text-h5'"
        >
          {{ $t('addStatHeader') }}
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
          clearable
          tabindex="1"
          :hint="$t('uniqueRequired')"
        />

        <q-input
          v-model="description"
          outlined
          class="full-width text-subtitle1"
          :placeholder="$t('statDesc')"
          autofocus
          clearable
          tabindex="2"
          autogrow
          :hint="$t('nonRequired')"
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
          clearable
          tabindex="3"
          :suffix="period ? $t('days') : ''"
          :hint="$t('periodHint')"
        />

        <q-input
          v-show="period"
          :model-value="startAt || defaultDate"
          outlined
          class="full-width text-subtitle1 q-mb-md"
          bottom-slots
          :hint="$t('fitstResetDate')"
          autofocus
          clearable
          tabindex="4"
          readonly
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
          v-model.number="seqPeriod"
          outlined
          class="full-width text-subtitle1"
          bottom-slots
          :placeholder="$t('seqPeriod')"
          :hint="$t('seqPeriodHint')"
          autofocus
          clearable
          :suffix="seqPeriod ? $t('days') : ''"
          tabindex="5"
        />
      </q-card-section>

      <q-card-actions class="q-px-lg q-py-lg">
        <q-btn
          :label="$t('createStat')"
          color="primary"
          no-caps
          size="lg"
          tabindex="6"
          class="g-rounded full-width text-subtitle1"
          @click="handleAddStats"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { date } from 'quasar'
import { useStatsStore } from 'src/stores/statsStore'
import { ref } from 'vue'

const emit = defineEmits<{(e: 'close'): void,
}>()

const props = defineProps({
  isOpen: Boolean,
})

const statsStore = useStatsStore()

const defaultDate = new Date().toLocaleDateString('ru-RU')

const name = ref('')
const description = ref('')
const period = ref<number | undefined>(undefined)
const seqPeriod = ref('')
const startAt = ref(defaultDate)

const dateValidator = (dateToValidate: string): boolean => {
  const [years, months, days] = dateToValidate.split('/')

  const dateToCompare = new Date()
  dateToCompare.setFullYear(Number(years), Number(months) - 1, Number(days))

  const validateDate = new Date()
  validateDate.setDate(validateDate.getDate() + 1)

  return dateToCompare.getTime() >= validateDate.getTime()
}

const handleAddStats = async (): Promise<void> => {
  const startDate = date.extractDate(startAt.value, 'DD.MM.YYYY')
  const periodFinal = period.value ? `${period.value}d` : ''
  const setPeriodFinal = seqPeriod.value ? `${seqPeriod.value}d` : ''

  const timestamp = startDate.getTime() / 1000

  try {
    await statsStore.addStat({
      name: name.value,
      description: description.value,
      seq_period: setPeriodFinal,
      start_at: timestamp,
      period: periodFinal,
    })
    emit('close')
  } catch (error) {
    console.error(error)
  }
}
</script>
