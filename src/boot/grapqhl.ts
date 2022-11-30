import { GraphQLClient } from 'graphql-request'
import { getSdk } from 'src/api/generated'
import { useUserStore } from 'src/stores/userStore'

export const client = new GraphQLClient('http://vartose.fvds.ru/gapi/v1/query', {
  // credentials: 'include',
})

export const graphqlSDK = getSdk(client, async (action) => {
  const userStore = useUserStore()

  try {
    const result = await action()
    return result
  } catch (error) {
    const { status } = (error as any).response
    if (status === 401) {
      userStore.signOut()
    }
    throw error
  }
})
