import { defineStore } from 'pinia'
import { Achievement } from 'src/api/generated'

// type Uuid = string
// type ID = string

// export type ConditionEvent = {
//   id: Uuid,
//   type: 'event',
//   value: ID | null,
//   char: '=' | '!=' | null
// }

// export type ConditionStats = {
//   id: Uuid,
//   type: 'stats',
//   value: ID | null,
//   char: '=' | '>' | '<' | '!=' | null,
//   number: number
// }

// export type ConditionOr = {
//   id: Uuid,
//   type: 'or',
// }

// export type Condition = ConditionEvent | ConditionStats | ConditionOr

// export type Achievement = {
//   name: string,
//   description: string | null,
//   imgUrl: string,
//   created_at: number,
//   id: number,
//   conditions: Condition[]
// }

type State = {
  achievements: Achievement[]
  total: number
}

const defaultState: State = {
  achievements: [],
  total: 0,
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
