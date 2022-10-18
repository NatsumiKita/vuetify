<template>
  <div>
    <!-- the grid -->
    <wj-flex-grid
    :autoGenerateColumns="false"
    :allowAddNew="true"
    :allowDelete="true"
    :allowPinning="'SingleColumn'"
    :newRowAtTop="true"
    :showMarquee="true"
    :selectionMode="'MultiRange'"
    :validateEdits="false"
    :initialized="gridInitialized"
  >
    <wj-flex-grid-filter
      :filterColumns="['id', 'date', 'productId','price','discount', 'active']"
    />
      <wj-flex-grid-column binding="id" header="ID" :width="70" :isReadOnly="true" />
      <wj-flex-grid-column binding="date" header="日付" format="d" :isRequired="false" :width="130"
        :editor="editors.inputDate">
      </wj-flex-grid-column>
      <wj-flex-grid-column binding="price" header="金額" format="c" :isRequired="false" :width="100"/>
      <wj-flex-grid-column binding="productId" header="商品" :dataMap="buildDataMap(['ウィジェット','ガジェット','ツール'])" :width="145" />
      <wj-flex-grid-column binding="discount" header="値引" format="p0" :width="130" />
      <wj-flex-grid-column binding="active" header="有効" :width="100" />
  </wj-flex-grid>
  {{_createItemsSource(1)}}
  <br/>
  <wj-input-number :format="'c0'"  v-model="money"></wj-input-number>
  <wj-input-date :initialized="initDate"></wj-input-date>
  <br/>
  {{ theDate.value | formatDateTime }}
  </div>
</template>
<script>
import '@grapecity/wijmo.touch';
import '@grapecity/wijmo.vue2.grid';
import '@grapecity/wijmo.vue2.grid.grouppanel';
import '@grapecity/wijmo.vue2.grid.filter'
import "@grapecity/wijmo.vue2.grid.search";
import '@grapecity/wijmo.vue2.input';
import * as wjCore from '@grapecity/wijmo';
import * as wjGrid from '@grapecity/wijmo.grid';
import { InputDate} from "@grapecity/wijmo.input";
import {DataService} from "./test3data";
import "@grapecity/wijmo.vue2.core";

export default {
  data () {
    return {
      theDate: '',
      theInputDateTime: {},
      money: 12345,
      lastId: 10,
      itemsCount: 10,
      // editors
      editors: {
        inputDate: new InputDate(document.createElement('div'), {
          format: 'd',
          isRequired: false
        }),
      }
    };
  },
  created: function () {
    this.dataService = new DataService();
  },
  methods: {
    initDate: function (date) {
      this.theDate = date;
    },
    buildDataMap(items) {
      let map = [];
      for (let i = 0; i < items.length; i++) {
        map.push({ key: i, value: items[i] });
      }
      return new wjGrid.DataMap(map, 'key', 'value');
    },
    gridInitialized: function (ctl) {
      this.flex = ctl;
      this.flex.itemsSource = this._createItemsSource(10);
      if (this.groupPanel) {
        this.groupPanel.grid = this.flex;
      }
      if (this.search) {
        this.search.grid = this.flex;
      }
    },
    _createItemsSource(counter) {
      const data = this.dataService.getData(counter);
      const view = new wjCore.CollectionView(data, {
        getError: (function (item, prop) {
          const displayName = this.flex.columns.getColumn(prop).header;
          return this.dataService.validate(item, prop, displayName);
        }).bind(this)
      });
      view.collectionChanged.addHandler((function (s, e) {
        if (e.action === wjCore.NotifyCollectionChangedAction.Add) {
          e.item.history = this.dataService.getHistoryData();
          e.item.id = this.lastId;
          this.lastId ++;
        }
      }).bind(this));
      return view;
    },
  },
  filters: {
    formatDateTime: function (value) {
      return wjCore.Globalize.format(value, "D");
    },
  },}
</script>

<style scoped>
    /* @import "./node_modules/bootstrap/dist/css/bootstrap.css"; */
    @import "../../node_modules/@grapecity/wijmo.styles/wijmo.css";
    @import url('https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.1.0/css/flag-icon.css');

    body {
        font-size:10px;
    }

    .wj-flexgridsearch {
        width: 100%;
    }

    .wj-flexgrid {
        height: 330px;
    }

    .wj-flexgrid .wj-cell {
        padding: 7px;
        border:none;
    }

    .wj-cell.wj-state-invalid:not(.wj-header)::after {
        top: -14px;
        border: 14px solid transparent;
        border-right-color: red;
    }

    .flag-icon {
        box-shadow: 1px 1px 4px rgba(0,0,0,0.4);
    }

    .color-tile {
        display: inline-block;
        position: relative;
        width: 1em;
        height: 1em;
        border-radius: 50%;
        box-shadow: 1px 1px 4px rgba(0,0,0,0.4);
        vertical-align: middle;
    }

    .change-up {
        color: darkgreen;
    }
    .change-up:after {
        content: '\25b2';
    }
    .change-down {
        color: darkred;
    }
    .change-down:after {
        content: '\25bc';
    }

    .cell-rating {
        font-size: 12px;
    }

    .wj-flexgrid .wj-detail {
        padding: 2px 8px;
    }
</style>
