import { defineStore } from 'pinia'
import { NewStat, Stat, UpdateStat } from 'src/api/generated'
import { graphqlSDK } from 'src/boot/grapqhl'

type State = {
  stats: Stat[]
  total: number
}

const defaultState: State = {
  stats: [],
  total: 0,
}

export const useStatsStore = defineStore('stats', {
  state: (): State => ({
    ...defaultState,
  }),
  getters: {
    getById: (state) => (id: number) => state.stats.find((stat) => stat.id === id),

  },
  actions: {
    async load() {
      const response = await graphqlSDK.GetStats()
      this.stats = response.GetStats.stats
      this.total = response.GetStats.total
    },

    async addStat(stat: NewStat) {
      await graphqlSDK.CreateStat({
        stat,
      })

      this.load()
    },

    async deleteStat(statId: Stat['id']) {
      await graphqlSDK.DeleteStat({
        id: statId,
      })

      this.load()
    },

    async changeStat(stat: UpdateStat) {
      await graphqlSDK.UpdateStat({
        stat,
      })

      this.load()
    },
  },
})
