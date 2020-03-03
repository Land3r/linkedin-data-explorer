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
      title: 'Connections',
      caption: '',
      icon: 'transfer_within_a_station',
      link: 'ConnectionsPage'
    })
  }
  if (state.contacts.length > 0) {
    activeViews.push({
      title: 'Contacts',
      caption: '',
      icon: 'contacts',
      link: 'ContactsPage'
    })
  }
  if (state.invitations.length > 0) {
    activeViews.push({
      title: 'Invitations',
      caption: '',
      icon: 'mail_outline',
      link: 'InvitationsPage'
    })
  }
  if (state.messages.length > 0) {
    activeViews.push({
      title: 'Messages',
      caption: '',
      icon: 'message',
      link: 'MessagesPage'
    })
  }
  if (state.profile) {
    activeViews.push({
      title: 'Profile',
      caption: '',
      icon: 'perm_identity',
      link: 'ProfilePage'
    })
  }
  if (state.recommendationsgiven.length > 0) {
    activeViews.push({
      title: 'Recommendations Given',
      caption: '',
      icon: 'message',
      link: 'RecommendationsGivenPage'
    })
  }
  if (state.recommendationsreceived.length > 0) {
    activeViews.push({
      title: 'Recommendations Received',
      caption: '',
      icon: 'message',
      link: 'RecommendationsReceivedPage'
    })
  }
  if (state.registrations.length > 0) {
    activeViews.push({
      title: 'Registrations',
      caption: '',
      icon: '',
      link: 'RegistrationsPage'
    })
  }

  return activeViews
}
