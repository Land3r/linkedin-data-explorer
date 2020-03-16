<template>
  <div class="q-pa-md">
    <q-table
      :title="title"
      :data="data"
      :columns="columns"
      row-key="Row"
      :pagination.sync="pagination"
    />
  </div>
</template>

<style lang="scss">

</style>

<script>
export default {
  name: 'TableContainer',
  props: {
    title: {
      type: String,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      pagination: {
        rowsPerPage: 50
      }
    }
  }
}
</script>
