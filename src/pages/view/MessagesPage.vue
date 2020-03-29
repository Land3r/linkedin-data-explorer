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
              title="Messages"
              :data="getMessages"
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
import { LinkedinTypesDetails, LinkedinTypes, LinkedinMessagesColumns } from 'data/linkedin'
import { LinkedinMessagesDirection } from '../../data/linkedin'

export default {
  name: 'MessagesPage',
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
          label: LinkedinTypesDetails.find((elm) => elm.id === LinkedinTypes.messages).name,
          icon: LinkedinTypesDetails.find((elm) => elm.id === LinkedinTypes.messages).icon
        }
      ],
      activeTab: 'raw',
      wordscloud: {
        maxWords: 100,
        cleanLocalized: true
      },
      columns: [
        {
          name: 'direction',
          label: 'Direction',
          align: 'center',
          field: LinkedinMessagesColumns.direction,
          sortable: true,
          format: (val, row) => this.formatDirection(val, row)
        },
        {
          name: 'from',
          label: 'From',
          align: 'left',
          field: LinkedinMessagesColumns.from,
          sortable: true
        },
        {
          name: 'to',
          label: 'To',
          align: 'center',
          field: LinkedinMessagesColumns.to,
          sortable: true
        },
        {
          name: 'date',
          label: 'Date',
          align: 'center',
          field: LinkedinMessagesColumns.date,
          sortable: true
        },
        {
          name: 'subject',
          label: 'Subject',
          align: 'center',
          field: LinkedinMessagesColumns.subject,
          sortable: true
        },
        {
          name: 'content',
          label: 'Content',
          align: 'center',
          field: LinkedinMessagesColumns.content,
          sortable: true
        }
      ]
    }
  },
  computed: {
    ...mapGetters('linkedin', [
      'getMessages'
    ]),
    wordsWithWeight () {
      const strings = convertJsonArrayToString(this.getMessages, [
        LinkedinMessagesColumns.from,
        LinkedinMessagesColumns.to,
        LinkedinMessagesColumns.subject,
        LinkedinMessagesColumns.content,
        LinkedinMessagesColumns.direction
      ])
      const stringAnalysisService = new StringAnalysisService()
      stringAnalysisService.load(strings)
      const result = stringAnalysisService.analyze(this.wordscloud.maxWords, this.wordscloud.cleanLocalized)
      return result
    },
    wordsDirectionStatistics () {
      const strings = this.getMessages.map((element) => { return element[LinkedinMessagesColumns.direction] }).join(' ')

      const stringAnalysisService = new StringAnalysisService()
      stringAnalysisService.load(strings)
      const analysis = stringAnalysisService.analyze(DefaultDonut.maxPies, this.wordscloud.cleanLocalized)

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
      const strings = this.getMessages.map((element) => { return element[LinkedinMessagesColumns.from] }).join(' ')
      const stringAnalysisService = new StringAnalysisService()
      stringAnalysisService.load(strings)
      const analysis = stringAnalysisService.analyze(DefaultDonut.maxPies, this.wordscloud.cleanLocalized)

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
      const strings = this.getMessages.map((element) => { return element[LinkedinMessagesColumns.to] }).join(' ')
      const stringAnalysisService = new StringAnalysisService()
      stringAnalysisService.load(strings)
      const analysis = stringAnalysisService.analyze(DefaultDonut.maxPies, this.wordscloud.cleanLocalized)

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
    wordsSubjectStatistics () {
      const strings = this.getMessages.map((element) => { return element[LinkedinMessagesColumns.subject] }).join(' ')
      const stringAnalysisService = new StringAnalysisService()
      stringAnalysisService.load(strings)
      const analysis = stringAnalysisService.analyze(DefaultDonut.maxPies, this.wordscloud.cleanLocalized)

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
    wordsContentStatistics () {
      const strings = this.getMessages.map((element) => { return element[LinkedinMessagesColumns.content] }).join(' ')
      const stringAnalysisService = new StringAnalysisService()
      stringAnalysisService.load(strings)
      const analysis = stringAnalysisService.analyze(DefaultDonut.maxPies, this.wordscloud.cleanLocalized)

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
        },
        {
          name: 'Subject',
          data: this.wordsSubjectStatistics
        },
        {
          name: 'Content',
          data: this.wordsContentStatistics
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
    formatDirection (val, row) {
      if (val === LinkedinMessagesDirection.in) {
        return '\u{1f4e5} In'
      } else if (val === LinkedinMessagesDirection.out) {
        return '\u{1f4e4} Out'
      } else {
        return val
      }
    }
  }
}
</script>
