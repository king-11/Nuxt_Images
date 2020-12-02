import { auth, google, github, facebook } from '~/plugins/firebase'

export const strict = false

export const state = () => ({
  user: null,
  snackbar: {
    show: false,
    color: "blue",
    message: "",
  }
})

export const getters = {
  isAuthenticated(state) {
    return !!state.user
  },

  loggedInUser(state) {
    return state.user
  },

  snackbar(state) {
    return state.snackbar
  }
}

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  displaySnackbar(state, details){
    state.snackbar = {show:true,...details}
  }
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
  async emailLogin({ commit }, {email, password}) {
  try {
    const user = await auth.signInWithEmailAndPassword(email, password);
    commit('setUser',user.user)
  } catch(err) {
    if(err.code === "auth/user-not-found"){
      commit('displaySnackbar',{
        message:"User hasn't been registered yet",
        color:"blue"
      })
    }
  }
  }
}
