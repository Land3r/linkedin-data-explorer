<template>
  <q-select
    :name="name"
    :label="label"
    :options="fonts"
    :v-model="v-model">
    <template v-slot:option="scope">
      <q-item
        v-bind="scope.itemProps"
        v-on="scope.itemEvents"
      >
        <q-item-section>
          <q-item-label v-html="scope.opt"
          :style="'font-family: ' + scope.opt"/>
          <q-item-label caption>{{ scope.opt.description }}</q-item-label>
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
    'v-model': {
      type: Object,
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
  }
}
</script>
