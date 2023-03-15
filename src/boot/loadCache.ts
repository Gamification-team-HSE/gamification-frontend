import { useUsersStore } from 'src/stores/usersStore'
import { boot } from 'quasar/wrappers'
import { useStatsStore } from 'src/stores/statsStore'
import { useEventsStore } from 'src/stores/eventsStore'
import { useAchievementsStore } from 'src/stores/achievementsStore'

export default boot(() => {
  const usersStore = useUsersStore()
  const statsStore = useStatsStore()
  const eventsStore = useEventsStore()
  const achievementsStore = useAchievementsStore()

  usersStore.tryLoadActiveUsers()
  statsStore.load()
  eventsStore.load()
  achievementsStore.load()
})
