import { useUsersStore } from 'src/stores/usersStore'
import { boot } from 'quasar/wrappers'

export default boot(() => {
  const usersStore = useUsersStore()

  usersStore.tryLoadActiveUsers()
})
