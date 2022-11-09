<template>
  <q-page class="row items-center justify-evenly">
    <q-input
      v-if="step === 'email'"
      v-model="emailRef"
      borderless
      placeholder="yourmail@corp.com"
      class="text-h4"
      :hint="isEmailEmpty ? '' : 'Press Enter to try login'"
      type="email"
      autofocus
      no-error-icon
      error-message="Invalid email, please try again"
      :error="isError"
      @update:model-value="isError = false"
      @keyup.prevent.enter="trySubmitEmail"
    />
    <q-input
      v-else-if="step === 'code'"
      v-model.number="codeRef"
      borderless
      placeholder="7777"
      class="text-h4"
      hint="Enter code from email"
      mask="####"
      autofocus
      no-error-icon
      error-message="Wrong code, please try again"
      :error="isError"
      @update:model-value="trySubmitCode"
    />
    <q-spinner
      v-else-if="step === 'loading'"
      size="8em"
      :thickness="2"
    />
  </q-page>
</template>

<script setup lang="ts">
import { useUserStore } from 'src/stores/user-store'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

type Step = 'email' | 'code' | 'loading'
const step = ref<Step>('email')

const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/

const emailRef = ref('')
const isEmailEmpty = computed(() => !emailRef.value.trim().length)

const codeRef = ref('')

const isError = ref(false)

const trySubmitEmail = (): void => {
  const email = emailRef.value.trim()
  if (!emailPattern.test(email)) {
    isError.value = true
    return
  }

  if (email !== 'sh@gmail.com') {
    isError.value = true
    return
  }

  step.value = 'loading'

  setTimeout(() => {
    step.value = 'code'
  }, 300)
}

const trySubmitCode = (): void => {
  isError.value = false

  if (codeRef.value.toString().length < 4) return

  setTimeout(() => {
    step.value = 'loading'

    setTimeout(() => {
      if (codeRef.value.toString() !== '6666') {
        step.value = 'code'
        codeRef.value = ''
        isError.value = true
        return
      }

      userStore.setAuth('refresh', 'access')

      router.push({ name: 'main' })
    }, 300)
  }, 150)
}
</script>
