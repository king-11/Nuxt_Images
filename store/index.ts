/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FirebaseError } from 'firebase'
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
  snackbar: {
    show: boolean
    color: string
    message: string
  }
}

export const state = () => ({
  snackbar: {
    show: false,
    color: 'blue',
    message: '',
  },
})

export const getters: GetterTree<State, State> = {
  snackbar(state) {
    return state.snackbar
  },
}

export const mutations: MutationTree<State> = {
  displaySnackbar(state, details: { message: string; color?: string }) {
    state.snackbar = { show: true, color: 'blue', ...details }
  },
}

export const actions: ActionTree<State, State> = {
  async logout({ commit }) {
    await auth.signOut()
    this.$axios.setHeader('Authorization', false)
  },
  async loginGithub() {
    try {
      const user = await auth.signInWithPopup(github)
      return user.user
    } catch (err) {
      firebaseAuthError.call(this, err)
    }
  },
  async loginGoogle() {
    try {
      const user = await auth.signInWithPopup(google)
      return user.user
    } catch (err) {
      firebaseAuthError.call(this, err)
    }
  },
  async loginFacebook() {
    try {
      const user = await auth.signInWithPopup(facebook)
      return user.user
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
      return user.user
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
      return user.user
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
