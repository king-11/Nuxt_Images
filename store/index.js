import { auth, google, github, facebook } from '~/plugins/firebase'

export const strict = false

export const state = () => ({
  user: null,
})

export const getters = {
  isAuthenticated(state) {
    return !!state.user
  },

  loggedInUser(state) {
    return state.user
  },
}

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
}

export const actions = {
  async logout({ commit }) {
    await auth.signOut()
    commit('setUser', null)
  },
  async loginGithub({ commit }) {
    try {
      const user = await auth.signInWithPopup(github)
      commit('setUser', user.user)
    } catch (err) {
      console.log(err)
    }
  },
  async loginGoogle({ commit }) {
    try {
      const user = await auth.signInWithPopup(google)
      commit('setUser', user.user)
    } catch (err) {
      console.log(err)
    }
  },
  async loginFacebook({ commit }) {
    try {
      const user = await auth.signInWithPopup(facebook)
      commit('setUser', user.user)
    } catch (err) {
      console.log(err)
    }
  },
}
