<template>
  <div>
    <div class="text-h6">Words</div>
    <div>
      <div style="min-width: 200px;max-width: 30%;">
        <q-list bordered class="rounded-borders">
          <q-expansion-item
            switch-toggle-side
            expand-separator
            icon="perm_identity"
            label="Settings"
          >
            <q-card>
              <q-card-section>
                <label>Maximum words
                  <q-slider
                    v-model="maxWords"
                    :min="5"
                    :max="300"
                    label
                  />
                </label>
                <q-select
                  label="Font Family"
                  v-model="fontFamily"
                />
                <q-btn-toggle
                  name="Color"
                />
                <q-btn-toggle
                  name="Orientation"
                />
                <label>Font Size Ratio
                  <q-slider
                    v-model="wordsSpacing"
                    :min="0"
                    :max="300"
                    label
                    :label-value="value + '%'"
                  />
                </label>
                <label>Font Size Ratio
                  <q-slider
                    v-model="fontSizeRatio"
                    :min="0"
                    :max="100"
                    label
                    :label-value="value + '%'"
                  />
                </label>
              </q-card-section>
            </q-card>
          </q-expansion-item>

        </q-list>
      </div>
      <div>
        <div style="height: 500px;">
          <vue-word-cloud
            :words="words"
            :color="([, weight]) => weight > 10 ? 'DeepPink' : weight > 5 ? 'RoyalBlue' : 'Indigo'"
            font-family="Roboto"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
</style>

<script>
import VueWordCloud from 'vuewordcloud'

export default {
  name: 'WordsCloudContainer',
  props: {
    words: {
      type: Array,
      required: true
    }
  },
  components: {
    'vue-word-cloud': VueWordCloud
  },
  data () {
    return {
      maxWords: 100,
      fontFamily: 'Arial',
      colorScheme: null,
      orientationScheme: null,
      wordsSpacing: 20,
      fontSizeRatio: 20
    }
  }
}
</script>
