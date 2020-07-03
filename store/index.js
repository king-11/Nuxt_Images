export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },

  loggedInUser(state) {
    return state.auth.user
  }
}

export const actions = {
  login: async ({
    commit
  }, user) => {
    await this.auth.loginWith('local', {
      data: {
        ...user
      }
    })

    this.router.push('/')
  }

}
