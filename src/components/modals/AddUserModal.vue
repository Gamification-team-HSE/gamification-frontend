<template>
  <q-dialog
    :model-value="props.openCreateUser"
    :full-width="$q.platform.is.mobile"
    :position="$q.platform.is.mobile ? 'bottom' : 'standard'"
    @update:model-value="emit('close')"
  >
    <q-card class="g-rounded">
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
          Добавление пользователя
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
            Для добавления сразу нескольких пользователей
          </q-card-section>
          <q-card-actions>
            <q-btn
              v-close-popup
              flat
              label="Перейти к добавлению из Excel"
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
          <span>Заполните информацию о пользователе</span>
        </div>
        <q-input
          v-model="emailRef"
          outlined
          class="full-width text-subtitle1 q-mb-md"
          bottom-slots
          placeholder="example@mail.com"
          autofocus
          :error-message="$t('loginEmailError')"
          clearable
          type="email"
          inputmode="email"
          autocomplete="off"
          hint="Почту сможет поменять только администратор"
        />
        <q-input
          v-model="nameRef"
          outlined
          class="full-width text-subtitle1"
          bottom-slots
          placeholder="Имя в системе, например - ФИО"
          :error-message="$t('loginEmailError')"
          clearable
          type="text"
          autocomplete="full_name"
          hint="Пользователь сможет поменять позже"
        />
      </q-card-section>

      <q-card-actions class="q-pa-lg">
        <q-btn
          v-close-popup
          label="Добавить пользователя"
          color="primary"
          no-caps
          size="lg"
          class="g-rounded full-width text-subtitle1"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  openCreateUser: Boolean,
})

const emit = defineEmits<{(e: 'close'): void,
  (e: 'openExcel'): void
}>()

const emailRef = ref('')
const nameRef = ref('')
</script>
