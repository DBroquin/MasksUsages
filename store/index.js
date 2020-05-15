export const state = () => ({
  user: null,
  masks: null
})

export const mutations = {
  SET_USER(state, user) {
    state.user = user
  },
  SET_MASKS(state, masks) {
    state.masks = masks
  }
}

export const actions = {
  async onAuthStateChangedAction({ commit, dispatch }, { authUser, claims }) {
    if (!authUser) {
      await dispatch('cleanupAction')
    } else {
      const { uid, email, emailVerified, displayName, photoURL } = authUser

      commit('SET_USER', {
        uid,
        email,
        emailVerified,
        displayName,
        photoURL,
        isAdmin: claims.custom_claim
      })

      await dispatch('fetchMasks')

      this.$router.push({ path: '/' })
    }
  },
  async cleanupAction({ commit }) {
    commit('SET_USER', null)
    commit('SET_MASKS', null)
  },
  async fetchMasks({ state, commit }) {
    const masks = await this.$fireStoreObj()
      .collection('masks')
      .where('user_uid', '==', state.user.uid)
      .get()

    commit(
      'SET_MASKS',
      masks.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    )
  },
  async addMask({ state, dispatch }, mask) {
    await this.$fireStoreObj()
      .collection('masks')
      .add({ usage: 0, user_uid: state.user.uid, ...mask })

    await dispatch('fetchMasks')
  },
  async updateMask(ctx, mask) {
    const doc = mask.id
    delete mask.id

    await this.$fireStoreObj()
      .collection('masks')
      .doc(doc)
      .update(mask)
  },
  async deleteAccount({ state, dispatch }) {
    const masks = await this.$fireStoreObj()
      .collection('masks')
      .where('user_uid', '==', state.user.uid)
      .get()

    masks.forEach(mask => mask.ref.delete())

    dispatch('cleanupAction')
  },
  async authProvider({ dispatch }, provider) {
    const result = await this.$fireAuth.signInWithPopup(
      new this.$fireAuthObj[`${provider}AuthProvider`]()
    )

    dispatch('onAuthStateChangedAction', {
      authUser: result.user,
      claims: result.credential
    })
  }
}
