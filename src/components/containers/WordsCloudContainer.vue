<template>
  <div>
    <div class="row">
      <div class="col">
        <q-list bordered class="rounded-borders">
          <q-expansion-item
            switch-toggle-side
            expand-separator
            icon="settings"
            label="Settings"
          >
            <q-card>
              <q-card-section>
                <div class="row">
                  <div class="col q-pa-md">
                    <label>Maximum words
                      <q-slider
                        v-model="maxWords"
                        :min="5"
                        :max="300"
                        label
                      />
                    </label>
                    <br />
                    <label>Enable Language Cleaning
                      <q-toggle
                        v-model="cleanLocalized"
                        icon="verified_user"
                      />
                    </label>
                    <br />
                    <label>Font Family
                      <font-select
                        label="Font Family"
                        :fonts="available.fonts.families"
                        v-model="fontFamily"
                      />
                    </label>
                    <br />
                    <label>Font Spacing
                      <q-slider
                        v-model="wordsSpacing"
                        :min="0"
                        :max="300"
                        label
                        :label-value="wordsSpacing + '%'"
                      />
                    </label>
                    <br />
                    <label>Font Size Ratio
                      <q-slider
                        v-model="fontSizeRatio"
                        :min="0"
                        :max="10"
                        label
                        :label-value="fontSizeRatio * 100 + '% d\'écart'"
                      />
                    </label>
                  </div>
                  <div class="col q-pa-md">
                    <label>Random Coloring ?
                      <q-toggle
                        v-model="randomColoring"
                      />
                    </label>
                    <br />
                    <label>Color Schemes
                      <br />
                      <q-radio
                        v-model="colors"
                        v-for="(color, key) in available.colors.schemes"
                        v-bind:key="key"
                        :val="color"
                      >
                        <template v-slot:default>
                          <img
                            :src="getColorAsset(color.svg)"
                            height="24px"
                            width="24px"
                          />
                        </template>
                      </q-radio>
                    </label>
                    <br />
                    <label>Animation
                      <q-select
                        label="Animation"
                        :options="available.animations.animations"
                        v-model="animation"
                      >
                      </q-select>
                    </label>
                    <br />
                    <label>Animation duration (in ms)
                      <q-select
                        label="Duration"
                        :options="available.animations.durations"
                        v-model="animationDuration"
                      >
                      </q-select>
                    </label>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                  </div>
                  <div class="col">
                    <label>Orientation
                      <br />
                      <q-radio
                        v-model="rotation"
                        v-for="(orientation, key) in available.rotations"
                        v-bind:key="key"
                        :val="orientation"
                      >
                        <template v-slot:default>
                          <img
                            :src="getRotationAsset(orientation.svg)"
                            height="24px"
                            width="24px"
                          />
                        </template>
                      </q-radio>
                    </label>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>

        </q-list>
      </div>
      <q-btn
        icon="fas fa-download"
        color="primary"
        outline
        type="a"
        class="float-right on-right"
        @click="onDownloadBtnClick"
      >
      </q-btn>
    </div>
    <div class="row" style="height: 500px;" ref="wordCloud">
      <vue-word-cloud
        :words="words"
        :color="coloringFunction"
        :font-family="fontFamily"
        :font-size-ratio="fontSizeRatio"
        :enter-animation="'animated ' + animation[0]"
        :leave-animation="'animated ' + animation[1]"
        @update:progress="onUpdateProgress"
        :animation-duration="animationDuration"
        :rotation="rotation.value"
        :rotation_unit="'turn'"
      />
    </div>
  </div>
</template>

<style lang="scss">
</style>

<script>
import VueWordCloud from 'vuewordcloud'
import download from 'downloadjs'

import FontSelect from 'components/form/FontSelect'
import { DefaultWordCloudConfig } from 'data/word-cloud'
import { renderNodeToPng } from 'helpers/domHelper'

export default {
  name: 'WordsCloudContainer',
  props: {
    words: {
      type: Array,
      required: true
    },
    changeMaxWords: {
      type: Function,
      required: false
    },
    changeCleanLocalized: {
      type: Function,
      required: false
    }
  },
  components: {
    'vue-word-cloud': VueWordCloud,
    'font-select': FontSelect
  },
  data () {
    return {
      maxWords: 100,
      cleanLocalized: true,
      fontFamily: DefaultWordCloudConfig.fonts.families[0],
      colorScheme: null,
      orientationScheme: null,
      wordsSpacing: 20,
      fontSizeRatio: 8,
      animation: DefaultWordCloudConfig.animations.animations[0],
      animationDuration: DefaultWordCloudConfig.animations.durations[1],
      easing: DefaultWordCloudConfig.animations.easings[0],
      colors: DefaultWordCloudConfig.colors.schemes[2],
      randomColoring: false,
      rotation: DefaultWordCloudConfig.rotations[0],
      available: {
        ...DefaultWordCloudConfig
      }
    }
  },
  methods: {
    getColorAsset (imageName) {
      var colors = require.context('assets/colors/', false, /\.svg$/)
      return colors(`./${imageName}.svg`)
    },
    getRotationAsset (rotationName) {
      var rotations = require.context('assets/rotations/', false, /\.svg$/)
      return rotations(`./${rotationName}.svg`)
    },
    onUpdateProgress (updateState) {
      if (updateState === null) {
        this.$q.loadingBar.stop()
      } else if (updateState.completedWords === 0) {
        this.$q.loadingBar.start()
      } else if (updateState.completedWords === updateState.totalWords) {
        this.$q.loadingBar.stop()
      } else {
        this.$q.loadingBar.increment(updateState.completedWords / updateState.totalWords)
      }
    },
    onDownloadBtnClick () {
      renderNodeToPng(this.$refs.wordCloud)
        .then((image) => {
          download(image, 'wordcloud.png', 'image/png')
        })
        .catch((error) => {
          console.error(error)
        })
    }
  },
  computed: {
    coloringFunction () {
      if (this.randomColoring) {
        return DefaultWordCloudConfig.colors.functions.rdncolor(...this.colors.colors)
      } else {
        if (this.colors.length === 2) {
          return DefaultWordCloudConfig.colors.functions.bicolor(...this.colors.colors)
        } else if (this.colors.length === 3) {
          return DefaultWordCloudConfig.colors.functions.tricolor(...this.colors.colors)
        } else if (this.colors.length === 4) {
          return DefaultWordCloudConfig.colors.functions.quadricolor(...this.colors.colors)
        } else {
          return DefaultWordCloudConfig.colors.functions.rdncolor(...this.colors.colors)
        }
      }
    }
  },
  watch: {
    maxWords: function (newValue, oldValue) {
      if (this.changeMaxWords) {
        this.changeMaxWords(newValue)
      }
    },
    cleanLocalized: function (newValue, oldValue) {
      if (this.changeCleanLocalized) {
        this.changeCleanLocalized(newValue)
      }
    }
  },
  beforeDestroy: function () {
    // Ensures to stop the loading bar and dispose of it.
    this.$q.loadingBar.stop()
  }
}
</script>
