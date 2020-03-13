<template>
  <q-page>
    <navigation-bar :breadcrumbs="breadcrumbs"/>
    <div class="q-pa-md q-gutter-y-md">
      <q-card>
        <q-tabs
          v-model="activeTab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="raw" label="Raw data" icon="view_list" />
          <q-tab name="charts" label="Charts" icon="bar_chart" />
          <q-tab name="words" label="Word cloud" icon="translate" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="activeTab" animated>
          <q-tab-panel name="raw">
            <div class="q-pa-md">
              <q-table
                title="Connections"
                :data="getConnections"
                :columns="columns"
                row-key="Row"
                :selected-rows-label="getSelectedString"
                selection="multiple"
                :pagination.sync="pagination"
                :selected.sync="selected"
              />
            </div>
          </q-tab-panel>

          <q-tab-panel name="charts">
            <div class="text-h6">Alarms</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="words">
            <words-cloud-container
              :words="wordsWithWeight"
              :changeMaxWords="changeMaxWords"
              :changeCleanLocalized="changeCleanLocalized"
              />
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </q-page>
</template>

<style lang="scss">

</style>

<script>
import { mapGetters } from 'vuex'

import WordsCloudContainer from 'components/WordsCloudContainer'
import NavigationBar from 'components/navigation/NavigationBar'
import StringAnalysisService from '../../services/StringAnalysisService'
import { LinkedinTypesDetails, LinkedinTypes } from '../../data/linkedin'

export default {
  name: 'ConnectionsPage',
  components: {
    'navigation-bar': NavigationBar,
    'words-cloud-container': WordsCloudContainer
  },
  data () {
    return {
      breadcrumbs: [
        {
          icon: 'fab fa-linkedin'
        },
        {
          label: 'Data Overview',
          icon: 'widgets',
          to: { name: 'DataOverviewPage' }
        },
        {
          label: LinkedinTypesDetails.find((elm) => elm.id === LinkedinTypes.connections).name,
          icon: LinkedinTypesDetails.find((elm) => elm.id === LinkedinTypes.connections).icon
        }
      ],
      activeTab: 'raw',
      pagination: {
        rowsPerPage: 50
      },
      wordscloud: {
        maxWords: 100,
        cleanLocalized: true
      },
      columns: [
        {
          name: 'firstname',
          label: 'Firstname',
          align: 'left',
          field: 'First Name',
          sortable: true
        },
        {
          name: 'lastname',
          align: 'center',
          label: 'Lastname',
          field: 'Last Name',
          sortable: true
        },
        {
          name: 'email',
          align: 'center',
          label: 'Email',
          field: 'Email Address',
          sortable: true
        },
        {
          name: 'company',
          align: 'center',
          label: 'Company',
          field: 'Company',
          sortable: true
        },
        {
          name: 'position',
          align: 'center',
          label: 'Position',
          field: 'Position',
          sortable: true
        },
        {
          name: 'connectedon',
          align: 'center',
          label: 'Connected On',
          field: 'Connected On',
          sortable: true
        }
      ],
      selected: []
    }
  },
  computed: {
    ...mapGetters('linkedin', [
      'getConnections'
    ]),
    wordsWithWeight () {
      const strings = this.getConnections.map((element) => { return element['First Name'] + ' ' + element['Last Name'] + ' ' + element['Email Address'] + ' ' + element.Company + ' ' + element.Position }).join(' ')
      const stringAnalysisService = new StringAnalysisService()
      stringAnalysisService.load(strings)
      const result = stringAnalysisService.analyze(this.wordscloud.maxWords, this.wordscloud.cleanLocalized)
      return result
    }
  },
  methods: {
    getSelectedString () {
      return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.getConnections.length}`
    },
    changeMaxWords (newMaxWords) {
      this.wordscloud.maxWords = newMaxWords
    },
    changeCleanLocalized (newCleanLocalizedValue) {
      this.wordscloud.cleanLocalized = newCleanLocalizedValue
    }
  }
}
</script>
