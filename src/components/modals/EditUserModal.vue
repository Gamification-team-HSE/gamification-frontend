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
          {{ $t('editUserHeader') }}
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
          v-model="image"
          class=" hidden"
          :label="$t('fileUpload')"
          counter
          outlined
          accept=".jpg, .jpeg, .png, image/*"
          max-files="1"
          dense
          :disable="isLoading"
          :readonly="isLoading"
          :max-file-size="200000"
          @update:model-value="readBlob"
        >
          <template #prepend>
            <q-icon name="sym_o_attach_file" />
          </template>
        </q-file>

        <q-input
          v-model="nameRef"
          outlined
          class="full-width text-subtitle1"
          bottom-slots
          :placeholder="$t('usernamePlaceholder')"
          :hint="$t('itsRequiredField')"
          :error-message="$t('itsRequiredField')"
          :clearable="!nameRef || nameRef !== oldName"
          :error="nameError"
          type="text"
          autocomplete="full_name"
          autofocus
          tabindex="1"
          clear-icon="sym_o_restart_alt"
          :loading="isLoading"
          @update:model-value="nameError = false"
          @clear="restoreName"
          @keyup.prevent.enter="editUser"
        />
        <q-input
          v-if="userStore.isAdmin"
          v-model="emailRef"
          outlined
          class="full-width text-subtitle1"
          bottom-slots
          placeholder="example@mail.com"
          :error-message="$t('loginEmailError')"
          :error="emailError"
          :clearable="!emailRef || emailRef !== oldEmail"
          clear-icon="sym_o_restart_alt"
          type="email"
          inputmode="email"
          autocomplete="off"
          tabindex="2"
          :hint="$t('onlyAdminCanChangeEmail')"
          :readonly="!userStore.isAdmin"
          :disable="!userStore.isAdmin"
          :loading="isLoading"
          @update:model-value="emailError = false"
          @clear="restoreEmail"
          @keyup.prevent.enter="editUser"
        />
      </q-card-section>
      <q-card-actions class="q-pa-lg">
        <q-btn
          :label="$t('saveChanges')"
          color="primary"
          no-caps
          size="lg"
          tabindex="3"
          :loading="isLoading"
          class="g-rounded full-width text-subtitle1"
          @click="editUser"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { QFile, QInput, useQuasar } from 'quasar'
import { User } from 'src/api/generated'
import { graphqlSDK } from 'src/boot/grapqhl'
import { useUsersStore } from 'src/stores/usersStore'
import { useUserStore } from 'src/stores/userStore'
import { logError, validateEmail } from 'src/utils/utils'
import {
  computed, onMounted, PropType, ref,
} from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  openModal: Boolean,
  userId: {
    type: Number as PropType<User['id']> | undefined,
    default: undefined,
  },
})

const emit = defineEmits<{(e: 'close'): void,
}>()

const userStore = useUserStore()
const usersStore = useUsersStore()
const $q = useQuasar()
const i18n = useI18n()

const avatarRef = ref<HTMLImageElement>()
const avatarInputRef = ref<QFile>()

const id = computed(() => props.userId ?? userStore.id)

const isLoading = ref(true)
// const isMe = computed(() => userStore.id === id.value)

const oldName = ref('')
const oldEmail = ref('')

const nameRef = ref('')
const emailRef = ref('')

const nameError = ref(false)
const emailError = ref(false)

const avatarUrl = ref('')
const image = ref<File | null>(null)

const readBlob = () => {
  if (!image.value) return

  const reader = new FileReader()
  reader.onload = (e) => {
    if (!avatarRef.value || !e.target) return
    avatarRef.value.src = e.target.result as string
  }
  reader.readAsDataURL(image.value)
}

const restoreEmail = (): void => {
  emailRef.value = oldEmail.value
}

const restoreName = (): void => {
  nameRef.value = oldName.value
}

const editUser = async (): Promise<void> => {
  if (!props.userId) return

  isLoading.value = true

  emailRef.value = emailRef.value.trim()
  if (!validateEmail(emailRef.value)) {
    emailError.value = true
    isLoading.value = false
    return
  }

  nameRef.value = nameRef.value.trim()
  if (!nameRef.value.length) {
    nameError.value = true
    isLoading.value = false
    return
  }

  if (nameRef.value === oldName.value && emailRef.value === oldEmail.value && !image.value) {
    $q.notify({
      icon: 'sym_o_close',
      message: i18n.t('nothingChanged'),
      timeout: 2000,
      position: 'top-right',
      color: 'warning',
    })
  } else {
    await usersStore.updateUser({
      id: props.userId,
      email: emailRef.value,
      name: nameRef.value,
      avatar: image.value,
    })

    $q.notify({
      icon: 'sym_o_edit',
      message: i18n.t('edited'),
      timeout: 2000,
      position: 'top-right',
      color: 'primary',
    })
  }

  isLoading.value = false
  emit('close')
}

onMounted(() => {
  if (!id.value) {
    logError('Edit modal without id')
    emit('close')
    return
  }

  graphqlSDK.GetUser({ id: id.value }).then((res) => {
    nameRef.value = res.GetUser.name ?? ''
    emailRef.value = res.GetUser.email

    oldEmail.value = res.GetUser.email
    oldName.value = res.GetUser.name ?? ''

    avatarUrl.value = res.GetUser.avatar ?? 'https://cdn.quasar.dev/img/boy-avatar.png'

    isLoading.value = false
  }).catch((error) => {
    logError(error)
    emit('close')
  })
})

</script>
