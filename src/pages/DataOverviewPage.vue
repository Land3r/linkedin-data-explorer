<template>
  <q-page>
    <navigation-bar :breadcrumbs="breadcrumbs"/>
    <div class="q-pa-md q-gutter-md">
      <q-list bordered class="rounded-borders">
        <q-item-label header>Imported data</q-item-label>
        <template
          v-for="(data, key) in getDataState">
          <q-item
           v-bind:key="data.id">
            <q-item-section avatar top>
              <q-icon :name="data.icon" color="black" size="34px" />
            </q-item-section>

            <q-item-section top class="col-2 gt-sm">
              <q-item-label class="q-mt-sm">{{data.label}}</q-item-label>
            </q-item-section>

            <q-item-section top>
              <q-item-label lines="1">
                <span class="text-weight-medium">[Linkedin]</span>
                <span class="text-grey-8"> - {{data.label}}</span>
              </q-item-label>
              <q-item-label lines="1">
                <template v-if="Number.isInteger(data.length)">
                  {{data.length}} rows imported
                </template>
                <template v-else>
                  {{data.length ? 'Imported' : 'Not yet imported'}}
                </template>
              </q-item-label>
            </q-item-section>

            <q-item-section middle>

              <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
                <q-item
                  clickable
                  tag="a"
                  class="cursor-pointer inline"
                  :to="data.to">
                  View
                </q-item>
              </q-item-label>
            </q-item-section>

            <q-item-section middle side>
              <div class="text-grey-8 q-gutter-xs">
                <q-btn class="gt-xs" size="12px" flat dense round icon="delete" />
              </div>
            </q-item-section>
          </q-item>
          <q-separator
            v-bind:key="data.id + '-sep'"
            v-if="(key + 1 !== getDataState.length)"
            spaced
          />
        </template>
      </q-list>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import NavigationBar from 'components/navigation/NavigationBar'

export default {
  name: 'DataOverviewPage',
  components: {
    'navigation-bar': NavigationBar
  },
  data () {
    return {
      breadcrumbs: [
        {
          icon: 'fab fa-linkedin'
        },
        {
          label: 'Data Overview',
          icon: 'widgets'
        }
      ]
    }
  },
  computed: {
    ...mapGetters('linkedin', [
      'getConnections',
      'getContacts',
      'getInvitations',
      'getMessages',
      'getProfile',
      'getRecommendationsGiven',
      'getRecommendationsReceived',
      'getRegistrations'
    ]),
    getDataState () {
      return [
        {
          id: 'connections',
          label: 'Connections',
          icon: 'transfer_within_a_station',
          length: this.getConnections.length,
          to: { name: 'ConnectionsPage' }
        },
        {
          id: 'contacts',
          label: 'Contacts',
          icon: 'contacts',
          length: this.getContacts.length,
          to: { name: 'ContactsPage' }
        },
        {
          id: 'invitations',
          label: 'Invitations',
          icon: 'mail_outline',
          length: this.getInvitations.length,
          to: { name: 'InvitationsPage' }
        },
        {
          id: 'messages',
          label: 'Messages',
          icon: 'message',
          length: this.getMessages.length,
          to: { name: 'MessagesPage' }
        },
        {
          id: 'profile',
          label: 'Profile',
          icon: 'perm_identity',
          length: this.getProfile !== null,
          to: { name: 'ProfilePage' }
        },
        {
          id: 'recommendationsgiven',
          label: 'Recommendations Given',
          icon: 'message',
          length: this.getRecommendationsGiven.length,
          to: { name: 'RecommendationsGivenPage' }
        },
        {
          id: 'recommendationsreceived',
          label: 'Recommendations Received',
          icon: 'message',
          length: this.getRecommendationsReceived.length,
          to: { name: 'RecommendationsReceivedPage' }
        },
        {
          id: 'registrations',
          label: 'Registrations',
          icon: null,
          length: this.getRegistrations.length,
          to: { name: 'RegistrationsPage' }
        }
      ]
    }
  }
}
</script>
