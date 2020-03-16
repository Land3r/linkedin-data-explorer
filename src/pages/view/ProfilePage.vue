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
          </q-tab-panel>

          <q-tab-panel name="charts">
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

import WordsCloudContainer from 'components/containers/WordsCloudContainer'
import NavigationBar from 'components/navigation/NavigationBar'
import StringAnalysisService from 'services/StringAnalysisService'
import { convertJsonToString } from 'helpers/stringHelper'
import { LinkedinTypesDetails, LinkedinTypes, LinkedinProfileColumns } from 'data/linkedin'

export default {
  name: 'ProfilePage',
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
          label: LinkedinTypesDetails.find((elm) => elm.id === LinkedinTypes.profile).name,
          icon: LinkedinTypesDetails.find((elm) => elm.id === LinkedinTypes.profile).icon
        }
      ],
      activeTab: 'raw',
      wordscloud: {
        maxWords: 100,
        cleanLocalized: true
      }
    }
  },
  computed: {
    ...mapGetters('linkedin', [
      'getProfile'
    ]),
    wordsWithWeight () {
      const strings = convertJsonToString(this.getProfile, [
        LinkedinProfileColumns.firstName,
        LinkedinProfileColumns.lastName,
        LinkedinProfileColumns.maidenName,
        LinkedinProfileColumns.address,
        LinkedinProfileColumns.birthDate,
        LinkedinProfileColumns.headline,
        LinkedinProfileColumns.summary,
        LinkedinProfileColumns.industry,
        LinkedinProfileColumns.zipCode,
        LinkedinProfileColumns.geoLocation,
        LinkedinProfileColumns.twitterHandles,
        LinkedinProfileColumns.websites,
        LinkedinProfileColumns.instantMessengers
      ])
      const stringAnalysisService = new StringAnalysisService()
      stringAnalysisService.load(strings)
      const result = stringAnalysisService.analyze(this.wordscloud.maxWords, this.wordscloud.cleanLocalized)
      return result
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
