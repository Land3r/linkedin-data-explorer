export function setConnections (state, connections) {
  state.connections = [...connections]
}

export function setContacts (state, contacts) {
  state.contacts = [...contacts]
}

export function setInvitations (state, invitations) {
  state.invitations = [...invitations]
}

export function setMessages (state, messages) {
  state.messages = [...messages]
}

export function setProfile (state, profile) {
  state.profile = { ...profile }
}

export function setRecommendationsGiven (state, recommendations) {
  state.recommendationsgiven = [...recommendations]
}

export function setRecommendationsReceived (state, recommendations) {
  state.recommendationsreceived = [...recommendations]
}

export function setRegistrations (state, registrations) {
  state.registrations = [...registrations]
}
