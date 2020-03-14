<template>
  <q-select
    :name="name"
    ref="fontSelect"
    :label="label"
    :options="fonts"
    :value="value"
    @input="updateModel($event)">

    <template v-slot:selected>
      <q-item>
        <q-item-section>
          <q-item-label v-html="value"
          :style="'font-family: ' + value"/>
        </q-item-section>
      </q-item>
    </template>

    <template v-slot:option="scope">
      <q-item
        v-bind="scope.itemProps"
        v-on="scope.itemEvents"
      >
        <q-item-section>
          <q-item-label v-html="scope.opt"
          :style="'font-family: ' + scope.opt"/>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
import WebFontLoader from 'webfontloader'

export default {
  name: 'FontSelect',
  props: {
    fonts: {
      type: Array,
      required: true
    },
    value: {
      type: [Object, String],
      required: true
    },
    name: {
      type: String,
      required: false
    },
    label: {
      type: String,
      required: false
    }
  },
  data () {
    return {
    }
  },
  created () {
    console.dir([...this.fonts.map((font) => (`${font}:n4`))])
    // Load the initial font provided
    WebFontLoader.load({
      google: {
        families: [...this.fonts.map((font) => (`${font}:n4`))]
      }
    })
  },
  methods: {
    updateModel (newValue) {
      this.$emit('input', newValue)
    }
  }
}
</script>
