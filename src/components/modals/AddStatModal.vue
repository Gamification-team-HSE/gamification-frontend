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
          Создание показателя
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
          <span>Информация о показателе</span>
        </div>

        <q-input
          v-model="name"
          outlined
          class="full-width text-subtitle1 q-mb-md"
          placeholder="Название показателя*"
          autofocus
          clearable
          tabindex="1"
          hint="Уникальное, обязательное"
        />

        <q-input
          v-model="description"
          outlined
          class="full-width text-subtitle1"
          placeholder="Описание показателя"
          autofocus
          clearable
          tabindex="2"
          autogrow
          hint="Необязательное"
        />

        <q-separator class="q-my-md" />

        <div class="row no-wrap text-subtitle1 items-center q-mb-md">
          <q-icon
            name="sym_o_settings"
            class="q-mr-sm"
            size="md"
          />
          <span>Настройки сброса</span>
        </div>

        <q-input
          v-model.number="period"
          outlined
          class="full-width text-subtitle1 q-mb-md"
          bottom-slots
          placeholder="Период сброса в днях, например - 3"
          autofocus
          clearable
          tabindex="3"
          :suffix="period ? 'дней' : ''"
          hint="Показатель будет сбрасываться раз в этот период у всех пользователей"
        />

        <q-input
          v-show="period"
          :model-value="startAt || defaultDate"
          outlined
          class="full-width text-subtitle1 q-mb-md"
          bottom-slots
          hint="Дата первого сброса"
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
          v-model="seqPeriod"
          outlined
          class="full-width text-subtitle1"
          bottom-slots
          placeholder="Период сброса без активности в днях, например - 3"
          hint="Если пользователь не увеличит показатель в течение этого периода - он будет сброшен"
          autofocus
          clearable
          :suffix="seqPeriod ? 'дней' : ''"
          tabindex="5"
        />
      </q-card-section>

      <q-card-actions class="q-px-lg q-py-lg">
        <q-btn
          label="Создать показатель"
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
import { ref } from 'vue'

const emit = defineEmits<{(e: 'close'): void,
}>()

const props = defineProps({
  isOpen: Boolean,
})

const defaultDate = new Date().toLocaleDateString('ru-RU')

const name = ref('')
const description = ref('')
const period = ref<number | undefined>()
const seqPeriod = ref('')
const startAt = ref(defaultDate)

const dateValidator = (date: string): boolean => {
  const [years, months, days] = date.split('/')

  const dateToCompare = new Date()
  dateToCompare.setFullYear(Number(years), Number(months) - 1, Number(days))

  return dateToCompare.getTime() >= Date.now()
}

const handleAddStats = (): void => {
  emit('close')
}
</script>
