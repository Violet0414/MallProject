export default {
  namespaced: true,
  state: {
    userinfo: {
      uid: '',
      name: '',
      token: '',
    }
  },
  mutations: {
    setUser(state, payload) {
      state.userinfo = payload;
    },
    clearUser(state) {
      state.userinfo = {
        uid: '',
        name: '',
        token: '',
      }
    }
  },
  action: {

  },
  getters: {

  }
}