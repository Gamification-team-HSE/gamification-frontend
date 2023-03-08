<template>
  <q-dialog
    :model-value="openModal"
    :full-width="$q.platform.is.mobile"
    :position="$q.platform.is.mobile ? 'bottom' : 'standard'"
    @update:model-value="emit('close')"
  >
    <q-card
      class="g-rounded"
      :style="{'min-width': $q.platform.is.mobile ? 'auto': '500px'}"
    >
      <q-card-section class="row items-center no-wrap q-py-md">
        <q-icon
          name="sym_o_edit"
          size="lg"
          color="primary"
          class="q-mr-xs"
        />
        <div
          class="text-primary"
          :class="$q.platform.is.mobile ? 'text-h6' : 'text-h5'"
        >
          {{ $t('editAchievementHeader') }}
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

      <q-card-section class="q-px-lg q-pt-lg column q-gutter-y-md q-pb-none text-subtitle1">
        <div class="row justify-center">
          <q-avatar
            size="150px"
            class="cursor-pointer"
            @click="avatarInputRef?.pickFiles()"
          >
            <img
              ref="avatarRef"
              :src="avatarUrl"
            >
          </q-avatar>
        </div>
        <q-file
          ref="avatarInputRef"
          v-model="image"
          class=" hidden"
          :label="$t('fileUpload')"
          counter
          outlined
          accept=".jpg, .jpeg, .png, image/*"
          max-files="1"
          dense
          :max-file-size="200000"
          @update:model-value="readBlob"
        >
          <template #prepend>
            <q-icon name="sym_o_attach_file" />
          </template>
        </q-file>
        <q-input
          v-model="achievementNameRef"
          outlined
          class="full-width text-subtitle1"
          bottom-slots
          :placeholder="$t('achievementNamePlaceholder')"
          :hint="$t('itsRequiredField')"
          :error-message="$t('itsRequiredField')"
          :clearable="!achievementNameRef || achievementNameRef !== oldAchievementName"
          :error="achievementNameError"
          autofocus
          clear-icon="sym_o_restart_alt"
          type="text"
          autocomplete="off"
          tabindex="1"
          @update:model-value="achievementNameError = false"
          @clear="restoreAchievementName"
          @keyup.prevent.enter="editAchievement"
        />
        <q-input
          v-model="achievementDescRef"
          outlined
          class="full-width text-subtitle1"
          bottom-slots
          :placeholder="$t('achievementDescPlaceholder')"
          :clearable="!achievementDescRef || achievementDescRef !== oldAchievementDesc"
          autofocus
          type="text"
          autocomplete="off"
          tabindex="2"
          @clear="restoreAchievementDesc"
          @keyup.prevent.enter="editAchievement"
        />
      </q-card-section>

      <q-card-actions class="q-px-lg q-py-lg">
        <q-btn
          :label="$t('saveChanges')"
          color="primary"
          no-caps
          size="lg"
          tabindex="5"
          class="g-rounded full-width text-subtitle1"
          @click="editAchievement"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { QFile, useQuasar } from 'quasar'
import {
  computed, onMounted, PropType, ref,
} from 'vue'
import { logError } from 'src/utils/utils'
import { useAchievementsStore, type Achievement } from 'src/stores/achievementsStore'

const props = defineProps({
  openModal: Boolean,
  achievementId: {
    type: Number, // TODO
    default: undefined,
  },
  achievement: {
    type: Object as PropType<Achievement>,
    required: true,
  },
})

const emit = defineEmits<{(e: 'close'): void,
}>()

const $q = useQuasar()

const achievementsStore = useAchievementsStore()

const id = computed(() => props.achievementId)

const achievementNameRef = ref(props.achievement.name)
const oldAchievementName = ref(props.achievement.name)
const achievementDescRef = ref(props.achievement.description)
const oldAchievementDesc = ref(props.achievement.description)

const achievementNameError = ref(false)

const avatarRef = ref<HTMLImageElement>()
const avatarInputRef = ref<QFile>()
const avatarUrl = ref('')
const image = ref<File | null>(null)

const readBlob = () => {
  if (!image.value) return

  const reader = new FileReader()
  reader.onload = (e) => {
    if (!avatarRef.value || !e.target) return
    avatarRef.value.src = e.target.result as string
  }
  reader.readAsDataURL(image.value)
}

const restoreAchievementName = (): void => {
  achievementNameRef.value = oldAchievementName.value
}

const restoreAchievementDesc = (): void => {
  achievementDescRef.value = oldAchievementDesc.value
}

const editAchievement = (): void => {
  if (!props.achievementId) return

  achievementDescRef.value = achievementDescRef.value.trim()

  achievementNameRef.value = achievementNameRef.value.trim()
  if (!achievementNameRef.value.length) {
    achievementNameError.value = true
    return
  }

  if (achievementNameRef.value === oldAchievementName.value && achievementDescRef.value === oldAchievementDesc.value && !image.value) {
    $q.notify({
      icon: 'sym_o_close',
      message: 'Nothing changed',
      timeout: 2000,
      position: 'top-right',
      color: 'warning',
    })
  } else {
    const newAchievement: Achievement = {
      name: achievementNameRef.value,
      description: achievementDescRef.value,
      imgUrl: 'https://cdn.quasar.dev/img/boy-avatar.png',
      created_at: props.achievement.created_at,
      id: props.achievement.id,
    }
    achievementsStore.changeAchievement(newAchievement)
    emit('close')
    $q.notify({
      icon: 'sym_o_edit',
      message: 'Success editing',
      timeout: 2000,
      position: 'top-right',
      color: 'primary',
    })
  }
  emit('close')
}

onMounted(() => {
  if (!id.value) {
    logError('Edit modal without id')
    emit('close')
  }
})
</script>
