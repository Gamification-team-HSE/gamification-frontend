import { defineStore } from 'pinia'
import { UpdateUser, User } from 'src/api/generated'
import { graphqlSDK } from 'src/boot/grapqhl'

export type Total = {
  active: number
  banned: number
  admins: number
}

type State = {
  active: User[] | null
  banned: User[] | null
  admins: User[] | null
  counters: Total | null
}

const defaultState: State = {
  active: null,
  banned: null,
  admins: null,
  counters: null,
}

export const useUsersStore = defineStore('users', {
  state: (): State => ({
    ...defaultState,
  }),
  getters: {
    activeUsers: (state): User[] => state.active ?? [],
    bannedUsers: (state): User[] => state.banned ?? [],
    adminsUsers: (state): User[] => state.admins ?? [],
    totalCounters: (state): Total => state.counters ?? {
      active: 0,
      banned: 0,
      admins: 0,
    },
  },
  actions: {
    async tryLoadActiveUsers(force = false) {
      if (this.active && !force) return

      const res = await graphqlSDK.GetUsers({
        filter: {
          active: true,
        },
      })

      this.active = res.GetUsers.users
      this.counters = res.GetUsers.total
    },

    async tryLoadBannedUsers(force = false) {
      if (this.banned && !force) return

      const res = await graphqlSDK.GetUsers({
        filter: {
          banned: true,
        },
      })

      this.banned = res.GetUsers.users
      this.counters = res.GetUsers.total
    },

    async tryLoadAdminsUsers(force = false) {
      if (this.admins && !force) return

      const res = await graphqlSDK.GetUsers({
        filter: {
          admins: true,
        },
      })

      this.admins = res.GetUsers.users
      this.counters = res.GetUsers.total
    },

    banUser(id: User['id']) {
      return graphqlSDK.BanUser({
        id,
      })
    },

    deleteUser(id: User['id']) {
      return graphqlSDK.DeleteUser({
        id,
      })
    },

    recoverUser(id: User['id']) {
      return graphqlSDK.RecoverUser({
        id,
      })
    },

    updateUser(user: UpdateUser) {
      return graphqlSDK.UpdateUser({
        user,
      })
    },
  },
})
