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
          <q-file
            v-model="eventImage"
            :label="$t('fileUpload')"
            class="self-start"
            counter
            outlined
            tabindex="3"
            accept=".jpg, .pdf, image/*"
            max-files="1"
            style="max-width: 43%"
          >
            <template #prepend>
              <q-icon name="sym_o_attach_file" />
            </template>
          </q-file>

          <q-input
            outlined
            :placeholder="$t('eventDatePlaceholder')"
            :model-value="`${dateRange.from}` == `${dateRange.to}` ? `${dateRange}` : `${dateRange.from} - ${dateRange.to}`"
            :clearable="!dateRange || dateRange !== oldDateRange"
            style="max-width: 55%"
            tabindex="4"
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
import { useQuasar } from 'quasar'
import {
  computed, onMounted, ref, PropType,
} from 'vue'
import { logError } from 'src/utils/utils'

type Event = {
  name: string,
  description: string,
  imgUrl: string,
  dateRange: { from: number, to: number },
  created_at: number,
  id: number,
}

const props = defineProps({
  openModal: Boolean,
  eventId: {
    type: Number, // TODO
    default: undefined,
  },
  event: {
    type: Object as PropType<Event>,
    required: true,
  },
})

const emit = defineEmits<{(e: 'close'): void,
  (e: 'changeEvent', value: Event): void,
}>()

const $q = useQuasar()

const id = computed(() => props.eventId)
const eventNameRef = ref(props.event.name)
const oldEventName = ref(props.event.name)
const eventDescRef = ref(props.event.description)
const oldEventDesc = ref(props.event.description)
const eventImage = ref(null)
const oldEventImage = ref(null)
const dateRange = ref({ from: new Date(props.event.dateRange.from).toLocaleDateString('ru-RU'), to: new Date(props.event.dateRange.to).toLocaleDateString('ru-RU') })
const oldDateRange = ref({ from: new Date(props.event.dateRange.from).toLocaleDateString('ru-RU'), to: new Date(props.event.dateRange.to).toLocaleDateString('ru-RU') })

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

  if (eventNameRef.value === oldEventName.value && eventDescRef.value === oldEventDesc.value && eventImage.value === oldEventImage.value && dateRange.value === oldDateRange.value) {
    $q.notify({
      icon: 'sym_o_close',
      message: 'Nothing changed',
      timeout: 2000,
      position: 'top-right',
      color: 'warning',
    })
  } else {
    const newEvent: Event = {
      name: eventNameRef.value,
      description: eventDescRef.value,
      imgUrl: 'https://cdn.quasar.dev/img/boy-avatar.png',
      dateRange: { from: Date.parse(dateRange.value.from), to: Date.parse(dateRange.value.to) },
      created_at: props.event.created_at,
      id: props.event.id,
    }
    emit('changeEvent', newEvent)
    emit('close')
    $q.notify({
      icon: 'sym_o_edit',
      message: 'Success editing',
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
