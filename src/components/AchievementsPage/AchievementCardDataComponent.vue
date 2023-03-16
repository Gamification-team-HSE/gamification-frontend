<template>
  <div class="row items-center q-gutter-x-md">
    <q-avatar size="5em">
      <img :src="achievement.image ?? 'https://cdn.quasar.dev/img/boy-avatar.png'">
    </q-avatar>
    <div class="column">
      <div class="text-h6">
        {{ achievement.name }}
      </div>
      <div class="text-subtitle1 q-mt-sm">
        {{ achievement.description || $t('noDescription') }}
      </div>
    </div>
  </div>
  <div class="column q-pl-lg q-mt-md">
    <div class="row text-h6 q-mb-sm items-center">
      <q-icon
        name="sym_o_hotel_class"
        class="q-mr-sm"
        size="md"
      />
      <div>{{ $t('howToGet') }}</div>
    </div>

    <div
      v-if="!achievement.rules.blocks.length"
      class=" text-subtitle1"
    >
      {{ $t('unableToGet') }}
    </div>

    <template
      v-for="(block, index) in achievement.rules.blocks"
      :key="index"
    >
      <div
        v-for="(eventRule, eventRuleIndex) in block.eventsRules"
        :key="eventRuleIndex"
        class="row items-center text-subtitle1"
      >
        <strong>{{ eventRule.need_participate ? $t('participated') : $t('notParticipated') }}</strong>
        <span class="q-mx-sm">{{ $t('in') }}</span>
        <strong class="text-primary">{{
          eventsStore.getById(eventRule.event_id)?.name
        }}</strong>
      </div>

      <div
        v-for="(statRule, statRuleIndex) in block.statRules"
        :key="statRuleIndex"
        class="row items-center text-subtitle1"
      >
        <strong class="text-primary">{{
          statsStore.getById(statRule.stat_id)?.name
        }}</strong>
        <span class="q-mx-sm text-h5">{{ conditions[statRule.comparison_type] }}</span>
        <strong>{{ statRule.target_value }}</strong>
      </div>

      <span
        v-if="block.connection_operator === ConnectionOperator.Or && index !== achievement.rules.blocks.length - 1"
        class="text-h5"
      >
        {{ $t('or') }}
      </span>
    </template>
  </div>
</template>

<script setup lang="ts">
import { Achievement, Comparison, ConnectionOperator } from 'src/api/generated'
import { useEventsStore } from 'src/stores/eventsStore'
import { useStatsStore } from 'src/stores/statsStore'
import { PropType } from 'vue'

defineProps({
  achievement: {
    type: Object as PropType<Achievement>,
    required: true,
  },
})

const statsStore = useStatsStore()
const eventsStore = useEventsStore()

const conditions = {
  [Comparison.Equals]: '=',
  [Comparison.GreaterThan]: '>',
  [Comparison.LesserThan]: '<',
  [Comparison.NotEquals]: '!=',
  [Comparison.InvalidComparison]: '~',

}

</script>
