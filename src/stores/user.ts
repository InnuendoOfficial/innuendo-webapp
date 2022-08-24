import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      firstName: 'Allan',
      lastName: 'Dustier',
    }
  }),
  getters: {
    
  },
  actions: {
    setUser(newUser) {
      this.user = newUser;
    },
  },
});
