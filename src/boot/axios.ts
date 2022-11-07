import { boot } from 'quasar/wrappers'
import axios, { AxiosInstance } from 'axios'
import { useUserStore } from 'src/stores/user-store'

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
    const { accessToken } = userStore

    if (accessToken) {
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${accessToken}`,
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

      const result = await new Promise<{
        accessToken: string,
        refreshToken: string
      }>((resolve) => {
        resolve({
          accessToken: 'access',
          refreshToken: 'refresh',
        })
      })

      if (result?.accessToken) {
        userStore.setAuth(result.refreshToken, result.accessToken)

        config.headers = {
          ...config.headers,
          authorization: `Bearer ${result?.accessToken}`,
        }
      } else {
        userStore.unlogin()
      }

      return axios(config)
    }
    return Promise.reject(error)
  },
)

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }
