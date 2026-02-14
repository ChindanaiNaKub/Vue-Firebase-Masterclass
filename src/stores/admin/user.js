// Chapter 8: Admin User store - mock (no localStorage)
import { defineStore } from 'pinia'

export const useAdminUserStore = defineStore('admin-user', {
  state: () => ({
    list: [
      { name: 'Mike', role: 'admin', status: 'active', updatedAt: '9/15/2023, 11:50:24 PM' },
      { name: 'Test', role: 'moderator', status: 'inactive', updatedAt: '9/15/2023, 11:50:24 PM' },
      { name: 'TP', role: 'member', status: 'active', updatedAt: '9/15/2023, 11:50:24 PM' }
    ]
  }),
  actions: {
    getUser(index) {
      return this.list[parseInt(index, 10)]
    },
    updateUser(index, userData) {
      const i = parseInt(index, 10)
      this.list[i] = {
        ...this.list[i],
        name: userData.name,
        status: userData.status,
        role: userData.role,
        updatedAt: new Date().toLocaleString()
      }
    },
    removeUser(index) {
      this.list.splice(parseInt(index, 10), 1)
    }
  }
})
