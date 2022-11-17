import { adminRoutes, userRoutes } from 'src/constants/routes'
import { useUserStore } from 'src/stores/user-store'
import { computed, ref } from 'vue'

export const useLayout = () => {
  const drawer = ref(false)
  const userStore = useUserStore()

  const routes = computed(() => (userStore.isAdmin ? adminRoutes : userRoutes))

  return {
    signOut: userStore.signOut,
    routes,
    drawer,
  }
}
