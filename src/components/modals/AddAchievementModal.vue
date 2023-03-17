<template>
  <q-dialog
    :model-value="props.isOpen"
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
          name="sym_o_add"
          size="lg"
          color="primary"
          class="q-mr-xs"
        />
        <div
          class="text-primary"
          :class="$q.platform.is.mobile ? 'text-h6' : 'text-h5'"
        >
          {{ $t('addAchievementHeader') }}
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
        <div class="row no-wrap text-subtitle1 items-center q-mt-md">
          <q-icon
            name="sym_o_hotel_class"
            class="q-mr-sm"
            size="md"
          />
          <span>{{ $t('fillAchievementInfo') }}</span>
        </div>
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
          :placeholder="$t('achievementNamePlaceholder')"
          autofocus
          clearable
          type="text"
          autocomplete="off"
          tabindex="1"
          @keyup.prevent.enter="addAchievement"
        />
        <q-input
          v-model="achievementDescRef"
          outlined
          class="full-width text-subtitle1"
          :placeholder="$t('achievementDescPlaceholder')"
          autofocus
          clearable
          type="text"
          autocomplete="off"
          tabindex="2"
          @keyup.prevent.enter="addAchievement"
        />
      </q-card-section>

      <q-card-actions class="q-px-lg q-py-lg">
        <q-btn
          :label="$t('addAchievement')"
          color="primary"
          no-caps
          size="lg"
          tabindex="5"
          class="g-rounded full-width text-subtitle1"
          @click="addAchievement"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { QFile, useQuasar } from 'quasar'
import { useAchievementsStore } from 'src/stores/achievementsStore'
import { ref } from 'vue'

const props = defineProps({
  isOpen: Boolean,
})

const emit = defineEmits<{(e: 'close'): void,
}>()

const $q = useQuasar()
const achievementsStore = useAchievementsStore()

const achievementNameRef = ref('')
const achievementDescRef = ref('')

const avatarRef = ref<HTMLImageElement>()
const avatarInputRef = ref<QFile>()
const avatarUrl = ref('https://cdn-icons-png.flaticon.com/512/5968/5968923.png')
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

const addAchievement = (): void => {
  try {
    achievementsStore.addAchievement({
      image: image.value ? image.value : undefined,
      name: achievementNameRef.value,
      description: achievementDescRef.value,
      rules: {
        blocks: [],
      },
    })

    emit('close')
  } catch (error) {
    console.error(error)
  }
}
</script>
