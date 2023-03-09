<template>
  <q-dialog
    :model-value="openModal"
    :full-width="$q.platform.is.mobile"
    :position="$q.platform.is.mobile ? 'bottom' : 'standard'"
    @update:model-value="emit('close')"
  >
    <q-card
      class="g-rounded"
      :style="{'min-width': $q.platform.is.mobile ? 'auto': '700px'}"
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

      <q-card-section class="q-mt-none q-pt-none column q-gutter-y-md text-subtitle1">
        <div class="text-h6">
          Условия получения:
        </div>

        <div
          v-for="(condition, index) in conditions"
          :key="condition.value.id"
          class="row"
        >
          <template v-if="condition.value.type === 'event'">
            <q-select
              v-model="condition.value.value"
              class="col q-pr-sm  text-subtitle1"
              :options="events"
              label="Событие"
            />
            <q-select
              v-model="condition.value.char"
              :options="eventsConditions"
              label="Условие"
              class="col-4  text-subtitle1"
            />
          </template>
          <template v-else-if="condition.value.type==='stats'">
            <q-select
              v-model="condition.value.value"
              class="col q-pr-sm  text-subtitle1"
              :options="stats"
              label="Показатель"
            />
            <q-select
              v-model="condition.value.char"
              class="col-2  text-subtitle1"
              :options="statsConditions"
              label="Условие"
            />
            <q-input
              v-model.number="condition.value.number"
              class="col-2 text-center  text-subtitle1"
              hide-bottom-space
            >
              Значение
            </q-input>
          </template>
          <template v-else>
            <q-btn
              size="md"
              outline
              color="primary"
              class="g-rounded  text-subtitle1 full-width"
              no-caps
              @click="deleteCondition(index)"
            >
              <strong class="q-mr-xs">ИЛИ</strong><span>(нажмите, чтобы убрать)</span>
            </q-btn>
          </template>

          <q-btn
            v-if="condition.value.type !=='or'"
            flat
            icon="sym_o_delete"
            size="md"
            outline
            color="negative"
            class="g-rounded q-ml-xs"
            no-caps
            @click="deleteCondition(index)"
          />
        </div>

        <div class="row q-gutter-x-md items-center justify-center">
          <q-btn
            class="g-rounded col-3 text-subtitle1"
            color="primary"
            icon="sym_o_add"
            no-caps
            flat
            dense
            @click="addStat"
          >
            Показатель
          </q-btn>
          <q-btn
            class="g-rounded col-3 text-subtitle1"
            color="primary"
            icon="sym_o_add"
            no-caps
            flat
            dense
            @click="addEvent"
          >
            Событие
          </q-btn>
          <q-btn
            class="g-rounded col-3 text-subtitle1"
            color="primary"
            icon="sym_o_add"
            no-caps
            flat
            dense
            @click="addOr"
          >
            <span>Добавить</span><strong class="q-ml-xs">ИЛИ</strong>
          </q-btn>
        </div>
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
  computed, onMounted, PropType, reactive, Ref, ref,
} from 'vue'
import { logError } from 'src/utils/utils'
import {
  Condition, ConditionEvent, ConditionOr, ConditionStats, useAchievementsStore, type Achievement,
} from 'src/stores/achievementsStore'

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
const achievementDescRef = ref(props.achievement.description ?? '')
const oldAchievementDesc = ref(props.achievement.description ?? '')

const events = [{
  label: 'Событие 1',
  value: Math.random().toString(),
}]

const eventsConditions = [{
  label: 'Участвовал',
  value: '=',
},
{
  label: 'Не участвовал',
  value: '!=',
}]

const stats = [{
  label: 'Показатель 1',
  value: Math.random().toString(),
}]

const statsConditions = ['=', '>', '<', '!=']

const conditions = ref<Array<Ref<Condition>>>([])

const addEvent = (): void => {
  const condition = ref<ConditionEvent>({
    id: Math.random().toString(),
    type: 'event',
    value: null,
    char: null,
  })

  conditions.value.push(condition)
}

const addStat = (): void => {
  const condition = ref<ConditionStats>({
    id: Math.random().toString(),
    type: 'stats',
    value: null,
    char: '>',
    number: 0,
  })

  conditions.value.push(condition)
}

const addOr = (): void => {
  const condition = ref<ConditionOr>({
    id: Math.random().toString(),
    type: 'or',
  })

  conditions.value.push(condition)
}

const deleteCondition = (index: number): void => {
  conditions.value.splice(index, 1)
}

const achievementNameError = ref(false)

const avatarRef = ref<HTMLImageElement>()
const avatarInputRef = ref<QFile>()
const avatarUrl = ref('https://cdn.quasar.dev/img/boy-avatar.png')
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
      conditions: [],
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
