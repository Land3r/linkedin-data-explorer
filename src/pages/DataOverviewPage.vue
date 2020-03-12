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
              <q-btn
                color="primary"
                style="max-width: 200px"
                :to="data.to"
                :disable="!(Number.isInteger(data.length) ? data.length > 0 : data.length)"
              >
                View
              </q-btn>
            </q-item-section>

            <q-item-section middle side>
              <div class="text-grey-8 q-gutter-xs">
                <q-btn
                  flat
                  dense
                  round
                  icon="delete"
                  color="negative"
                  :disable="!(Number.isInteger(data.length) ? data.length > 0 : data.length)"
                  @click="onDeleteBtnClick(data.id, data.name)"
                />
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
import { mapGetters, mapActions } from 'vuex'
import NavigationBar from 'components/navigation/NavigationBar'
import { LinkedinTypes } from '../data/linkedin'

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
  methods: {
    onDeleteBtnClick (id, name) {
      this.$q.dialog({
        title: 'Confirm',
        message: `Are you sure you want to delete ${name}`,
        cancel: true,
        persistent: true
      }).onOk(() => {
        if (id === LinkedinTypes.connections) {
          this.
        }
      }).onOk(() => {
        // console.log('>>>> second OK catcher')
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },

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
