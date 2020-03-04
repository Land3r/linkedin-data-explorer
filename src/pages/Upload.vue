<template>
  <q-page class=''>
    <upload-area @load="onFileLoaded($event)">

    </upload-area>
    <output id="dropzone_files">
      {{uploadtext}}
    </output>
  </q-page>
</template>

<style lang="scss">

</style>

<script>
import UploadArea from '../components/UploadArea'
import { convertToJson } from '../services/CsvToJsonService'
import { LinkedinFileName } from '../data/linkedin-filenames'

import { vuexNamespaced } from '../helpers/vuexHelper'
import * as actionstypes from '../store/linkedin/actions-types'

export default {
  name: 'UploadPage',
  components: {
    'upload-area': UploadArea
  },
  data () {
    return {
      uploadtext: ''
    }
  },
  methods: {
    /**
     * Event receiver for when a file is fully loaded.
     */
    onFileLoaded (file) {
      let result = ''

      switch (file.name.toLowerCase()) {
        case LinkedinFileName.connections.toLowerCase():
          console.log('File connections detected...')
          this.$store.dispatch(vuexNamespaced('linkedin', actionstypes.LOAD_CONNECTIONS), file.result)
          break
        case LinkedinFileName.contacts.toLowerCase():
          console.log('File contacts detected...')
          break
        case LinkedinFileName.invitations.toLowerCase():
          console.log('File invitations detected...')

          result = convertToJson(file.result)
          result.then((res) => console.dir(res))
          break
        case LinkedinFileName.messages.toLowerCase():
          console.log('File messages detected...')
          break
        case LinkedinFileName.profile.toLowerCase():
          console.log('File profile detected...')
          break
        case LinkedinFileName.recommendationsGiven.toLowerCase():
          console.log('File recommendations given detected...')
          break
        case LinkedinFileName.recommendationsReceived.toLowerCase():
          console.log('File recommendations received detected...')
          break
        case LinkedinFileName.registrations.toLowerCase():
          console.log('File registration detected...')
          break
        default:
          console.error(`Unknown file detected : ${file.name}`)
          break
      }

      this.uploadtext += `File ${file.name}: ${file.result} \r\n`
    }
  }
}
</script>
