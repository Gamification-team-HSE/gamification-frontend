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
          :error-message="$t('loginEmailError')"
          clearable
          type="email"
          inputmode="email"
          autocomplete="email"
          :readonly="isLoading"
          @keyup.prevent.enter="trySendCode"
          @update:model-value="isError = false"
        >
          <template #prepend>
            <q-icon
              size="xs"
              name="sym_o_alternate_email"
            />
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
          inputmode="numeric"
          autocomplete="off"
          :error="isError"
          :error-message="$t('loginIncorrectCode')"
          :readonly="isLoading"
          clearable
          @keyup.prevent.enter="tryLogin"
          @update:model-value="tryLogin"
        >
          <template
            v-if="!codeRef"
            #hint
          >
            <q-btn
              v-if="!wasResended"
              flat
              rounded
              color="primary"
              dense
              padding="none sm"
              no-caps
              :disable="isLoading"
              :loading="isResending"
              :label="$t('loginResendCode')"
              @click="sendCodeAgain"
            />
            <div v-else>
              Код отправлен повторно
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

    <AccountNotExistsFAQModal
      :user-not-exist-dialog="userNotExistDialog"
      @close="userNotExistDialog = false"
    />
  </q-page>
</template>

<script setup lang="ts">
import AccountNotExistsFAQModal from 'src/components/modals/AccountNotExistsFAQModal.vue'
import { useUserStore } from 'src/stores/user-store'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/

const isCodeStep = ref(false)

const userNotExistDialog = ref(false)

const isLoading = ref(false)
const isResending = ref(false)
const wasResended = ref(false)
const isError = ref(false)

const emailRef = ref('')
const codeRef = ref<number>()

const adminEmail = 'admin@mail.com'
const userEmail = 'user@mail.com'
const code = '6666'

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

    if (email !== userEmail && email !== adminEmail) {
      isError.value = true
      return
    }

    isCodeStep.value = true
  }, 300)
}

const sendCodeAgain = () => {
  isResending.value = true
  codeRef.value = undefined
  isError.value = false

  setTimeout(() => {
    isResending.value = false
    wasResended.value = true
  }, 300)
}

const backToEmail = () => {
  codeRef.value = undefined
  isError.value = false
  isCodeStep.value = false
}

const tryLogin = () => {
  isError.value = false

  if (!codeRef.value || codeRef.value.toString().length < 4) return

  isLoading.value = true

  setTimeout(() => {
    if (codeRef.value?.toString() !== code) {
      isLoading.value = false
      isError.value = true
      return
    }

    userStore.setAuth('refresh', 'access', emailRef.value === adminEmail)

    router.push({ name: 'main' })
  }, 300)
}
</script>
