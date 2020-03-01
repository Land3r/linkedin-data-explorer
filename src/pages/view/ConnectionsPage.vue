<template>
  <q-page>
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" :to="{ name: 'HomePage' }" />
        <q-breadcrumbs-el label="Data overview" icon="widgets" :to="{ name: 'DataOverviewPage' }" />
        <q-breadcrumbs-el label="Connections" icon="transfer_within_a_station" />
      </q-breadcrumbs>
    </div>

    <div>
      Temp
      <q-btn @click="doClick" label="Test"/>
    </div>

    <div class="q-pa-md">
      <div class="q-gutter-y-md">
      <q-card>
        <q-tabs
          v-model="activeTab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="raw" label="Raw data" icon="view_list" />
          <q-tab name="charts" label="Charts" icon="bar_chart" />
          <q-tab name="words" label="Word cloud" icon="translate" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="activeTab" animated>
          <q-tab-panel name="raw">
            <div class="q-pa-md">
              <q-table
                title="Connections"
                :data="data"
                :columns="columns"
                row-key="Row"
                :selected-rows-label="getSelectedString"
                selection="multiple"
                :selected.sync="selected"
              />
            </div>
          </q-tab-panel>

          <q-tab-panel name="charts">
            <div class="text-h6">Alarms</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="words">
            <div class="text-h6">Words</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
    </div>
  </q-page>
</template>

<style lang="scss">

</style>

<script>
import { CsvToJsonService } from '../../services/CsvToJsonService'
import sample from '../../samples/connections.json'

export default {
  name: 'ConnectionsPage',
  data () {
    return {
      activeTab: 'raw',
      columns: [
        {
          name: 'firstname',
          label: 'Firstname',
          align: 'left',
          field: 'First Name',
          sortable: true
        },
        {
          name: 'lastname',
          align: 'center',
          label: 'Lastname',
          field: 'Last Name',
          sortable: true
        },
        {
          name: 'email',
          align: 'center',
          label: 'Email',
          field: 'Email Address',
          sortable: true
        },
        {
          name: 'company',
          align: 'center',
          label: 'Company',
          field: 'Company',
          sortable: true
        },
        {
          name: 'position',
          align: 'center',
          label: 'Position',
          field: 'Position',
          sortable: true
        },
        {
          name: 'connectedon',
          align: 'center',
          label: 'Connected On',
          field: 'Connected On',
          sortable: true
        }
      ],
      data: [
        ...sample
      ],
      selected: [
        ...sample
      ]
    }
  },
  methods: {
    getSelectedString () {
      return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.data.length}`
    },
    doClick () {
      const csvToJsonService = new CsvToJsonService()
      csvToJsonService.getSample()
    }
  }
}
</script>