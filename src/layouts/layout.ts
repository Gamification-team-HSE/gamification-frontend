import { graphqlSDK } from 'src/boot/grapqhl'
import { adminRoutes, userRoutes } from 'src/constants/routes'
import { useUserStore } from 'src/stores/userStore'
import { computed } from 'vue'

export const useLayout = () => {
  const userStore = useUserStore()

  graphqlSDK.GetUser({ id: 1 }).then((data) => {
    console.warn('ASD 123', data.GetUser.email)
  })

  const routes = computed(() => (userStore.isAdmin ? adminRoutes : userRoutes))

  return {
    signOut: userStore.signOut,
    routes,
    email: userStore.email,
  }
}
