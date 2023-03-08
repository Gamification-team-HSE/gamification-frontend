import { defineStore } from 'pinia'

export type Achievement = {
  name: string,
  description: string | null,
  imgUrl: string,
  created_at: number,
  id: number,
}

const example1: Achievement = {
  name: 'Самый продуктивный программист',
  description: 'Закрыть 10 задач за одну неделю',
  imgUrl: 'https://cdn.quasar.dev/img/boy-avatar.png',
  created_at: Date.now(),
  id: 1,
}

const example2: Achievement = {
  name: 'Достижение2',
  description: 'Описание достижения',
  imgUrl: 'https://cdn.quasar.dev/img/boy-avatar.png',
  created_at: Date.now(),
  id: 2,
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
