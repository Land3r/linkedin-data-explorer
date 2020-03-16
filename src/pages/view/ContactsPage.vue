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
            <table-container :data="getContacts" :columns="columns"/>
          </q-tab-panel>

          <q-tab-panel name="charts">
            <charts-container :data="getChartsData" />
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
import { format } from 'quasar'
const { capitalize } = format

import TableContainer from 'components/containers/TableContainer'
import ChartsContainer from 'components/containers/ChartsContainer'
import WordsCloudContainer from 'components/containers/WordsCloudContainer'
import NavigationBar from 'components/navigation/NavigationBar'
import StringAnalysisService from 'services/StringAnalysisService'
import { repeatToLength } from 'helpers/arrayHelper'
import { LinkedinTypesDetails, LinkedinTypes, LinkedinContactsColumns } from 'data/linkedin'

export default {
  name: 'ContactsPage',
  components: {
    'navigation-bar': NavigationBar,
    'table-container': TableContainer,
    'charts-container': ChartsContainer,
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
          label: LinkedinTypesDetails.find((elm) => elm.id === LinkedinTypes.contacts).name,
          icon: LinkedinTypesDetails.find((elm) => elm.id === LinkedinTypes.contacts).icon
        }
      ],
      activeTab: 'raw',
      wordscloud: {
        maxWords: 100,
        cleanLocalized: true
      },
      columns: [
        {
          name: 'firstname',
          label: 'Firstname',
          align: 'left',
          field: LinkedinConnectionsColumns.firstName,
          sortable: true
        },
        {
          name: 'lastname',
          align: 'center',
          label: 'Lastname',
          field: LinkedinConnectionsColumns.lastName,
          sortable: true
        },
        {
          name: 'email',
          align: 'center',
          label: 'Email',
          field: LinkedinConnectionsColumns.emailAddress,
          sortable: true
        },
        {
          name: 'company',
          align: 'center',
          label: 'Company',
          field: LinkedinConnectionsColumns.company,
          sortable: true
        },
        {
          name: 'position',
          align: 'center',
          label: 'Position',
          field: LinkedinConnectionsColumns.position,
          sortable: true
        },
        {
          name: 'connectedon',
          align: 'center',
          label: 'Connected On',
          field: LinkedinConnectionsColumns.connectedOn,
          sortable: true
        }
      ]
    }
  },
  computed: {
    ...mapGetters('linkedin', [
      'getContacts'
    ]),
    wordsWithWeight () {
      const strings = convertJsonArrayToString(this.getContacts, [
        LinkedinContactsColumns.firstName,
        LinkedinConnectionsColumns.lastName,
        LinkedinConnectionsColumns.emails,
        LinkedinConnectionsColumns.phoneNumbers
      ])
      const stringAnalysisService = new StringAnalysisService()
      stringAnalysisService.load(strings)
      const result = stringAnalysisService.analyze(this.wordscloud.maxWords, this.wordscloud.cleanLocalized)
      return result
    },
    wordsFirstNameStatistics () {
      const strings = this.getContacts.map((element) => { return element[LinkedinContactsColumns.firstName] }).join(' ')
      const stringAnalysisService = new StringAnalysisService()
      stringAnalysisService.load(strings)
      const analysis = stringAnalysisService.analyze(0, false)
      const data = analysis.map((element) => element[1])
      const labels = analysis.map((element) => capitalize(element[0]))
      const colors = ['#52D726', '#FFEC00', '#FF7300', '#FF0000', '#007ED6', '#7CDDDD']

      const backgroundColor = repeatToLength(colors, data.length)
      const hoverBackgroundColor = repeatToLength(colors, data.length)

      const result = {
        datasets: [{
          data: data,
          backgroundColor: backgroundColor,
          hoverBackgroundColor: hoverBackgroundColor
        }],
        labels: labels
      }
      console.dir(JSON.stringify(result))
      return result
    },
    wordsLastNameStatistics () {
      const strings = this.getContacts.map((element) => { return element[LinkedinMessagesColumns.lastName] }).join(' ')
      const stringAnalysisService = new StringAnalysisService()
      stringAnalysisService.load(strings)
      const analysis = stringAnalysisService.analyze(0, false)
      const data = analysis.map((element) => element[1])
      const labels = analysis.map((element) => capitalize(element[0]))

      const colors = ['#52D726', '#FFEC00', '#FF7300', '#FF0000', '#007ED6', '#7CDDDD']
      const backgroundColor = repeatToLength(colors, data.length)

      const result = {
        datasets: [{
          data: data,
          backgroundColor: backgroundColor
        }],
        labels: labels,
        options: {
          title: {
            display: true,
            text: 'Custom Chart Title'
          }
        }
      }
      console.dir(JSON.stringify(result))
      return result
    },
    wordsDirectionStatistics () {
      const strings = this.getContacts.map((element) => { return element[LinkedinMessagesColumns.direction] }).join(' ')
      const stringAnalysisService = new StringAnalysisService()
      stringAnalysisService.load(strings)
      const analysis = stringAnalysisService.analyze(0, false)
      const data = analysis.map((element) => element[1])
      const labels = analysis.map((element) => capitalize(element[0]))

      const colors = ['#52D726', '#FFEC00', '#FF7300', '#FF0000', '#007ED6', '#7CDDDD']
      const backgroundColor = repeatToLength(colors, data.length)

      const result = {
        datasets: [{
          data: data,
          backgroundColor: backgroundColor
        }],
        labels: labels,
        options: {
          title: {
            display: true,
            text: 'Custom Chart Title'
          }
        }
      }
      console.dir(JSON.stringify(result))
      return result
    },
    getChartsData () {
      return [
        {
          name: 'Subject',
          data: this.wordsSubjectStatistics
        },
        {
          name: 'Content',
          data: this.wordsContentStatistics
        },
        {
          name: 'Direction',
          data: this.wordsDirectionStatistics
        }
      ]
    }
  },
  methods: {
    changeMaxWords (newMaxWords) {
      this.wordscloud.maxWords = newMaxWords
    },
    changeCleanLocalized (newCleanLocalizedValue) {
      this.wordscloud.cleanLocalized = newCleanLocalizedValue
    }
  }
}
</script>
