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
            <table-container :data="getInvitations" :columns="columns"/>
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
import { LinkedinTypesDetails, LinkedinTypes, LinkedinInvitationsColumns } from 'data/linkedin'

export default {
  name: 'InvitationsPage',
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
          label: LinkedinTypesDetails.find((elm) => elm.id === LinkedinTypes.invitations).name,
          icon: LinkedinTypesDetails.find((elm) => elm.id === LinkedinTypes.invitations).icon
        }
      ],
      activeTab: 'raw',
      wordscloud: {
        maxWords: 100,
        cleanLocalized: true
      },
      columns: [
        {
          name: 'from',
          label: 'From',
          align: 'left',
          field: LinkedinInvitationsColumns.from,
          sortable: true
        },
        {
          name: 'to',
          label: 'To',
          align: 'center',
          field: LinkedinInvitationsColumns.to,
          sortable: true
        },
        {
          name: 'sentAt',
          label: 'Sent At',
          align: 'center',
          field: LinkedinInvitationsColumns.sentAt,
          sortable: true
        },
        {
          name: 'message',
          label: 'Message',
          align: 'center',
          field: LinkedinInvitationsColumns.message,
          sortable: true
        },
        {
          name: 'direction',
          label: 'Direction',
          align: 'center',
          field: LinkedinInvitationsColumns.direction,
          sortable: true
        }
      ]
    }
  },
  computed: {
    ...mapGetters('linkedin', [
      'getInvitations'
    ]),
    wordsWithWeight () {
      const strings = convertJsonArrayToString(this.getInvitations, [
        LinkedinInvitationsColumns.from,
        LinkedinInvitationsColumns.to,
        LinkedinInvitationsColumns.message,
        LinkedinInvitationsColumns.direction
      ])
      const stringAnalysisService = new StringAnalysisService()
      stringAnalysisService.load(strings)
      const result = stringAnalysisService.analyze(this.wordscloud.maxWords, this.wordscloud.cleanLocalized)
      return result
    },
    wordsDirectionStatistics () {
      const strings = this.getInvitations.map((element) => { return element[LinkedinInvitationsColumns.direction] }).join(' ')
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
    wordsFromStatistics () {
      const strings = this.getInvitations.map((element) => { return element[LinkedinInvitationsColumns.from] }).join(' ')
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
    wordsToStatistics () {
      const strings = this.getInvitations.map((element) => { return element[LinkedinInvitationsColumns.to] }).join(' ')
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
    wordsMessageStatistics () {
      const strings = this.getInvitations.map((element) => { return element[LinkedinInvitationsColumns.message] }).join(' ')
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
          name: 'Direction',
          data: this.wordsDirectionStatistics
        },
        {
          name: 'From',
          data: this.wordsFromStatistics
        },
        {
          name: 'To',
          data: this.wordsToStatistics
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
