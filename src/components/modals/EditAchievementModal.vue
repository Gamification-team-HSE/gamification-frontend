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

        <template
          v-for="(block, index) in blocks"
          :key="index"
        >
          <div
            v-for="(eventRule, eventRuleIndex) in block.eventsRules"
            :key="eventRuleIndex"
            class="row"
          >
            <q-select
              v-model="eventRule.event_id"
              class="col q-pr-sm text-subtitle1"
              :options="getEventsForBlock(block)"
              label="Событие"
              option-value="id"
              :option-label="(obj) => obj.name ?? eventsStore.events.find(item => item.id === obj)?.name"
            />
            <q-select
              v-model="eventRule.need_participate"
              :options="eventsConditions"
              label="Условие"
              class="col-4  text-subtitle1"
              :option-label="(obj) => obj.label ?? eventsConditions.find(item => item.value === obj)?.label"
            />
            <q-btn
              flat
              icon="sym_o_delete"
              size="md"
              outline
              color="negative"
              class="g-rounded q-ml-xs"
              no-caps
              @click="deleteEvent(index, eventRuleIndex)"
            />
          </div>

          <div
            v-for="(statRule, statRuleIndex) in block.statRules"
            :key="statRuleIndex"
            class="row"
          >
            <q-select
              v-model="statRule.stat_id"
              class="col q-pr-sm  text-subtitle1"
              :options="statsStore.stats"
              label="Показатель"
              option-value="id"
              :option-label="(obj) => obj.name ?? statsStore.stats.find(item => item.id === obj)?.name"
            />
            <q-select
              v-model="statRule.comparison_type"
              class="col-2  text-subtitle1"
              :options="statsConditions"
              label="Условие"
              :option-label="(obj) => obj.label ?? statsConditions.find(item => item.value === obj)?.label"
            />
            <q-input
              v-model.number="statRule.target_value"
              class="col-2 text-center  text-subtitle1"
              hide-bottom-space
            >
              Значение
            </q-input>
            <q-btn
              flat
              icon="sym_o_delete"
              size="md"
              outline
              color="negative"
              class="g-rounded q-ml-xs"
              no-caps
              @click="deleteStat(index, statRuleIndex)"
            />
          </div>

          <template v-if="block.connection_operator === ConnectionOperator.Or && blocks[index+1]">
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
        </template>

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
            v-if="canAddOrCondition"
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
  computed, onMounted, PropType, ref, toRaw,
} from 'vue'
import { logError } from 'src/utils/utils'
import {
  Achievement, ConnectionOperator, InputRuleBlock, RuleBlock, UpdateAchievement,
  Comparison, Event,
} from 'src/api/generated'
import { useAchievementsStore } from 'src/stores/achievementsStore'
import { useEventsStore } from 'src/stores/eventsStore'
import { useStatsStore } from 'src/stores/statsStore'

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
const eventsStore = useEventsStore()
const statsStore = useStatsStore()

const id = computed(() => props.achievementId)

const achievementNameRef = ref(props.achievement.name)
const oldAchievementName = ref(props.achievement.name)
const achievementDescRef = ref(props.achievement.description ?? '')
const oldAchievementDesc = ref(props.achievement.description ?? '')

const eventsConditions = [{
  label: 'Участвовал',
  value: true,
},
{
  label: 'Не участвовал',
  value: false,
}]

const statsConditions = [{
  label: '=',
  value: Comparison.Equals,
},
{
  label: '>',
  value: Comparison.GreaterThan,
},
{
  label: '<',
  value: Comparison.LesserThan,
},
{
  label: '!=',
  value: Comparison.NotEquals,
}]

const blocks = ref<Array<InputRuleBlock>>(props.achievement.rules.blocks)

const getLastBlockOrAddNew = (): RuleBlock => {
  const lastBlock = blocks.value[blocks.value.length - 1]
  if (lastBlock) return lastBlock

  blocks.value.push({
    connection_operator: ConnectionOperator.Or,
    eventsRules: [],
    statRules: [],
  })

  return blocks.value[blocks.value.length - 1] as RuleBlock
}

const getEventsForBlock = (block: RuleBlock): Event[] => eventsStore.events.filter((event) => {
  if (block.eventsRules?.find((item) => event.id === item.event_id)) return false

  return true
})

const addEvent = (): void => {
  const lastBlock = getLastBlockOrAddNew()

  const firstEvent = eventsStore.events[0]
  if (!firstEvent) return

  lastBlock.eventsRules?.push({
    event_id: firstEvent.id,
    need_participate: true,
  })
}

const addStat = (): void => {
  const lastBlock = getLastBlockOrAddNew()

  const firstStat = statsStore.stats[0]
  if (!firstStat) return

  lastBlock.statRules?.push({
    comparison_type: Comparison.GreaterThan,
    stat_id: firstStat.id,
    target_value: 0,
  })
}

const addOr = (): void => {
  blocks.value.push({
    connection_operator: ConnectionOperator.Or,
    eventsRules: [],
    statRules: [],
  })
}

const deleteCondition = (index: number): void => {
  blocks.value[index].connection_operator = ConnectionOperator.And
}

const deleteEvent = (blockIndex: number, eventIndex: number): void => {
  blocks.value[blockIndex].eventsRules?.splice(eventIndex, 1)
}

const deleteStat = (blockIndex: number, statIndex: number): void => {
  blocks.value[blockIndex].statRules?.splice(statIndex, 1)
}

const canAddOrCondition = computed<boolean>(() => {
  if (!blocks.value.length) return false

  const lastBlock = blocks.value[blocks.value.length - 1]
  return Boolean(lastBlock.eventsRules?.length || lastBlock.statRules?.length)
})

const achievementNameError = ref(false)

const image = ref<File | null>(null)

const avatarRef = ref<HTMLImageElement>()
const avatarInputRef = ref<QFile>()
const avatarUrl = ref(props.achievement.image ?? 'https://cdn.quasar.dev/img/boy-avatar.png')

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

const editAchievement = async (): Promise<void> => {
  if (!props.achievementId) return

  achievementDescRef.value = achievementDescRef.value.trim()

  achievementNameRef.value = achievementNameRef.value.trim()
  if (!achievementNameRef.value.length) {
    achievementNameError.value = true
    return
  }

  const newAchievement: UpdateAchievement = {
    name: achievementNameRef.value,
    description: achievementDescRef.value,
    image: image.value ? image.value : undefined,
    id: props.achievement.id,
    rules: {
      blocks: toRaw(blocks.value),
    },
  }

  try {
    await achievementsStore.changeAchievement(newAchievement)
    $q.notify({
      icon: 'sym_o_edit',
      message: 'Success editing',
      timeout: 2000,
      position: 'top-right',
      color: 'primary',
    })
    emit('close')
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  if (!id.value) {
    logError('Edit modal without id')
    emit('close')
  }
})
</script>
