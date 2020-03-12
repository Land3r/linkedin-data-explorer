import { LinkedinTypes } from '../../data/linkedin'

export function getConnections (state) {
  return state.connections
}

export function getContacts (state) {
  return state.contacts
}

export function getInvitations (state) {
  return state.invitations
}

export function getMessages (state) {
  return state.messages
}

export function getProfile (state) {
  return state.profile
}

export function getRecommendationsGiven (state) {
  return state.recommendationsgiven
}

export function getRecommendationsReceived (state) {
  return state.recommendationsreceived
}

export function getRegistrations (state) {
  return state.registrations
}

export function getActiveViews (state) {
  var activeViews = []

  if (state.connections.length > 0) {
    activeViews.push({
      id: LinkedinTypes.connections
    })
  }
  if (state.contacts.length > 0) {
    activeViews.push({
      id: LinkedinTypes.contacts
    })
  }
  if (state.invitations.length > 0) {
    activeViews.push({
      id: LinkedinTypes.invitations
    })
  }
  if (state.messages.length > 0) {
    activeViews.push({
      id: LinkedinTypes.messages
    })
  }
  if (state.profile !== null) {
    activeViews.push({
      id: LinkedinTypes.profile
    })
  }
  if (state.recommendationsgiven.length > 0) {
    activeViews.push({
      id: LinkedinTypes.recommendationsGiven
    })
  }
  if (state.recommendationsreceived.length > 0) {
    activeViews.push({
      id: LinkedinTypes.recommendationsReceived
    })
  }
  if (state.registrations.length > 0) {
    activeViews.push({
      id: LinkedinTypes.registrations
    })
  }

  return activeViews
}
