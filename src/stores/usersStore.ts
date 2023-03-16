import { defineStore } from 'pinia'
import {
  NewUser, Role, UpdateUser, User,
} from 'src/api/generated'
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

    async createUser(user: NewUser) {
      await graphqlSDK.CreateUser({
        user,
      })

      if (user.role === Role.Admin) {
        this.tryLoadAdminsUsers(true)
      } else {
        this.tryLoadActiveUsers(true)
      }
    },

    async banUser(id: User['id']) {
      await graphqlSDK.BanUser({
        id,
      })

      this.tryLoadBannedUsers(true)
    },

    async deleteUser(id: User['id']) {
      await graphqlSDK.DeleteUser({
        id,
      })

      this.tryLoadBannedUsers(true)
      this.tryLoadActiveUsers(true)
    },

    async recoverUser(id: User['id']) {
      await graphqlSDK.RecoverUser({
        id,
      })
      this.tryLoadBannedUsers(true)
      this.tryLoadActiveUsers(true)
    },

    async updateUser(user: UpdateUser) {
      await graphqlSDK.UpdateUser({
        user,
      })

      this.tryLoadBannedUsers(true)
      this.tryLoadActiveUsers(true)
      this.tryLoadAdminsUsers(true)
    },
  },
})
