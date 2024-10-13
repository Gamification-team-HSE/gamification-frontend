<template>
  <q-card
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
        data-cy="email-input"
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
        data-cy="email-btn"
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

  <AccountNotExistsFAQModal
    :user-not-exist-dialog="userNotExistDialog"
    @close="userNotExistDialog = false"
  />
</template>

<script setup lang="ts">
import { graphqlSDK } from 'src/boot/grapqhl'
import AccountNotExistsFAQModal from 'src/components/modals/AccountNotExistsFAQModal.vue'
import { validateEmail } from 'src/utils/utils'
import { ref } from 'vue'

const emit = defineEmits<{(e: 'next', email: string): void,
}>()

const userNotExistDialog = ref(false)
const emailRef = ref('')
const isLoading = ref(false)
const isError = ref(false)

const trySendCode = async () => {
  isLoading.value = true
  emailRef.value = emailRef.value.trim()

  if (!validateEmail(emailRef.value)) {
    isError.value = true
    isLoading.value = false
    return
  }

  try {
    await graphqlSDK.SendCode({
      email: emailRef.value,
    })

    emit('next', emailRef.value)
  } catch (error) {
    isError.value = true
    isLoading.value = false
  }
}
</script>
