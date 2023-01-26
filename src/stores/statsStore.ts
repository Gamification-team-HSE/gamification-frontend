import { defineStore } from 'pinia'
import { Stat } from 'src/api/generated'

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
}

const defaultState: State = {
  stats: [example, example2],
}

export const useStatsStore = defineStore('stats', {
  state: (): State => ({
    ...defaultState,
  }),
  getters: {

  },
  actions: {
    deleteStat(statId: Stat['id']) {
      this.stats = this.stats.filter((stat) => stat.id !== statId)
    },

    changeStat(newStat: Stat) {
      const oldStat = this.stats.find(({ id }) => id === newStat.id)
      if (oldStat !== undefined) {
        const oldStatIndex = this.stats.indexOf(oldStat)
        this.stats[oldStatIndex] = newStat
      }
    },
  },
})
