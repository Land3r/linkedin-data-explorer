import * as actionstypes from './actions-types'
import * as mutationstypes from './mutations-types'

import { convertToJson } from '../../services/CsvToJsonService'

export const actions = {
  async [actionstypes.LOAD_CONNECTIONS] ({ commit }, connections) {
    const jsonPromise = convertToJson(connections)
    jsonPromise.then((json) => {
      commit(mutationstypes.SET_CONNECTIONS, json)
    }).catch((err) => {
      console.error(err)
    })
  },
  [actionstypes.LOAD_CONTACTS] ({ commit }, contacts) {
    commit(mutationstypes.SET_CONTACTS, contacts)
  },
  [actionstypes.LOAD_INVITATIONS] ({ commit }, invitations) {
    commit(mutationstypes.SET_INVITATIONS, invitations)
  },
  [actionstypes.LOAD_MESSAGES] ({ commit }, messages) {
    commit(mutationstypes.SET_MESSAGES, messages)
  },
  [actionstypes.LOAD_PROFILE] ({ commit }, profile) {
    commit(mutationstypes.SET_PROFILE, profile)
  },
  [actionstypes.LOAD_RECOMMENDATIONS_GIVEN] ({ commit }, recommendationsGiven) {
    commit(mutationstypes.SET_RECOMMENDATIONS_GIVEN, recommendationsGiven)
  },
  [actionstypes.LOAD_RECOMMENDATIONS_RECEIVED] ({ commit }, recommendationsReceived) {
    commit(mutationstypes.SET_RECOMMENDATIONS_RECEIVED, recommendationsReceived)
  },
  [actionstypes.LOAD_REGISTRATIONS] ({ commit }, registrations) {
    commit(mutationstypes.SET_REGISTRATIONS, registrations)
  }
}
