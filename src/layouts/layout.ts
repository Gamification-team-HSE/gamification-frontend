import { adminRoutes, userRoutes } from 'src/constants/routes'
import { useUserStore } from 'src/stores/userStore'
import { computed } from 'vue'

export const useLayout = () => {
  const userStore = useUserStore()

  const routes = computed(() => (userStore.isAdmin ? adminRoutes : userRoutes))

  return {
    signOut: userStore.signOut,
    routes,
    email: userStore.email,
  }
}
