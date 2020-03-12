
import * as types from './mutations-types'

export const mutations = {
  [types.SET_CONNECTIONS] (state, connections) {
    state.connections = [...connections]
  },
  [types.SET_CONTACTS] (state, contacts) {
    state.contacts = [...contacts]
  },
  [types.SET_INVITATIONS] (state, invitations) {
    state.invitations = [...invitations]
  },
  [types.SET_MESSAGES] (state, messages) {
    state.messages = [...messages]
  },
  [types.SET_PROFILE] (state, profile) {
    if (profile === null) {
      state.profile = null
    } else {
      state.profile = { ...profile }
    }
  },
  [types.SET_RECOMMENDATIONS_GIVEN] (state, recommendations) {
    state.recommendationsgiven = [...recommendations]
  },
  [types.SET_RECOMMENDATIONS_RECEIVED] (state, recommendations) {
    state.recommendationsreceived = [...recommendations]
  },
  [types.SET_REGISTRATIONS] (state, registrations) {
    state.registrations = [...registrations]
  }
}
