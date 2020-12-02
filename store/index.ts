import { FirebaseError, UserInfo } from 'firebase'
import { MutationTree, ActionTree, Store } from 'vuex'
import { auth, google, github, facebook } from '../utils/firebase'

export const strict = false

interface State {
  user: UserInfo
  snackbar: {
    show: boolean
    color: string
    message: string
  }
}

export const state = () => ({
  user: null,
  snackbar: {
    show: false,
    color: 'blue',
    message: '',
  },
})

export const getters = {
  isAuthenticated(state: State) {
    return !!state.user
  },

  loggedInUser(state: State) {
    return state.user
  },

  snackbar(state: State) {
    return state.snackbar
  },
}

export const mutations: MutationTree<State> = {
  setUser(state: State, user: UserInfo) {
    state.user = user
  },
  displaySnackbar(state: State, details: { message: string; color?: string }) {
    state.snackbar = { show: true, color: 'blue', ...details }
  },
}

export const actions: ActionTree<State, State> = {
  async logout({ commit }) {
    await auth.signOut()
    commit('setUser', null)
  },
  async loginGithub({ commit }) {
    try {
      const user = await auth.signInWithPopup(github)
      commit('setUser', user.user)
      return user
    } catch (err) {
      firebaseAuthError.call(this, err)
    }
  },
  async loginGoogle({ commit }) {
    try {
      const user = await auth.signInWithPopup(google)
      commit('setUser', user.user)
      return user
    } catch (err) {
      firebaseAuthError.call(this, err)
    }
  },
  async loginFacebook({ commit }) {
    try {
      const user = await auth.signInWithPopup(facebook)
      commit('setUser', user.user)
      return user
    } catch (err) {
      firebaseAuthError.call(this, err)
    }
  },
  async emailLogin(
    { commit },
    { email, password }: { email: string; password: string }
  ) {
    try {
      const user = await auth.signInWithEmailAndPassword(email, password)
      commit('setUser', user.user)
      return user
    } catch (err) {
      firebaseAuthError.call(this, err)
    }
  },
}

function firebaseAuthError(this: Store<State>, err: FirebaseError) {
  if (err.code === 'auth/user-not-found') {
    this.commit('displaySnackbar', {
      message: "User hasn't been registered yet",
      color: 'blue',
    })
  } else if (err.code === 'auth/account-exists-with-different-credential') {
    this.commit('displaySnackbar', {
      message: 'Account already exists with a different provider',
      color: 'pink',
    })
  }
}
