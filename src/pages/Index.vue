<template>
  <q-page class='flex flex-center'>
      <vue-dropzone
      ref="fileDropzone"
      id="dropzone"
      class="q-ma-md"
      :useCustomSlot=true
      :options="dropzoneOptions"
      @vdropzone-files-added="filesAdded"
      >
        <div class="dropzone-custom-content">
          <h4 class="dropzone-custom-title">Drag and drop to upload content!</h4>
          <q-icon name="fab fa-linkedin" size="xl" color="primary" />
          <div class="subtitle">...or click to select a file from your computer</div>
        </div>
      </vue-dropzone>
  </q-page>
</template>

<style lang="scss">
.vue-dropzone {
  border: 2px dashed #e5e5e5
}

.dz-drag-over {
  background-color: red !important
}

.dropzone-custom-content {
  text-align: center;
}

.dropzone-custom-title {
  margin-top: 0;
  color: #00b782;
}

.subtitle {
  color: #314b5f;
}
</style>

<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
  name: 'PageIndex',
  components: {
    'vue-dropzone': vue2Dropzone
  },
  data () {
    return {
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 150
      }
    }
  },
  methods: {
    filesAdded (files) {
      const file = files[0]
      const reader = new FileReader()
      reader.onload = e => this.$emit('load', () => {
        console.log('Loaded')
        console.log(reader.result)
      })
      reader.readAsDataURL(file)
    },
    formaction () {
      console.log('Finished::')
    }
  }
}
</script>
