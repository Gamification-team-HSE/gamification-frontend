import { defineStore } from 'pinia'

export type Event = {
  name: string,
  description: string | null,
  imgUrl: string,
  dateRange: { from: number, to: number },
  created_at: number,
  id: number,
}

const example1: Event = {
  name: 'Новый год 2023',
  description: 'Войти в аккаунт в новогодние каникулы 2023',
  imgUrl: 'https://cdn.quasar.dev/img/boy-avatar.png',
  dateRange: { from: Date.now(), to: Date.now() + 24 * 60 * 60 * 1000 },
  created_at: Date.now(),
  id: 1,
}

const example2: Event = {
  name: 'Событие2',
  description: 'Описание события',
  imgUrl: 'https://cdn.quasar.dev/img/boy-avatar.png',
  dateRange: { from: Date.now(), to: Date.now() + 24 * 60 * 60 * 1000 },
  created_at: Date.now(),
  id: 2,
}

type State = {
  events: Event[]
}

const defaultState: State = {
  events: [example1, example2],
}

export const useEventsStore = defineStore('events', {
  state: (): State => ({
    ...defaultState,
  }),
  getters: {

  },
  actions: {
    deleteEvent(eventId: Event['id']) {
      this.events = this.events.filter((ev) => ev.id !== eventId)
    },

    changeEvent(newEvent: Event) {
      const oldEvent = this.events.find(({ id }) => id === newEvent.id)
      if (oldEvent !== undefined) {
        const oldEventIndex = this.events.indexOf(oldEvent)
        this.events[oldEventIndex] = newEvent
      }
    },
  },
})
