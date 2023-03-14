import { useUsersStore } from 'src/stores/usersStore'
import { boot } from 'quasar/wrappers'
import { useStatsStore } from 'src/stores/statsStore'
import { useEventsStore } from 'src/stores/eventsStore'

export default boot(() => {
  const usersStore = useUsersStore()
  const statsStore = useStatsStore()
  const eventsStore = useEventsStore()

  usersStore.tryLoadActiveUsers()
  statsStore.load()
  eventsStore.load()
})
