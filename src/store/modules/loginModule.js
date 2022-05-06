export default {
  namespaced: true,
  state: {
    userinfo: {
      uid: '',
      name: '',
      address: '',
      token: '',
      type: null,
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
        address: '',
        token: '',
        type: null
      }
    }
  },
  action: {

  },
  getters: {

  }
}