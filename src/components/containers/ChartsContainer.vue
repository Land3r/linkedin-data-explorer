<template>
  <div>
    <div class="row">
      <template v-if="data.length > 0">
        <div
          class="col-6 q-pa-md chart-container"
          v-for="(chartData, key) in data"
          v-bind:key="key"
        >
          <span class="text-h6">{{chartData.name}}</span>
          <donut-chart :data="chartData.data" :options="chartOptions"/>
        </div>
      </template>
      <template v-else>
        <div
          class="col chart-container"
        >
          <span class="text-h6">No charts availables</span>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss">
.chart-container {
  text-align: center;
}
</style>

<script>
import DonutChart from 'components/charts/DonutChart'
import { DefaultChartsOptions } from 'data/chart'

export default {
  name: 'ChartsContainer',
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  components: {
    'donut-chart': DonutChart
  },
  computed: {
    chartOptions () {
      return {
        ...DefaultChartsOptions
      }
    }
  }
}
</script>
