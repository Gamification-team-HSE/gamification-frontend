import { defineStore } from 'pinia'

type Uuid = string
type ID = string

export type ConditionEvent = {
  id: Uuid,
  type: 'event',
  value: ID | null,
  char: '=' | '!=' | null
}

export type ConditionStats = {
  id: Uuid,
  type: 'stats',
  value: ID | null,
  char: '=' | '>' | '<' | '!=' | null,
  number: number
}

export type ConditionOr = {
  id: Uuid,
  type: 'or',
}

export type Condition = ConditionEvent | ConditionStats | ConditionOr

export type Achievement = {
  name: string,
  description: string | null,
  imgUrl: string,
  created_at: number,
  id: number,
  conditions: Condition[]
}

const example1: Achievement = {
  name: 'Самый продуктивный программист',
  description: 'Закрыть 10 задач за одну неделю',
  imgUrl: 'https://cdn.quasar.dev/img/boy-avatar.png',
  created_at: Date.now(),
  id: 1,
  conditions: [
    {
      id: Math.random().toString(),
      type: 'event',
      char: '=',
      value: 'Событие 1',
    },
    {
      id: Math.random().toString(),
      type: 'or',
    },
    {
      id: Math.random().toString(),
      type: 'event',
      char: '=',
      value: 'Событие 2',
    },
  ],
}

const example2: Achievement = {
  name: 'Достижение2',
  description: 'Описание достижения',
  imgUrl: 'https://cdn.quasar.dev/img/boy-avatar.png',
  created_at: Date.now(),
  id: 2,
  conditions: [
    {
      id: Math.random().toString(),
      type: 'stats',
      char: '>',
      value: 'Показатель 1',
      number: 5,
    },
  ],
}

type State = {
  achievements: Achievement[]
}

const defaultState: State = {
  achievements: [example1, example2],
}

export const useAchievementsStore = defineStore('achievements', {
  state: (): State => ({
    ...defaultState,
  }),
  getters: {

  },
  actions: {
    deleteAchievement(achievementId: Achievement['id']) {
      this.achievements = this.achievements.filter((a) => a.id !== achievementId)
    },

    changeAchievement(newAchievement: Achievement) {
      const oldAchievement = this.achievements.find(({ id }) => id === newAchievement.id)
      if (oldAchievement !== undefined) {
        const oldEventIndex = this.achievements.indexOf(oldAchievement)
        this.achievements[oldEventIndex] = newAchievement
      }
    },
  },
})
