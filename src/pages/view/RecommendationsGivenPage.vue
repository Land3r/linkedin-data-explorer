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
            <table-container :data="getRecommendationsGiven" :columns="columns"/>
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
import { LinkedinTypesDetails, LinkedinTypes, LinkedinRecommendationsGivenColumns } from 'data/linkedin'

export default {
  name: 'RecommendationsGivenPage',
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
          label: LinkedinTypesDetails.find((elm) => elm.id === LinkedinTypes.recommendationsGiven).name,
          icon: LinkedinTypesDetails.find((elm) => elm.id === LinkedinTypes.recommendationsGiven).icon
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
          field: LinkedinRecommendationsGivenColumns.firstName,
          sortable: true
        },
        {
          name: 'lastname',
          align: 'center',
          label: 'Lastname',
          field: LinkedinRecommendationsGivenColumns.lastName,
          sortable: true
        },
        {
          name: 'email',
          align: 'center',
          label: 'Email',
          field: LinkedinRecommendationsGivenColumns.emailAddress,
          sortable: true
        },
        {
          name: 'company',
          align: 'center',
          label: 'Company',
          field: LinkedinRecommendationsGivenColumns.company,
          sortable: true
        },
        {
          name: 'position',
          align: 'center',
          label: 'Position',
          field: LinkedinRecommendationsGivenColumns.position,
          sortable: true
        },
        {
          name: 'connectedon',
          align: 'center',
          label: 'Connected On',
          field: LinkedinRecommendationsGivenColumns.connectedOn,
          sortable: true
        }
      ]
    }
  },
  computed: {
    ...mapGetters('linkedin', [
      'getRecommendationsGiven'
    ]),
    wordsWithWeight () {
      const strings = convertJsonArrayToString(this.getRecommendationsGiven, [
        LinkedinRecommendationsGivenColumns.firstName,
        LinkedinRecommendationsGivenColumns.lastName,
        LinkedinRecommendationsGivenColumns.company,
        LinkedinRecommendationsGivenColumns.jobTitle,
        LinkedinRecommendationsGivenColumns.text
      ])
      const stringAnalysisService = new StringAnalysisService()
      stringAnalysisService.load(strings)
      const result = stringAnalysisService.analyze(this.wordscloud.maxWords, this.wordscloud.cleanLocalized)
      return result
    },
    wordsFirstNameStatistics () {
      const strings = this.getRecommendationsGiven.map((element) => { return element[LinkedinRecommendationsGivenColumns.firstName] }).join(' ')
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
      const strings = this.getRecommendationsGiven.map((element) => { return element[LinkedinRecommendationsGivenColumns.lastName] }).join(' ')
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
    wordsCompanyStatistics () {
      const strings = this.getRecommendationsGiven.map((element) => { return element[LinkedinRecommendationsGivenColumns.company] }).join(' ')
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
    wordsJobTitleStatistics () {
      const strings = this.getRecommendationsGiven.map((element) => { return element[LinkedinRecommendationsGivenColumns.jobTitle] }).join(' ')
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
    wordsTextStatistics () {
      const strings = this.getRecommendationsGiven.map((element) => { return element[LinkedinRecommendationsGivenColumns.text] }).join(' ')
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
          name: 'First Name',
          data: this.wordsFirstNameStatistics
        },
        {
          name: 'Last Name',
          data: this.wordsLastNameStatistics
        },
        {
          name: 'Company',
          data: this.wordsCompanyStatistics
        },
        {
          name: 'Job Title',
          data: this.wordsJobTitleStatistics
        },
        {
          name: 'Text',
          data: this.wordsTextStatistics
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
