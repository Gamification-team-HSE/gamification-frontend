import axios, { AxiosInstance } from 'axios'
import { useUserStore } from 'src/stores/userStore'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

const userStore = useUserStore()

const api = axios.create({ baseURL: process.env.API })

api.interceptors.request.use(
  async (config) => {
    const { authToken } = userStore

    if (authToken) {
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${authToken}`,
      }
    }

    return config
  },
  (error) => Promise.reject(error),
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config

    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true

      userStore.signOut()

      return axios(config)
    }
    return Promise.reject(error)
  },
)

export { api }
