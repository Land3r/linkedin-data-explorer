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
    <label class="text-reader" v-show="false">
      <input ref="input_file" type="file" @change="loadFileListFromInput" multiple>
    </label>
    <div
      class="dropzone q-pa-lg"
      v-bind:class="{'is-dragover':isDrag}"
      @click="$refs.input_file.click()"
      @drag="handleDrag"
      @dragstart="handleDrag"
      @dragenter="handleDrag"
      @dragover="handleDrag"
      @dragend="handleDrag"
      @dragleave="handleDrag"
      @drop="loadFileListFromDrop"
      >
      <div class="dropzone-content">
        <h3 class="dropzone-title">Drag in your Linkedin export</h3>
        <q-icon name="fab fa-linkedin" color="primary" size="xl" />
        <div class="dropzone-subtitle">... or click to select a file from your computer</div>
      </div>
    </div>
  </div>
</template>

<style lang='scss'>
.dropzone {
  min-width: 200px;
  background-color: #47617521;
  cursor: pointer;
  border: dashed #5678924b;

  &:hover {
    background-color: #56789280;
    border-color: #5678924b;
    border-style: inset;
  }

  &-content {
    text-align: center;
  }

  &-title {
    margin-top: 0;
    margin-bottom: 0.5em;
    color: #00b782;
  }

  &-subtitle {
  margin-top: 1em;
  color: #314b5f;
}
}

.is-dragover {
  background-color: #56789280;
  border-style: inset;
}
</style>

<script>
export default {
  name: 'UploadArea',
  data () {
    return {
      isDrag: false
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
     * Gets the FileList of the input event.
     */
    loadFileListFromInput (ev) {
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
    },
    /**
     * Gets the FileList of the drop event.
     */
    loadFileListFromDrop (ev) {
      if (ev.dataTransfer.files.length > 0) {
        Array.from(ev.dataTransfer.files).forEach(file => {
          const reader = new FileReader()
          reader.onload = e => this.$emit('load', {
            name: file.name,
            result: e.target.result
          })
          reader.readAsText(file)
        })
      }
    },
    /**
     * Handles the dragstyles updates.
     */
    handleDrag (event) {
      if (event.type === 'dragover' || event.type === 'dragenter') {
        this.isDrag = true
      } else if (event.type === 'dragleave' || event.type === 'dragend') {
        this.isDrag = false
      }
      event.preventDefault()
      event.stopPropagation()
    }
  }
}
</script>
