import { defineStore } from 'pinia'
import { NewStat, Stat, UpdateStat } from 'src/api/generated'
import { graphqlSDK } from 'src/boot/grapqhl'

const example: Stat = {
  __typename: 'Stat',
  created_at: Date.now() - 1000,
  description: 'Пользователь должен заходить в систему каждый день в течение 30 дней',
  name: 'Заход в систему каждый день в месяце',
  period: '30d',
  seq_period: '1d',
  start_at: Date.now(),
  id: 1,
}

const example2: Stat = {
  __typename: 'Stat',
  created_at: Date.now(),
  description: 'Показатель сотрудников по созданию новых задач',
  name: 'Создание задачи каждый день',
  period: '',
  seq_period: '1d',
  start_at: 0,
  id: 2,
}

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
