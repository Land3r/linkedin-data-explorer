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
        case 'Connections.csv'.toLowerCase():
          console.log('File connections detected...')
          break
        case 'Contacts.csv'.toLowerCase():
          console.log('File contacts detected...')
          break
        case 'Invitations.csv'.toLowerCase():
          console.log('File invitations detected...')

          result = convertToJson(file.result)
          result.then((res) => console.dir(res))
          break
        case 'Messages.csv'.toLowerCase():
          console.log('File messages detected...')
          break
        case 'Profile.csv'.toLowerCase():
          console.log('File profile detected...')
          break
        case 'Recommendations Given.csv'.toLowerCase():
          console.log('File recommendations given detected...')
          break
        case 'Recommendations Received.csv'.toLowerCase():
          console.log('File recommendations received detected...')
          break
        case 'Registration.csv'.toLowerCase():
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
