<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Linkedin Data Visualizer
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item
        :to="{ name: 'DataOverviewPage' }">
          <q-item-label
            header
            class="text-grey-8"
          >
          <q-icon name="fab fa-linkedin" size="md" color="primary"/>
            Linkedin Data Visualizer
          </q-item-label>
        </q-item>
        <q-separator />
        <navigation-menu-link
        v-bind="{
          title: 'Upload',
          label: '',
          icon: 'cloud_upload',
          link: 'UploadPage'
        }"
        />
        <q-separator />
        <navigation-menu-link
          v-for="link in getActiveViewsDetails"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import NavigationMenuLink from 'components/navigation/NavigationMenuLink'
import { LinkedinTypesDetails } from '../data/linkedin'

export default {
  name: 'MainLayout',
  components: {
    'navigation-menu-link': NavigationMenuLink
  },
  data () {
    return {
      leftDrawerOpen: false
    }
  },
  computed: {
    ...mapGetters('linkedin', [
      'getActiveViews'
    ]),
    getActiveViewsDetails () {
      return this.getActiveViews.map((element) => ({
        title: LinkedinTypesDetails.find((elm) => elm.id === element.id).name,
        caption: '',
        icon: LinkedinTypesDetails.find((elm) => elm.id === element.id).icon,
        link: LinkedinTypesDetails.find((elm) => elm.id === element.id).page
      }))
    }
  }
}
</script>
