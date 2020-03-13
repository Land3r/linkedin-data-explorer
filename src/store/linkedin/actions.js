import * as actionstypes from './actions-types'
import * as mutationstypes from './mutations-types'

import { Notify } from 'quasar'

import { convertCsvToJson } from '../../helpers/convertHelper'

export const actions = {
  async [actionstypes.LOAD_CONNECTIONS] ({ commit }, connections) {
    const jsonPromise = convertCsvToJson(connections)
    jsonPromise.then((json) => {
      commit(mutationstypes.SET_CONNECTIONS, json)
      Notify.create({
        type: 'positive',
        message: 'Connections imported.'
      })
    }).catch((err) => {
      Notify.create({
        type: 'negative',
        message: 'Impossible to import the connections.'
      })
      console.error(err)
    })
  },
  [actionstypes.LOAD_CONTACTS] ({ commit }, contacts) {
    const jsonPromise = convertCsvToJson(contacts)
    jsonPromise.then((json) => {
      commit(mutationstypes.SET_CONTACTS, json)
      Notify.create({
        type: 'positive',
        message: 'Contacts imported.'
      })
    }).catch((err) => {
      Notify.create({
        type: 'negative',
        message: 'Impossible to import the contacts.'
      })
      console.error(err)
    })
  },
  [actionstypes.LOAD_INVITATIONS] ({ commit }, invitations) {
    const jsonPromise = convertCsvToJson(invitations)
    jsonPromise.then((json) => {
      commit(mutationstypes.SET_INVITATIONS, json)
      Notify.create({
        type: 'positive',
        message: 'Invitations imported.'
      })
    }).catch((err) => {
      Notify.create({
        type: 'negative',
        message: 'Impossible to import the invitations.'
      })
      console.error(err)
    })
  },
  [actionstypes.LOAD_MESSAGES] ({ commit }, messages) {
    const jsonPromise = convertCsvToJson(messages)
    jsonPromise.then((json) => {
      commit(mutationstypes.SET_MESSAGES, json)
      Notify.create({
        type: 'positive',
        message: 'Messages imported.'
      })
    }).catch((err) => {
      Notify.create({
        type: 'negative',
        message: 'Impossible to import the messages.'
      })
      console.error(err)
    })
  },
  [actionstypes.LOAD_PROFILE] ({ commit }, profile) {
    const jsonPromise = convertCsvToJson(profile)
    jsonPromise.then((json) => {
      commit(mutationstypes.SET_PROFILE, json)
      Notify.create({
        type: 'positive',
        message: 'Profile imported.'
      })
    }).catch((err) => {
      Notify.create({
        type: 'negative',
        message: 'Impossible to import the profile.'
      })
      console.error(err)
    })
  },
  [actionstypes.LOAD_RECOMMENDATIONS_GIVEN] ({ commit }, recommendationsGiven) {
    const jsonPromise = convertCsvToJson(recommendationsGiven)
    jsonPromise.then((json) => {
      commit(mutationstypes.SET_RECOMMENDATIONS_GIVEN, json)
      Notify.create({
        type: 'positive',
        message: 'Recommendations given imported.'
      })
    }).catch((err) => {
      Notify.create({
        type: 'negative',
        message: 'Impossible to import the given recommendations.'
      })
      console.error(err)
    })
  },
  [actionstypes.LOAD_RECOMMENDATIONS_RECEIVED] ({ commit }, recommendationsReceived) {
    const jsonPromise = convertCsvToJson(recommendationsReceived)
    jsonPromise.then((json) => {
      commit(mutationstypes.SET_RECOMMENDATIONS_RECEIVED, json)
      Notify.create({
        type: 'positive',
        message: 'Recommendations received imported.'
      })
    }).catch((err) => {
      Notify.create({
        type: 'negative',
        message: 'Impossible to import the received recommendations.'
      })
      console.error(err)
    })
  },
  [actionstypes.LOAD_REGISTRATIONS] ({ commit }, registrations) {
    const jsonPromise = convertCsvToJson(registrations)
    jsonPromise.then((json) => {
      commit(mutationstypes.SET_INVITATIONS, json)
      Notify.create({
        type: 'positive',
        message: 'Registrations imported.'
      })
    }).catch((err) => {
      Notify.create({
        type: 'negative',
        message: 'Impossible to import the registrations.'
      })
      console.error(err)
    })
  },
  [actionstypes.RESET_CONNECTIONS] ({ commit }) {
    commit(mutationstypes.SET_CONNECTIONS, [])
  },
  [actionstypes.RESET_CONTACTS] ({ commit }) {
    commit(mutationstypes.SET_CONTACTS, [])
  },
  [actionstypes.RESET_INVITATIONS] ({ commit }) {
    commit(mutationstypes.SET_INVITATIONS, [])
  },
  [actionstypes.RESET_MESSAGES] ({ commit }) {
    commit(mutationstypes.SET_MESSAGES, [])
  },
  [actionstypes.RESET_PROFILE] ({ commit }) {
    commit(mutationstypes.SET_PROFILE, null)
  },
  [actionstypes.RESET_RECOMMENDATIONS_GIVEN] ({ commit }) {
    commit(mutationstypes.SET_RECOMMENDATIONS_GIVEN, [])
  },
  [actionstypes.RESET_RECOMMENDATIONS_RECEIVED] ({ commit }) {
    commit(mutationstypes.SET_RECOMMENDATIONS_RECEIVED, [])
  },
  [actionstypes.RESET_REGISTRATIONS] ({ commit }) {
    commit(mutationstypes.SET_REGISTRATIONS, [])
  }
}
