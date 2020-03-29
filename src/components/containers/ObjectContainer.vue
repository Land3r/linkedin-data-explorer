<template>
  <div class="q-pa-md">
    <div class="text-h6 object-container-title">{{title}}</div>
    <div ref="objectContainer" style="white-space:wrap !important">
    </div>
  </div>
</template>

<style lang="scss">
.object-container-title {
  text-align: center
}

// Overrides the words non wrapping on the next line
.json-formatter-row .json-formatter-string {
  white-space: normal
}
</style>

<script>
import JSONFormatter from 'json-formatter-js'

export default {
  name: 'ObjectContainer',
  props: {
    title: {
      type: String,
      required: false
    },
    data: {
      type: [Object, Array],
      required: true
    }
  },
  data () {
    return {
    }
  },
  computed: {
    formattedJson () {
      return new JSONFormatter(this.data).render()
    }
  },
  mounted () {
    this.$refs.objectContainer.appendChild(this.formattedJson)
  }
}
</script>
