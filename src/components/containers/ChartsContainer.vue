<template>
  <div>
    <div class="row">
      <div
        class="col-6"
        v-for="(chartData, key) in data"
        v-bind:key="key"
      >
        <span class="text-h6">{{chartData.name}}</span>
        <donut-chart :data="chartData.data" :options="chartOptions"/>
      </div>
    </div>
  </div>
</template>

<style lang="scss">

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
