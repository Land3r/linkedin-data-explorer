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
              <q-icon :name="data.icon" :color="!(Number.isInteger(data.length) ? data.length > 0 : data.length) ? 'grey' : 'black'" size="34px" />
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
import * as LinkedinActionsTypes from 'store/linkedin/actions-types'

import NavigationBar from 'components/navigation/NavigationBar'
import { LinkedinTypes, LinkedinTypesDetails } from 'data/linkedin'

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
    ...mapActions('linkedin', [
      LinkedinActionsTypes.RESET_CONNECTIONS,
      LinkedinActionsTypes.RESET_CONTACTS,
      LinkedinActionsTypes.RESET_INVITATIONS,
      LinkedinActionsTypes.RESET_MESSAGES,
      LinkedinActionsTypes.RESET_PROFILE,
      LinkedinActionsTypes.RESET_RECOMMENDATIONS_GIVEN,
      LinkedinActionsTypes.RESET_RECOMMENDATIONS_RECEIVED,
      LinkedinActionsTypes.RESET_REGISTRATIONS
    ]),
    onDeleteBtnClick (id) {
      this.$q.dialog({
        title: 'Confirm',
        message: `Are you sure you want to delete ${LinkedinTypesDetails.find(elm => elm.id === id).name}`,
        cancel: true,
        persistent: true
      }).onOk(() => {
        if (id === LinkedinTypes.connections) {
          this[LinkedinActionsTypes.RESET_CONNECTIONS]()
        } else if (id === LinkedinTypes.contacts) {
          this[LinkedinActionsTypes.RESET_CONTACTS]()
        } else if (id === LinkedinTypes.invitations) {
          this[LinkedinActionsTypes.RESET_INVITATIONS]()
        } else if (id === LinkedinTypes.messages) {
          this[LinkedinActionsTypes.RESET_MESSAGES]()
        } else if (id === LinkedinTypes.profile) {
          this[LinkedinActionsTypes.RESET_PROFILE]()
        } else if (id === LinkedinTypes.recommendationsGiven) {
          this[LinkedinActionsTypes.RESET_RECOMMENDATIONS_GIVEN]()
        } else if (id === LinkedinTypes.recommendationsReceived) {
          this[LinkedinActionsTypes.RESET_RECOMMENDATIONS_RECEIVED]()
        } else if (id === LinkedinTypes.registrations) {
          this[LinkedinActionsTypes.RESET_REGISTRATIONS]()
        }
      }).onOk(() => {
        // console.log('>>>> second OK catcher')
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    getDataLength (dataType) {
      return dataType === LinkedinTypes.connections ? this.getConnections.length
        : dataType === LinkedinTypes.contacts ? this.getContacts.length
          : dataType === LinkedinTypes.invitations ? this.getInvitations.length
            : dataType === LinkedinTypes.messages ? this.getMessages.length
              : dataType === LinkedinTypes.profile ? this.getProfile !== null
                : dataType === LinkedinTypes.recommendationsGiven ? this.getRecommendationsGiven.length
                  : dataType === LinkedinTypes.recommendationsReceived ? this.getRecommendationsReceived.length
                    : dataType === LinkedinTypes.registrations ? this.getRegistrations.length : 0
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
      const linkedinState = LinkedinTypesDetails.map((element) => ({
        id: element.id,
        label: LinkedinTypesDetails.find((elm) => elm.id === element.id).name,
        length: this.getDataLength(element.id),
        icon: LinkedinTypesDetails.find((elm) => elm.id === element.id).icon,
        to: { name: LinkedinTypesDetails.find((elm) => elm.id === element.id).page }
      }))
      return linkedinState
    }
  }
}
</script>
