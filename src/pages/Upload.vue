<template>
  <q-page class=''>
    <FileUploadArea></FileUploadArea>
  </q-page>
</template>

<script>
import FileUploadArea from '../components/FileUploadArea'

export default {
  name: 'PageIndex',
  components: {
    FileUploadArea: FileUploadArea
  }
}
</script>
