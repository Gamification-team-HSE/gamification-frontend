<template>
  <q-page class="row items-center justify-evenly bg-body">
    <q-card
      v-if="!isCodeStep"
      class="g-rounded g-shadow q-pa-md"
      style="width: 430px"
    >
      <q-card-section>
        <div class="text-h4">
          {{ $t('loginIntoSystemHeader') }}
        </div>
        <div class="text-subtitle1 text-secondary q-mt-sm">
          {{ $t('loginEmailLabel') }}
        </div>
      </q-card-section>
      <q-card-section>
        <q-input
          v-model="emailRef"
          outlined
          class="full-width text-subtitle1"
          bottom-slots
          placeholder="example@mail.com"
          autofocus
          :error="isError"
          clearable
          :readonly="isLoading"
          @keyup.prevent.enter="trySendCode"
          @update:model-value="isError = false"
        >
          <template #error>
            <div class="row items-center text-subtitle2">
              {{ $t('loginEmailError') }}
            </div>
          </template>
        </q-input>
      </q-card-section>
      <q-card-actions class="text-h2 justify-center q-gutter-y-sm">
        <q-btn
          class="full-width g-rounded"
          size="lg"
          color="primary"
          padding="sm xl"
          no-caps
          :loading="isLoading"
          :disable="isError"
          :label="$t('loginSendCode')"
          @click="trySendCode"
        />
        <q-btn
          flat
          no-caps
          class="g-rounded"
          color="secondary"
          :label="$t('loginUserNotExists')"
          @click="userNotExistDialog = true"
        />
      </q-card-actions>
    </q-card>
    <q-card
      v-else
      class="g-rounded g-shadow q-pa-md"
      style="width: 430px"
    >
      <q-card-section>
        <div class="text-h4">
          {{ $t('loginInputCode') }}
        </div>
        <div class="text-subtitle1 text-secondary q-mt-sm">
          <q-icon
            name="sym_o_alternate_email"
            color="secondary"
            size="sm"
            class="q-mr-sm"
          />{{ emailRef }}
        </div>
      </q-card-section>
      <q-card-section>
        <q-input
          v-model.number="codeRef"
          outlined
          class="full-width text-subtitle1"
          bottom-slots
          placeholder="0000"
          mask="####"
          autofocus
          :error="isError"
          :readonly="isLoading"
          clearable
          @keyup.prevent.enter="tryLogin"
          @update:model-value="tryLogin"
        >
          <template #hint>
            <q-btn
              v-if="!codeRef"
              flat
              rounded
              color="primary"
              dense
              padding="none sm"
              no-caps
              :disable="isLoading"
              :label="$t('loginResendCode')"
              @click="sendCodeAgain"
            />
          </template>
          <template #error>
            <div class="row items-center text-subtitle2">
              {{ $t('loginIncorrectCode') }}
            </div>
          </template>
        </q-input>
      </q-card-section>
      <q-card-actions class="text-h2 justify-center q-gutter-y-sm">
        <q-btn
          class="full-width g-rounded"
          size="lg"
          color="primary"
          padding="sm xl"
          no-caps
          :loading="isLoading"
          :disable="isError"
          :label="$t('loginIntoSystemBtn')"
          @click="tryLogin"
        />
        <q-btn
          flat
          no-caps
          class="g-rounded"
          color="secondary"
          :label="$t('loginChangeEmail')"
          @click="backToEmail"
        />
      </q-card-actions>
    </q-card>

    <q-dialog v-model="userNotExistDialog">
      <q-card class="g-rounded">
        <q-card-section class="row items-center">
          <div class="text-h5">
            {{ $t('loginDialogHeader') }}
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

        <q-card-section class="q-pt-none text-subtitle1">
          {{ $t('loginDialogBody') }}
        </q-card-section>

        <q-card-actions align="center">
          <q-btn
            v-close-popup
            flat
            :label="$t('loginDialogBtn')"
            color="primary"
            class="full-width g-rounded"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { useUserStore } from 'src/stores/user-store'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/

const isCodeStep = ref(false)

const userNotExistDialog = ref(false)

const isLoading = ref(false)
const isError = ref(false)

const emailRef = ref('')
const codeRef = ref<number>()

const trySendCode = () => {
  isLoading.value = true

  const email = emailRef.value.trim()
  if (!emailPattern.test(email)) {
    isError.value = true
    isLoading.value = false
    return
  }

  setTimeout(() => {
    isLoading.value = false

    if (email !== 'sh@gmail.com') {
      isError.value = true
      return
    }

    isCodeStep.value = true
  }, 300)
}

const sendCodeAgain = () => {
  codeRef.value = undefined
  isError.value = false
}

const backToEmail = () => {
  codeRef.value = undefined
  emailRef.value = ''
  isError.value = false
  isCodeStep.value = false
}

const tryLogin = () => {
  isError.value = false

  if (!codeRef.value || codeRef.value.toString().length < 4) return

  isLoading.value = true

  setTimeout(() => {
    if (codeRef.value?.toString() !== '6666') {
      isLoading.value = false
      isError.value = true
      return
    }

    userStore.setAuth('refresh', 'access')

    router.push({ name: 'main' })
  }, 300)
}
</script>
