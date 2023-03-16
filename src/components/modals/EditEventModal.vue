<template>
  <q-dialog
    :model-value="openModal"
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
          name="sym_o_edit"
          size="lg"
          color="primary"
          class="q-mr-xs"
        />
        <div
          class="text-primary"
          :class="$q.platform.is.mobile ? 'text-h6' : 'text-h5'"
        >
          {{ $t('editEventHeader') }}
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
          class="full-width text-subtitle1"
          outlined
          bottom-slots
          :placeholder="$t('eventNamePlaceholder')"
          :hint="$t('itsRequiredField')"
          :error-message="$t('itsRequiredField')"
          :clearable="!eventNameRef || eventNameRef !== oldEventName"
          :error="eventNameError"
          autofocus
          clear-icon="sym_o_restart_alt"
          type="text"
          autocomplete="off"
          tabindex="1"
          @update:model-value="eventNameError = false"
          @clear="restoreEventName"
          @keyup.prevent.enter="editEvent"
        />
        <q-input
          v-model="eventDescRef"
          class="full-width text-subtitle1"
          outlined
          bottom-slots
          :placeholder="$t('eventDescPlaceholder')"
          :clearable="!eventDescRef || eventDescRef !== oldEventDesc"
          autofocus
          type="text"
          autocomplete="off"
          tabindex="2"
          @clear="restoreEventDesc"
          @keyup.prevent.enter="editEvent"
        />

        <div class="row no-wrap justify-between q-mt-md">
          <q-input
            outlined
            :placeholder="$t('eventDatePlaceholder')"
            :model-value="dateRange.from === dateRange.to ? `${dateRange.from}` : `${dateRange.from} - ${dateRange.to}`"
            :clearable="!dateRange || dateRange !== oldDateRange"
            tabindex="4"
            class="full-width"
            @clear="restoreDateRange"
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
          :label="$t('saveChanges')"
          color="primary"
          no-caps
          size="lg"
          tabindex="5"
          class="g-rounded full-width text-subtitle1"
          @click="editEvent"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { date, QFile, useQuasar } from 'quasar'
import {
  computed, onMounted, ref, PropType,
} from 'vue'
import { logError } from 'src/utils/utils'
import { useEventsStore } from 'src/stores/eventsStore'
import type { Event, UpdateEvent } from 'src/api/generated'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  openModal: Boolean,
  eventId: {
    type: Number,
    default: undefined,
  },
  event: {
    type: Object as PropType<Event>,
    required: true,
  },
})

const emit = defineEmits<{(e: 'close'): void}>()

const $q = useQuasar()
const i18n = useI18n()
const eventsStore = useEventsStore()

const newDateFrom = () => new Date(props.event.start_at * 1000).toLocaleDateString('ru-RU')
const newDateTo = () => new Date((props.event.end_at ? props.event.end_at : props.event.start_at) * 1000).toLocaleDateString('ru-RU')

const id = computed(() => props.eventId)
const eventNameRef = ref(props.event.name)
const oldEventName = ref(props.event.name)
const eventDescRef = ref(props.event.description)
const oldEventDesc = ref(props.event.description)
const dateRange = ref({ from: newDateFrom(), to: newDateTo() })
const oldDateRange = ref({ from: newDateFrom(), to: newDateTo() })

const eventImage = ref<File | null>(null)

const avatarRef = ref<HTMLImageElement>()
const avatarInputRef = ref<QFile>()
const avatarUrl = ref(props.event.image ?? 'https://cdn.quasar.dev/img/boy-avatar.png')

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

const eventNameError = ref(false)

const restoreEventName = (): void => {
  eventNameRef.value = oldEventName.value
}

const restoreEventDesc = (): void => {
  eventDescRef.value = oldEventDesc.value
}

const restoreDateRange = (): void => {
  dateRange.value = oldDateRange.value
}

const editEvent = (): void => {
  eventNameRef.value = eventNameRef.value.trim()
  if (!eventNameRef.value.length) {
    eventNameError.value = true
    return
  }

  const endAt = typeof dateRange.value === 'string' ? undefined : date.extractDate(dateRange.value.to, 'DD.MM.YYYY')
  const startAt = typeof dateRange.value === 'string' ? date.extractDate(dateRange.value, 'DD.MM.YYYY') : date.extractDate(dateRange.value.from, 'DD.MM.YYYY')

  if (eventNameRef.value === oldEventName.value && eventDescRef.value === oldEventDesc.value && eventImage.value === null && dateRange.value === oldDateRange.value) {
    $q.notify({
      icon: 'sym_o_close',
      message: i18n.t('nothingChanged'),
      timeout: 2000,
      position: 'top-right',
      color: 'warning',
    })
  } else {
    const newEvent: UpdateEvent = {
      name: eventNameRef.value,
      description: eventDescRef.value,
      id: props.event.id,
      image: eventImage.value ? eventImage.value : undefined,
      end_at: endAt ? endAt.getTime() / 1000 : endAt,
      start_at: startAt.getTime() / 1000,
    }
    eventsStore.changeEvent(newEvent)
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
