<template>
  <q-card
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
        />{{ props.email }}
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
            {{ $t('loginCodeResended') }}
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
        @click="emit('back')"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { graphqlSDK } from 'src/boot/grapqhl'
import { useUserStore } from 'src/stores/userStore'
import { ref } from 'vue'

const emit = defineEmits<{(e: 'back'): void,
}>()

const props = defineProps({
  email: {
    type: String,
    required: true,
  },
})

const userStore = useUserStore()

const codeRef = ref<number>()
const isLoading = ref(false)
const isResending = ref(false)
const wasResended = ref(false)
const isError = ref(false)

const sendCodeAgain = async () => {
  isResending.value = true
  codeRef.value = undefined
  isError.value = false

  await graphqlSDK.SendCode({
    email: props.email,
  })

  isResending.value = false
  wasResended.value = true
}

const tryLogin = async () => {
  isError.value = false

  if (!codeRef.value || codeRef.value.toString().length < 4) return

  isLoading.value = true

  try {
    const res = await graphqlSDK.VerifyCode({
      email: props.email,
      code: codeRef.value,
    })

    await userStore.setAuth(res.VerifyCode, props.email)
    userStore.pushToProfile()
  } catch (error) {
    isLoading.value = false
    isError.value = true
  }
}
</script>
