// stores/counter.spec.ts
import { setActivePinia, createPinia } from 'pinia'
import {
  describe, expect, it, beforeEach,
  jest,
} from '@jest/globals'
import { mock } from 'jest-mock-extended'
import { CreateEventMutation, Event } from 'src/api/generated'
import { useEventsStore } from '../../../src/stores/eventsStore'

const eventMock = mock<Event>({
  id: 1,
  name: 'mocked_name',
})

const getEventsMock = jest.fn()
const createEventMock = jest.fn()
const changeEventMock = jest.fn()
const deleteEventMock = jest.fn()

jest.mock('src/boot/grapqhl', () => ({
  graphqlSDK: {
    GetEvents: () => getEventsMock(),
    CreateEvent: () => createEventMock(),
    UpdateEvent: () => changeEventMock(),
    DeleteEvent: () => deleteEventMock(),
  },
}))

describe('eventsStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());

    [getEventsMock, createEventMock, changeEventMock, deleteEventMock].forEach((item) => item.mockClear())
  })

  it('#getById from empty store', () => {
    const store = useEventsStore()
    expect(store.getById(1)).toBe(undefined)
  })

  it('#load', async () => {
    const store = useEventsStore()

    getEventsMock.mockReturnValue(Promise.resolve({
      GetEvents: {
        events: [eventMock],
        total: 1,
      },
    }))

    await store.load()

    expect(store.getById(1)).toBe(eventMock)
    expect(store.total).toBe(1)
  })

  it('#addEvent', async () => {
    const store = useEventsStore()

    createEventMock.mockReturnValue(Promise.resolve(mock<CreateEventMutation>()))
    getEventsMock.mockReturnValue(Promise.resolve({
      GetEvents: {
        events: [eventMock],
        total: 1,
      },
    }))

    expect(store.total).toBe(0)

    await store.addEvent(eventMock)

    expect(store.getById(1)).toBe(eventMock)
    expect(store.total).toBe(1)
  })

  it('#deleteEvent', async () => {
    const store = useEventsStore()

    getEventsMock.mockReturnValue(Promise.resolve({
      GetEvents: {
        events: [eventMock],
        total: 1,
      },
    }))

    await store.load()
    expect(store.total).toBe(1)

    getEventsMock.mockReturnValue(Promise.resolve({
      GetEvents: {
        events: [],
        total: 0,
      },
    }))

    await store.deleteEvent(eventMock.id)
    expect(store.total).toBe(0)
  })

  it('#changeEvent', async () => {
    const store = useEventsStore()

    getEventsMock.mockReturnValue(Promise.resolve({
      GetEvents: {
        events: [eventMock],
        total: 1,
      },
    }))
    await store.load()

    const updatedEvent = {
      ...eventMock,
      name: 'newName',
    }

    getEventsMock.mockReturnValue(Promise.resolve({
      GetEvents: {
        events: [updatedEvent],
        total: 1,
      },
    }))

    await store.changeEvent(updatedEvent)
    expect(store.getById(1)?.name).toBe(updatedEvent.name)
  })
})
