<template>
  <q-page>
    <navigation-bar :breadcrumbs="breadcrumbs"/>
  </q-page>
</template>

<script>
import NavigationBar from 'components/navigation/NavigationBar'

export default {
  name: 'DataOverviewPage',
  components: {
    'navigation-bar': NavigationBar
  },
  data () {
    return {
      breadcrumbs: [
        {
          icon: 'fab fa-linkedin'
        },
        {
          label: 'Data Overview',
          icon: 'widgets'
        }
      ]
    }
  }
}
</script>
