/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FirebaseError, UserInfo } from 'firebase'
import { MutationTree, ActionTree, Store, GetterTree } from 'vuex'
import { auth, google, github, facebook } from '../utils/firebase'

export interface User {
  email: string
  first_name: string
  id: number
  last_name?: string
  username: string
}

export const strict = false

interface State {
  firebaseUser: UserInfo | null
  snackbar: {
    show: boolean
    color: string
    message: string
  }
  token: string | null
}

export const state = () => ({
  firebaseUser: null,
  snackbar: {
    show: false,
    color: 'blue',
    message: '',
  },
  token: null,
})

export const getters: GetterTree<State, State> = {
  snackbar(state) {
    return state.snackbar
  },
  token(state) {
    return state.token
  },
  firebaseUser(state) {
    return state.firebaseUser
  },
}

export const mutations: MutationTree<State> = {
  setUser(state, user: UserInfo) {
    state.firebaseUser = user
  },
  setToken(state, token: string | null) {
    state.token = token
  },
  displaySnackbar(state, details: { message: string; color?: string }) {
    state.snackbar = { show: true, color: 'blue', ...details }
  },
}

export const actions: ActionTree<State, State> = {
  async logout({ commit }) {
    commit('setToken', null)
    await auth.signOut()
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
  async emailRegister(
    { commit },
    { email, password }: { email: string; password: string }
  ) {
    try {
      const user = await auth.createUserWithEmailAndPassword(email, password)
      await user.user?.sendEmailVerification()
      commit('displaySnackbar', {
        message: 'A verification email has been sent to your registered email',
        color: 'pink',
      })
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
      color: 'pink',
    })
  } else if (err.code === 'auth/account-exists-with-different-credential') {
    this.commit('displaySnackbar', {
      message: 'Account already exists with a different provider',
      color: 'pink',
    })
  }
}
