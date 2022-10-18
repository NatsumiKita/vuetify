<template>
  <div id="test1">
    APIデータ使用
    <wj-flex-grid :itemsSource="view" :initialized="initializeGrid" allowPinning="SingleColumn" :frozenColumns="1">
      <wj-flex-grid-filter />
      <wj-flex-grid-column binding="CONT_MAINTE_NUMBER" header="契約番号" :width=100></wj-flex-grid-column>
      <wj-flex-grid-column binding="JR005_BARGAIN_NAME" header="契約件名" :width=400></wj-flex-grid-column>
      <wj-flex-grid-column binding="JR005_CUSTOMER_CODE" header="顧客" :width=100></wj-flex-grid-column>
      <wj-flex-grid-column binding="JR005_BARGAINBARGAIN_SUM" header="費用" :width=100>
        <wj-flex-grid-cell-template cellType="Cell" v-if="customCell" v-slot="cell">
            {{cell.item.JR005_BARGAINBARGAIN_SUM}}
          </wj-flex-grid-cell-template>
        </wj-flex-grid-column>
      <wj-flex-grid-column binding="active" header="編集不可"></wj-flex-grid-column>
    </wj-flex-grid>
    {{view.itemsEdited.collectionChanged._handlers}}
    <div class="col-xs-6">
      <h4>編集された項目:</h4>
      <wj-flex-grid class="changed edited"
          :itemsSource="view.itemsEdited"
          :isReadOnly="true">
          <wj-flex-grid-column binding="CONT_MAINTE_NUMBER" header="契約番号" :width=80></wj-flex-grid-column>
            <wj-flex-grid-column binding="JR005_BARGAIN_NAME" header="契約件名" :width=400></wj-flex-grid-column>
            <wj-flex-grid-column binding="JR005_CUSTOMER_CODE" header="顧客" :width=100></wj-flex-grid-column>
            <wj-flex-grid-column binding="JR005_BARGAINBARGAIN_SUM" header="費用" :width=100>
              <wj-flex-grid-cell-template cellType="Cell" v-if="customCell" v-slot="cell">
                  {{cell.item.JR005_BARGAINBARGAIN_SUM}}
              </wj-flex-grid-cell-template>
        </wj-flex-grid-column>
      </wj-flex-grid>

      <h4>追加された項目:</h4>
      <wj-flex-grid class="changed added"
          :itemsSource="view.itemsAdded"
          :isReadOnly="true">
          <wj-flex-grid-column binding="CONT_MAINTE_NUMBER" header="契約番号" :width=80></wj-flex-grid-column>
            <wj-flex-grid-column binding="JR005_BARGAIN_NAME" header="契約件名" :width=400></wj-flex-grid-column>
            <wj-flex-grid-column binding="JR005_CUSTOMER_CODE" header="顧客" :width=100></wj-flex-grid-column>
            <wj-flex-grid-column binding="JR005_BARGAINBARGAIN_SUM" header="費用" :width=100>
              <wj-flex-grid-cell-template cellType="Cell" v-if="customCell" v-slot="cell">
                  {{cell.item.JR005_BARGAINBARGAIN_SUM}}
              </wj-flex-grid-cell-template>
        </wj-flex-grid-column>
      </wj-flex-grid>

      <h4>削除された項目:</h4>
      <wj-flex-grid class="changed removed"
          :itemsSource="view.itemsRemoved"
          :isReadOnly="true">
          <wj-flex-grid-column binding="CONT_MAINTE_NUMBER" header="契約番号" :width=80></wj-flex-grid-column>
            <wj-flex-grid-column binding="JR005_BARGAIN_NAME" header="契約件名" :width=400></wj-flex-grid-column>
            <wj-flex-grid-column binding="JR005_CUSTOMER_CODE" header="顧客" :width=100></wj-flex-grid-column>
            <wj-flex-grid-column binding="JR005_BARGAINBARGAIN_SUM" header="費用" :width=100>
              <wj-flex-grid-cell-template cellType="Cell" v-if="customCell" v-slot="cell">
                  {{cell.item.JR005_BARGAINBARGAIN_SUM}}
              </wj-flex-grid-cell-template>
        </wj-flex-grid-column>
      </wj-flex-grid>
    </div>
  </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "@grapecity/wijmo.vue2.grid";
import * as wijmo from "@grapecity/wijmo";
import { getData } from "./test1data";
import * as wjcGrid from "@grapecity/wijmo.grid";
import "@grapecity/wijmo.vue2.grid.filter";

export default {
  data () {
    return {
      theItem: {},
      view: [],
      customCell: true,
      customCellEdit: true
    }
  },
  async created () {
    this.getApiData()
  },
  methods: {
    initializeGrid (flex) {
      flex.beginningEdit.addHandler((s, e) => {
        this.eventLog = '';
        let col = s.columns[e.col];
        if (col.binding != 'active') {
          console.log(e)
            let item = s.rows[e.row].dataItem;
            if (item.active) { // prevent editing overdue items
              e.cancel = true;
              this.eventLog = '期限切れの項目は編集できません。';
            }
          }
      });
      flex.columnFooters.rows.push(new wjcGrid.GroupRow());
    },
    async getApiData () {
        this.view = new wijmo.CollectionView(await getData(), {
        sortDescriptions: ["CONT_MAINTE_NUMBER"],
        getError: this.getError,
        trackChanges: true
      })
    },
    validateForm: function(input) {
      let propName = input.CONT_MAINTE_NUMBER;
      this.theItem[propName] = input.value;
      input.setCustomValidity(this.view.getError(this.theItem, propName));
    },
    getError(item, propName) {
    // getError() {
        switch (propName) {
        // case 'country':
        //     return countries.indexOf(item.country) < 0 ? '無効な国です。' : '';
        // case 'downloads':
        // case 'sales':
        case 'JR005_BARGAINBARGAIN_SUM':
            return item[propName] < 0 ? '負の値は入力できません。' : '';
        // case 'active':
        //     return item.active && item.country.match(/^(アメリカ|イギリス)$/)
        //         ? 'アメリカとイギリスでは有効にできません。'
        //         : '';
        case null: {
          let errors = [];
          for (let key in item) {
              let err = this.getError(item, key);
              if (err) errors.push(err);
          }
          return errors.length > 1
            ? 'この項目では ' + errors.length + ' 個のエラーがあります。'
            : (errors.length == 1 ? errors[0] : null);
        }
      }
        return null;
    }
  }
}
</script>
<style scoped>
#test1 {
  padding:20px;
}
.wj-flexgrid {
  max-height: 500px;
  max-width: 100%;
}
</style>