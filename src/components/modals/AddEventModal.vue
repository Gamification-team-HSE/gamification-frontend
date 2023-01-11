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
          bottom-slots
          :placeholder="$t('eventNamePlaceholder')"
          autofocus
          clearable
          :error="eventNameError"
          type="text"
          autocomplete="off"
          tabindex="1"
          @update:model-value="eventNameError = false"
          @keyup.prevent.enter="addEvent"
        />
        <q-input
          v-model="eventDescRef"
          outlined
          class="full-width text-subtitle1"
          bottom-slots
          :placeholder="$t('eventDescPlaceholder')"
          autofocus
          clearable
          :error="eventDescError"
          type="text"
          autocomplete="off"
          tabindex="1"
          @update:model-value="eventDescError = false"
          @keyup.prevent.enter="addEvent"
        />
      </q-card-section>

      <q-card-actions class="q-px-lg q-pb-lg q-pt-none">
        <q-btn
          :label="$t('addEvent')"
          color="primary"
          no-caps
          size="lg"
          tabindex="2"
          class="g-rounded full-width text-subtitle1"
          @click="addEvent"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
import { Role } from 'src/api/generated'
import { graphqlSDK } from 'src/boot/grapqhl'
import { useUserStore } from 'src/stores/userStore'
import { logError, validateEmail } from 'src/utils/utils'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  openCreateEvent: Boolean,
})

const emit = defineEmits<{(e: 'close'): void,
  (e: 'openExcel'): void
}>()

const userStore = useUserStore()
const $q = useQuasar()
const i18n = useI18n()

const eventNameRef = ref('')
const eventDescRef = ref('')

const isAdmin = ref(false)

const eventNameError = ref(false)
const eventDescError = ref(false)

const addEvent = async () => {
  // emailRef.value = emailRef.value.trim()
  // if (!validateEmail(emailRef.value)) {
  //   emailError.value = true
  //   return
  // }

  // const role = userStore.canCreateAdmin && isAdmin.value ? Role.Admin : Role.User

  // nameRef.value = nameRef.value.trim()
  // if (!nameRef.value.length && role !== Role.Admin) {
  //   nameError.value = true
  //   return
  // }

  // try {
  //   await graphqlSDK.CreateUser({
  //     user: {
  //       Name: role === Role.User ? nameRef.value : '',
  //       Role: role,
  //       email: emailRef.value,
  //     },
  //   })

  //   $q.notify({
  //     icon: 'sym_o_person_add',
  //     message: i18n.t('userAdded'),
  //     timeout: 2000,
  //     position: 'top-right',
  //     color: 'primary',
  //   })

  //   emit('close')
  // } catch (error) {
  //   emailError.value = true
  //   logError('Creating user error', (error as any).response)
  // }
}
</script>
