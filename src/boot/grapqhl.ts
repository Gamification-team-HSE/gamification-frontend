import { GraphQLClient } from 'graphql-request'
import { getSdk } from 'src/api/generated'
import { useUserStore } from 'src/stores/userStore'
import { watch } from 'vue'

const userStore = useUserStore()

export const client = new GraphQLClient('http://vartose.fvds.ru/gapi/v1/query', {
  // credentials: 'include',
})

watch(() => userStore.authToken, (newToken) => {
  if (!newToken) {
    client.setHeader('authorization', '')
    return
  }
  client.setHeader('authorization', `Bearer ${newToken}`)
})

export const graphqlSDK = getSdk(client)
