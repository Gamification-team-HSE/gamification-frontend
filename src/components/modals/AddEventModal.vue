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
        <div class="row no-wrap items-center q-mt-md">
          <q-icon
            name="sym_o_event"
            class="q-mr-sm"
            size="md"
          />
          <span>{{ $t('fillEventInfo') }}</span>
        </div>
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
            style="max-width: 55%"
            tabindex="4"
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
import { useQuasar } from 'quasar'
import { graphqlSDK } from 'src/boot/grapqhl'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  openCreateEvent: Boolean,
})

const emit = defineEmits<{(e: 'close'): void,
  (e: 'openExcel'): void
}>()

const $q = useQuasar()

const eventNameRef = ref('')
const eventDescRef = ref('')
const eventImage = ref(null)
const dateRange = ref({ from: '2023/01/01', to: '2023/01/05' })

const addEvent = async () => {

  // eventNameRef.value = eventNameRef.value.trim()
  // if (!eventNameRef.value.length) {
  //   eventNameError.value = true
  //   return
  // }

  // try {
  //   await graphqlSDK.CreateEvent({
  //     event: {
  //       Name: eventNameRef.value,
  //       Description: eventDescRef.value,
  //     },
  //   })

  //   $q.notify({
  //     icon: 'sym_o_calendar_add_on',
  //     message: i18n.t('eventAdded'),
  //     timeout: 2000,
  //     position: 'top-right',
  //     color: 'primary',
  //   })

  //   emit('close')
  // } catch (error) {
  //   emailError.value = true
  //   logError('Creating event error', (error as any).response)
  // }
}
</script>
