<template>
  <div v-if="!isFileReaderAvailable">
    <q-banner dense inline-actions class="text-white bg-red">
      Your browser doesn't support FileReader API. Please use a modern browser.
      <template v-slot:action>
        <q-btn flat color="white" label="See supported browsers" type="a" target="_blank" href="https://caniuse.com/filereader"/>
      </template>
    </q-banner>
  </div>
  <div v-else>
    <label class="text-reader">
      <input type="file" @change="loadTextFromFile" multiple>
    </label>
  </div>
</template>

<style lang='scss'>

</style>

<script>
export default {
  name: 'UploadArea',
  props: {
  },
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
    /**
     * Gets whether or not the HTML5 FileReader API is available.
     */
    isFileReaderAvailable () {
      if (window.File && window.FileReader && window.FileList && window.Blob) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    /**
     * Gets the file as text, using the HTML5 FileReader API.
     */
    loadTextFromFile (ev) {
      // Multiple files or only one file ?
      if (ev.target.files.length > 0) {
        Array.from(ev.target.files).forEach(file => {
          const reader = new FileReader()
          reader.onload = e => this.$emit('load', {
            name: file.name,
            result: e.target.result
          })
          reader.readAsText(file)
        })
      }
    }
  }
}
</script>
