<template>
  <q-dialog
    :model-value="props.openCreateUser"
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
          {{ $t('addUserHeader') }}
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

      <q-card-section class="q-pa-lg column q-gutter-y-md text-subtitle1">
        <q-card
          class="bg-body g-rounded text-secondary q-my-md"
          flat
        >
          <q-card-section class="q-pb-none">
            <q-icon
              name="sym_o_group_add"
              size="sm"
              color="secondary"
              class="q-mr-xs"
            />
            {{ $t('addSeveralUsers') }}
          </q-card-section>
          <q-card-actions>
            <q-btn
              v-close-popup
              flat
              :label="$t('addUserGoToExcelMode')"
              no-caps
              class="g-rounded text-subtitle1 text-bold full-width items-start"
            />
          </q-card-actions>
        </q-card>
        <div class="row no-wrap items-center q-mt-md">
          <q-icon
            name="sym_o_badge"
            class="q-mr-sm"
            size="md"
          />
          <span>{{ $t('fillInfoAboutUser') }}</span>
        </div>
        <q-input
          v-model="emailRef"
          outlined
          class="full-width text-subtitle1 q-mb-md"
          bottom-slots
          placeholder="example@mail.com"
          autofocus
          :error-message="$t('loginEmailError')"
          :error="emailError"
          clearable
          type="email"
          inputmode="email"
          autocomplete="off"
          tabindex="1"
          :hint="$t('onlyAdminCanChangeEmail')"
          @update:model-value="emailError = false"
          @keyup.prevent.enter="addUser"
        />
        <q-input
          v-model="nameRef"
          outlined
          class="full-width text-subtitle1"
          bottom-slots
          :placeholder="isAdmin ? $t('adminWithoutUsername') :$t('usernamePlaceholder')"
          :error-message="$t('itsRequiredField')"
          clearable
          :error="nameError"
          type="text"
          autocomplete="full_name"
          tabindex="2"
          :hint="$t('userCanChangeLater')"
          :disable="isAdmin"
          :readonly="isAdmin"
          @update:model-value="nameError = false"
          @keyup.prevent.enter="addUser"
        />
        <div
          v-if="userStore.canCreateAdmin"
          class="row text-subtitle1"
        >
          <q-checkbox
            v-model="isAdmin"
            :label="$t('giveAdminStatus')"
            @keyup.prevent.enter="addUser"
            @update:model-value="nameError = false && (nameRef = '')"
          >
            <q-tooltip
              class="text-caption"
              max-width="300px"
            >
              {{ $t('adminStatusPlaceholder') }}
            </q-tooltip>
          </q-checkbox>
        </div>
      </q-card-section>

      <q-card-actions class="q-pa-lg">
        <q-btn
          :label="$t('addUser')"
          color="primary"
          no-caps
          size="lg"
          tabindex="3"
          class="g-rounded full-width text-subtitle1"
          @click="addUser"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
import { Role } from 'src/api/generated'
import { graphqlSDK } from 'src/boot/grapqhl'
import { useUsersStore } from 'src/stores/usersStore'
import { useUserStore } from 'src/stores/userStore'
import { logError, validateEmail } from 'src/utils/utils'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  openCreateUser: Boolean,
})

const emit = defineEmits<{(e: 'close'): void,
  (e: 'openExcel'): void
}>()

const userStore = useUserStore()
const usersStore = useUsersStore()

const $q = useQuasar()
const i18n = useI18n()

const emailRef = ref('')
const nameRef = ref('')

const isAdmin = ref(false)

const emailError = ref(false)
const nameError = ref(false)

const addUser = async () => {
  emailRef.value = emailRef.value.trim()
  if (!validateEmail(emailRef.value)) {
    emailError.value = true
    return
  }

  const role = userStore.canCreateAdmin && isAdmin.value ? Role.Admin : Role.User

  nameRef.value = nameRef.value.trim()
  if (!nameRef.value.length && role !== Role.Admin) {
    nameError.value = true
    return
  }

  try {
    await usersStore.createUser({
      name: role === Role.User ? nameRef.value : '',
      role,
      email: emailRef.value,
    })

    $q.notify({
      icon: 'sym_o_person_add',
      message: i18n.t('userAdded'),
      timeout: 2000,
      position: 'top-right',
      color: 'primary',
    })

    emit('close')
  } catch (error) {
    emailError.value = true
    logError('Creating user error', (error as any).response)
  }
}
</script>
