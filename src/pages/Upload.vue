<template>
  <q-page>
    <navigation-bar :breadcrumbs="breadcrumbs" />
    <div class='flex flex-center'>
    <upload-area @load="onFileLoaded($event)">
    </upload-area>
    </div>
  </q-page>
</template>

<style lang="scss">
</style>

<script>
import NavigationBar from 'components/navigation/NavigationBar'
import UploadArea from 'components/UploadArea'
import { LinkedinFileName } from 'data/linkedin'

import { vuexNamespaced } from 'helpers/vuexHelper'
import * as actionstypes from 'store/linkedin/actions-types'

export default {
  name: 'UploadPage',
  components: {
    'navigation-bar': NavigationBar,
    'upload-area': UploadArea
  },
  data () {
    return {
      breadcrumbs: [
        {
          icon: 'fab fa-linkedin'
        },
        {
          label: 'Upload',
          icon: 'cloud_upload'
        }
      ]
    }
  },
  methods: {
    /**
     * Event receiver for when a file is fully loaded.
     */
    onFileLoaded (file) {
      switch (file.name.toLowerCase()) {
        case LinkedinFileName.connections.toLowerCase():
          console.log('File connections detected...')
          this.$store.dispatch(vuexNamespaced('linkedin', actionstypes.LOAD_CONNECTIONS), file.result)
          break
        case LinkedinFileName.contacts.toLowerCase():
          console.log('File contacts detected...')
          this.$store.dispatch(vuexNamespaced('linkedin', actionstypes.LOAD_CONTACTS), file.result)
          break
        case LinkedinFileName.invitations.toLowerCase():
          console.log('File invitations detected...')
          this.$store.dispatch(vuexNamespaced('linkedin', actionstypes.LOAD_INVITATIONS), file.result)
          break
        case LinkedinFileName.messages.toLowerCase():
          console.log('File messages detected...')
          this.$store.dispatch(vuexNamespaced('linkedin', actionstypes.LOAD_MESSAGES), file.result)
          break
        case LinkedinFileName.profile.toLowerCase():
          console.log('File profile detected...')
          this.$store.dispatch(vuexNamespaced('linkedin', actionstypes.LOAD_PROFILE), file.result)
          break
        case LinkedinFileName.recommendationsGiven.toLowerCase():
          console.log('File recommendations given detected...')
          this.$store.dispatch(vuexNamespaced('linkedin', actionstypes.LOAD_RECOMMENDATIONS_GIVEN), file.result)
          break
        case LinkedinFileName.recommendationsReceived.toLowerCase():
          console.log('File recommendations received detected...')
          this.$store.dispatch(vuexNamespaced('linkedin', actionstypes.LOAD_RECOMMENDATIONS_RECEIVED), file.result)
          break
        case LinkedinFileName.registrations.toLowerCase():
          console.log('File registration detected...')
          this.$store.dispatch(vuexNamespaced('linkedin', actionstypes.LOAD_REGISTRATIONS), file.result)
          break
        default:
          console.error(`Unknown file detected : ${file.name}`)
          break
      }
    }
  }
}
</script>
