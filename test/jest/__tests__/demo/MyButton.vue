<script lang="ts" src="./MyButton.ts"></script>

<template>
  <div>
    <p class="content">
      {{ input }}
    </p>
    <span>{{ counter }}</span>
    <q-btn
      class="button"
      @click="increment()"
    />
  </div>
</template>
