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
            <table-container
              title="Contacts"
              :data="getContacts"
              :columns="columns"
            />
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
import { convertJsonArrayToString } from 'helpers/stringHelper'
import { DefaultDonut } from 'data/chart'
import { LinkedinTypesDetails, LinkedinTypes, LinkedinContactsColumns } from 'data/linkedin'
import { LinkedinContactsSource } from '../../data/linkedin'

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
          name: 'source',
          label: 'Source',
          align: 'left',
          field: LinkedinContactsColumns.source,
          sortable: true,
          format: (val, row) => this.formatSource(val, row)
        },
        {
          name: 'firstname',
          label: 'Firstname',
          align: 'center',
          field: LinkedinContactsColumns.firstName,
          sortable: true
        },
        {
          name: 'lastname',
          label: 'Lastname',
          align: 'center',
          field: LinkedinContactsColumns.lastName,
          sortable: true
        },
        {
          name: 'companies',
          label: 'Companies',
          align: 'center',
          field: LinkedinContactsColumns.companies,
          sortable: true
        },
        {
          name: 'title',
          label: 'Position',
          align: 'center',
          field: LinkedinContactsColumns.title,
          sortable: true
        },
        {
          name: 'emails',
          label: 'Emails',
          align: 'center',
          field: LinkedinContactsColumns.emails,
          sortable: true
        },
        {
          name: 'phonenumbers',
          label: 'Phone Numbers',
          align: 'center',
          field: LinkedinContactsColumns.phoneNumbers,
          sortable: true
        },
        {
          name: 'createdAt',
          label: 'Created',
          align: 'center',
          field: LinkedinContactsColumns.createdAt,
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
        LinkedinContactsColumns.lastName,
        LinkedinContactsColumns.emails,
        LinkedinContactsColumns.phoneNumbers
      ])
      const stringAnalysisService = new StringAnalysisService()
      stringAnalysisService.load(strings)
      const result = stringAnalysisService.analyze(this.wordscloud.maxWords, this.wordscloud.cleanLocalized)
      return result
    },
    wordsSourceStatistics () {
      const strings = this.getContacts.map((element) => { return element[LinkedinContactsColumns.source] }).join(' ')
      const stringAnalysisService = new StringAnalysisService()
      stringAnalysisService.load(strings)
      const analysis = stringAnalysisService.analyze(DefaultDonut.maxPies, false)

      const data = analysis.map((element) => element[1])
      const labels = analysis.map((element) => capitalize(element[0]))
      const backgroundColor = repeatToLength(DefaultDonut.colors, data.length)
      const hoverBackgroundColor = repeatToLength(DefaultDonut.hoverColors, data.length)

      // TODO: Voir pour mettre des labels parlants.

      const result = {
        datasets: [{
          data: data,
          backgroundColor: backgroundColor,
          hoverBackgroundColor: hoverBackgroundColor
        }],
        labels: labels
      }
      return result
    },
    wordsFirstNameStatistics () {
      const strings = this.getContacts.map((element) => { return element[LinkedinContactsColumns.firstName] }).join(' ')
      const stringAnalysisService = new StringAnalysisService()
      stringAnalysisService.load(strings)
      const analysis = stringAnalysisService.analyze(DefaultDonut.maxPies, false)

      const data = analysis.map((element) => element[1])
      const labels = analysis.map((element) => capitalize(element[0]))
      const backgroundColor = repeatToLength(DefaultDonut.colors, data.length)
      const hoverBackgroundColor = repeatToLength(DefaultDonut.hoverColors, data.length)

      const result = {
        datasets: [{
          data: data,
          backgroundColor: backgroundColor,
          hoverBackgroundColor: hoverBackgroundColor
        }],
        labels: labels
      }
      return result
    },
    wordsLastNameStatistics () {
      const strings = this.getContacts.map((element) => { return element[LinkedinContactsColumns.lastName] }).join(' ')
      const stringAnalysisService = new StringAnalysisService()
      stringAnalysisService.load(strings)
      const analysis = stringAnalysisService.analyze(DefaultDonut.maxPies, false)

      const data = analysis.map((element) => element[1])
      const labels = analysis.map((element) => capitalize(element[0]))
      const backgroundColor = repeatToLength(DefaultDonut.colors, data.length)
      const hoverBackgroundColor = repeatToLength(DefaultDonut.hoverColors, data.length)

      const result = {
        datasets: [{
          data: data,
          backgroundColor: backgroundColor,
          hoverBackgroundColor: hoverBackgroundColor
        }],
        labels: labels
      }
      return result
    },
    getChartsData () {
      return [
        {
          name: 'Source',
          data: this.wordsSourceStatistics
        },
        {
          name: 'FirstName',
          data: this.wordsFirstNameStatistics
        },
        {
          name: 'Last Name',
          data: this.wordsLastNameStatistics
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
    },
    formatSource (val, row) {
      if (val === LinkedinContactsSource.mobile) {
        return '\u{1f4f1} Mobile'
      } else if (val === LinkedinContactsSource.google) {
        return '\u{1f4f2} Google'
      } else if (val === LinkedinContactsSource.abook) {
        return '\u{1f4d4} Address Book Import'
      } else {
        return val
      }
    }
  }
}
</script>
