<template>
  <q-card class="g-rounded g-shadow">
    <q-card-section class="text-primary row items-center text-h5  q-pb-none">
      <q-icon
        name="sym_o_group"
        size="lg"
        class=" q-mr-md"
      />
      {{ $t('users') }} - 150
    </q-card-section>
    <q-card-section class=" text-subtitle1">
      {{ $t('adminUsersText', {
        count: '150',
        deleted: '25'
      })
      }}
    </q-card-section>
    <q-card-actions class="row q-gutter-y-sm">
      <q-btn
        no-caps
        color="primary"
        class="g-rounded"
        icon="sym_o_add"
        :label="$t('adminAddUserViaForm')"
        @click="openCreateUser = true"
      />
      <q-btn
        no-caps
        color="primary"
        class="g-rounded"
        icon="sym_o_table"
        outline
        :label="$t('adminAddUserViaExcel')"
        @click="showNotImplemented"
      />
      <q-btn
        no-caps
        color="primary"
        class="g-rounded"
        icon="sym_o_turn_right"
        flat
        :label="$t('adminGoToUsers')"
        :to="{ name: 'admin.users' }"
      />
    </q-card-actions>
  </q-card>

  <q-dialog v-model="openCreateUser">
    <q-card
      class="g-rounded"
    >
      <q-card-section class="row items-center no-wrap">
        <q-icon
          name="sym_o_add"
          size="lg"
          color="primary"
          class="q-mr-xs"
        />
        <div class="text-h5 text-primary">
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

      <q-card-section class="q-pt-none column q-gutter-y-sm text-subtitle1">
        <q-card
          class="bg-body g-rounded text-secondary"
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
        <div class="text-h6 row items-center q-my-md">
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

      <q-card-actions>
        <q-btn
          v-close-popup
          label="Добавить пользователя"
          color="primary"
          no-caps
          class="g-rounded full-width text-subtitle1"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUtils } from './utils'

const { showNotImplemented } = useUtils()

const openCreateUser = ref(false)

const emailRef = ref('')
const nameRef = ref('')
</script>
