<template>
  <q-dialog
    :model-value="props.userNotExistDialog"
    @update:model-value="emit('close')"
  >
    <q-card class="g-rounded">
      <q-card-section class="row items-center no-wrap">
        <div class="text-h5 text-primary">
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

      <q-separator />

      <q-card-section class="text-subtitle1">
        {{ $t('loginDialogBody') }}
      </q-card-section>

      <q-card-actions align="center">
        <q-btn
          v-close-popup
          outline
          :label="$t('loginDialogBtn')"
          color="primary"
          no-caps
          autofocus
          class="full-width g-rounded text-subtitle1"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
const props = defineProps({
  userNotExistDialog: Boolean,
})

const emit = defineEmits<{(e: 'close'): void,
}>()
</script>
