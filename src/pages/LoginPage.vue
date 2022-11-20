<template>
  <q-page class="row items-center justify-evenly bg-body">
    <EmailStepComponent
      v-if="!isCodeStep"
      @next="goToCode"
    />
    <CodeStepComponent
      v-else
      :email="email"
      @back="isCodeStep = false"
    />
  </q-page>
</template>

<script setup lang="ts">
import CodeStepComponent from 'src/components/LoginPage/CodeStepComponent.vue'
import EmailStepComponent from 'src/components/LoginPage/EmailStepComponent.vue'
import { ref } from 'vue'

const isCodeStep = ref(false)
const email = ref('')

const goToCode = (emailFromEvent: string) => {
  isCodeStep.value = true
  email.value = emailFromEvent
}
</script>
