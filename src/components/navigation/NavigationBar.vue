<template>
  <div class="q-pa-md q-gutter-sm">
    <q-breadcrumbs>
      <q-breadcrumbs-el
        v-for="(breadcrumb, key) in breadcrumbs"
        v-bind:key="key"
        v-bind:label="breadcrumb.label"
        v-bind:icon="breadcrumb.icon"
        v-bind:to="breadcrumb.to"
      />
    </q-breadcrumbs>
  </div>
</template>

<style lang="scss">
</style>

<script>
/**
 * Navigation Bar component.
 */
export default {
  name: 'NavigationBar',
  props: {
    breadcrumbs: {
      type: Array,
      required: true
      /**
       * Example: [
        {
          icon: 'fab fa-linkedin'
        },
        {
          label: 'Data Overview',
          icon: 'widgets',
          to: { name: 'DataOverviewPage' }
        },
        {
          label: 'Connections',
          icon: 'transfer_within_a_station'
        }
      ],
       */
    }
  }
}
</script>
