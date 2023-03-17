<template>
  <q-dialog
    :model-value="props.openCreateEvent"
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
          {{ $t('addEventHeader') }}
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

      <q-card-section class="q-px-lg q-pt-lg column q-gutter-y-md q-pb-none text-subtitle1">
        <div class="row no-wrap text-subtitle1 items-center q-mt-md">
          <q-icon
            name="sym_o_celebration"
            class="q-mr-sm"
            size="md"
          />
          <span>{{ $t('fillEventInfo') }}</span>
        </div>
        <div class="row justify-center">
          <q-avatar
            size="150px"
            class="cursor-pointer"
            @click="avatarInputRef?.pickFiles()"
          >
            <img
              ref="avatarRef"
              :src="avatarUrl"
            >
          </q-avatar>
        </div>
        <q-file
          ref="avatarInputRef"
          v-model="eventImage"
          class=" hidden"
          :label="$t('fileUpload')"
          counter
          outlined
          accept=".jpg, .jpeg, .png, image/*"
          max-files="1"
          dense
          :max-file-size="200000"
          @update:model-value="readBlob"
        >
          <template #prepend>
            <q-icon name="sym_o_attach_file" />
          </template>
        </q-file>
        <q-input
          v-model="eventNameRef"
          outlined
          class="full-width text-subtitle1"
          :placeholder="$t('eventNamePlaceholder')"
          autofocus
          clearable
          type="text"
          autocomplete="off"
          tabindex="1"
          @keyup.prevent.enter="addEvent"
        />
        <q-input
          v-model="eventDescRef"
          outlined
          class="full-width text-subtitle1"
          :placeholder="$t('eventDescPlaceholder')"
          autofocus
          clearable
          type="text"
          autocomplete="off"
          tabindex="2"
          @keyup.prevent.enter="addEvent"
        />

        <div class="row no-wrap justify-between q-mt-md">
          <q-input
            outlined
            :placeholder="$t('eventDatePlaceholder')"
            :model-value="dateStringComputed"
            tabindex="4"
            class="full-width"
          >
            <template #append>
              <q-icon
                name="sym_o_date_range"
                class="cursor-pointer"
              >
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="dateRange"
                    range
                    mask="DD.MM.YYYY"
                    :options="dateValidator"
                  >
                    <div class="row items-center justify-end">
                      <q-btn
                        v-close-popup
                        label="Close"
                        flat
                      />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </q-card-section>

      <q-card-actions class="q-px-lg q-py-lg">
        <q-btn
          :label="$t('addEvent')"
          color="primary"
          no-caps
          size="lg"
          tabindex="5"
          class="g-rounded full-width text-subtitle1"
          @click="addEvent"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { date, QFile, useQuasar } from 'quasar'
import { useEventsStore } from 'src/stores/eventsStore'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  openCreateEvent: Boolean,
})

const emit = defineEmits<{(e: 'close'): void,
}>()

const $q = useQuasar()
const i18n = useI18n()
const eventsStore = useEventsStore()

const today = new Date()
today.setDate(today.getDate() + 1)
const currentDate = today.toLocaleDateString('ru-RU')

today.setDate(today.getDate() + 1)
const nextDate = today.toLocaleDateString('ru-RU')

const eventNameRef = ref('')
const eventDescRef = ref('')
const eventImage = ref(null)
const dateRange = ref<string | {from: string, to: string}>({ from: currentDate, to: nextDate })

const avatarRef = ref<HTMLImageElement>()
const avatarInputRef = ref<QFile>()
const avatarUrl = ref('https://cdn-icons-png.flaticon.com/512/5968/5968923.png')

const readBlob = () => {
  if (!eventImage.value) return

  const reader = new FileReader()
  reader.onload = (e) => {
    if (!avatarRef.value || !e.target) return
    avatarRef.value.src = e.target.result as string
  }
  reader.readAsDataURL(eventImage.value)
}

const dateValidator = (dateToValidate: string): boolean => {
  const [years, months, days] = dateToValidate.split('/')

  const dateToCompare = new Date()
  dateToCompare.setFullYear(Number(years), Number(months) - 1, Number(days))

  const validateDate = new Date()
  validateDate.setDate(validateDate.getDate() + 1)

  return dateToCompare.getTime() >= validateDate.getTime()
}

const dateStringComputed = computed<string>(() => {
  if (!dateRange.value) return ''

  if (typeof dateRange.value === 'string') return dateRange.value

  return `${dateRange.value.from} - ${dateRange.value.to}`
})

const addEvent = async () => {
  eventNameRef.value = eventNameRef.value.trim()
  if (!eventNameRef.value.length) {
    // eventNameError.value = true
    return
  }

  const endAt = typeof dateRange.value === 'string' ? undefined : date.extractDate(dateRange.value.to, 'DD.MM.YYYY')
  const startAt = typeof dateRange.value === 'string' ? date.extractDate(dateRange.value, 'DD.MM.YYYY') : date.extractDate(dateRange.value.from, 'DD.MM.YYYY')

  try {
    await eventsStore.addEvent({
      name: eventNameRef.value,
      description: eventDescRef.value,
      end_at: endAt ? endAt.getTime() / 1000 : endAt,
      start_at: startAt.getTime() / 1000,
      image: eventImage.value,
    })

    $q.notify({
      icon: 'sym_o_calendar_add_on',
      message: i18n.t('eventAdded'),
      timeout: 2000,
      position: 'top-right',
      color: 'primary',
    })

    emit('close')
  } catch (error) {
    console.error('event creating error', error)
    // emailError.value = true
  }
}
</script>
