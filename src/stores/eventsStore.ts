import { defineStore } from 'pinia'
import { Event, NewEvent, UpdateEvent } from 'src/api/generated'
import { graphqlSDK } from 'src/boot/grapqhl'

type State = {
  events: Event[]
  total: number
}

const defaultState: State = {
  events: [],
  total: 0,
}

export const useEventsStore = defineStore('events', {
  state: (): State => ({
    ...defaultState,
  }),
  getters: {

  },
  actions: {
    async load() {
      const response = await graphqlSDK.GetEvents()
      this.events = response.GetEvents.events as Event[]
      this.total = response.GetEvents.total
    },

    async addEvent(event: NewEvent) {
      await graphqlSDK.CreateEvent({
        event,
      })

      this.load()
    },

    async deleteEvent(eventId: Event['id']) {
      await graphqlSDK.DeleteEvent({
        id: eventId,
      })

      this.load()
    },

    async changeEvent(event: UpdateEvent) {
      await graphqlSDK.UpdateEvent({
        event,
      })

      this.load()
    },
  },
})
