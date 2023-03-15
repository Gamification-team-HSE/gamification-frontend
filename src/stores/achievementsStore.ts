import { defineStore } from 'pinia'
import { Achievement, CreateAchievement, UpdateAchievement } from 'src/api/generated'
import { graphqlSDK } from 'src/boot/grapqhl'

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
    async load() {
      const response = await graphqlSDK.GetAchievements()
      this.achievements = (response.GetAchievements?.achievements ?? []) as Achievement[]
      this.total = response.GetAchievements?.total ?? 0
    },

    async addAchievement(achievement: CreateAchievement) {
      await graphqlSDK.CreateAchievement({
        achievement,
      })

      this.load()
    },

    async deleteAchievement(id: Achievement['id']) {
      await graphqlSDK.DeleteAchievement({
        id,
      })

      this.load()
    },

    async changeAchievement(achievement: UpdateAchievement) {
      await graphqlSDK.UpdateAchievement({
        achievement,
      })

      this.load()
    },

  },
})
