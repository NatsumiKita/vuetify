<template>
  <div class="hello" v-if="display">
    <div style="padding:10px;">
      <v-btn color="primary" @click="addData">追加</v-btn>
    </div>
    <wj-flex-grid :itemsSource="gridData1">
      <wj-flex-grid-filter />
      <wj-flex-grid-column header="ID" binding="id" :width="60"></wj-flex-grid-column>
      <wj-flex-grid-column header="商品名" binding="product" :width="200" :isRequired="true"></wj-flex-grid-column>
      <wj-flex-grid-column header="受注日" binding="date" :width="120"></wj-flex-grid-column>
      <wj-flex-grid-column header="金額" binding="amount" :width="100" format="c"></wj-flex-grid-column>
      <wj-flex-grid-column header="年度" binding="year" :width="100" isReadOnly="true"></wj-flex-grid-column>
    </wj-flex-grid>
    <div>
      <wj-multi-row :itemsSource="gridData" ref="mr"  trackChanges=true style="max-height: 500px;">
        <wj-flex-grid-filter />
        <wj-multi-row-cell-template cellType="TopLeft">
        </wj-multi-row-cell-template>
        <wj-multi-row-cell-template  :width="100" cellType="RowHeader" v-slot="cell">
          {{cell.row.index / ($refs.mr.control.columnHeaders.rows.length - 1) + 1}}
        </wj-multi-row-cell-template>
        <wj-multi-row-cell-group>
          <wj-multi-row-cell binding='year' header="年度" :width="100" align='right'>
          </wj-multi-row-cell>
        </wj-multi-row-cell-group>
        <wj-multi-row-cell-group >
          <wj-multi-row-cell binding='sales' header="売上" :width="100" format="c" cssClass='profit-cell'>
          </wj-multi-row-cell>
          <wj-multi-row-cell binding='expenses' header="費用" :width="100" format="c">
          </wj-multi-row-cell>
        </wj-multi-row-cell-group>
        <wj-multi-row-cell-group >
          <wj-multi-row-cell header="利益" isReadOnly="true" :width="100">
            <wj-multi-row-cell-template cellType="Cell" v-slot="cell">
              <span :style= "{color:(cell.item.sales >cell.item.expenses ?'green':'red')}">
                {{format(cell.item.sales - cell.item.expenses)}}
              </span>
            </wj-multi-row-cell-template>
          </wj-multi-row-cell>
        </wj-multi-row-cell-group>
        <wj-multi-row-cell-group>
          <wj-multi-row-cell header="国" binding="country" :dataMap="buildDataMap(['アメリカ','日本', 'フランス'])">
          </wj-multi-row-cell>
        </wj-multi-row-cell-group>
        <wj-multi-row-cell-group>
          <wj-multi-row-cell header="日付" binding="date" :editor="createDate()" :width="120">
          </wj-multi-row-cell>
        </wj-multi-row-cell-group>
        <wj-multi-row-cell-group>
          <wj-multi-row-cell header="郵便" binding="postcode" mask="000-0000" :width="80" :overwriteMode="false"></wj-multi-row-cell>
        </wj-multi-row-cell-group>
        <wj-multi-row-cell-group >
          <wj-multi-row-cell header="有効" binding="active" :width="100">
            <wj-multi-row-cell-template cellType="RowHeaderEdit" v-slot="cell">
              <input type="checkbox" :value="cell.item.active">
            </wj-multi-row-cell-template>
          </wj-multi-row-cell>
        </wj-multi-row-cell-group>
        <wj-multi-row-cell-group>
          <wj-multi-row-cell header="金額" :width="100" binding="sales">
            <wj-multi-row-cell-template cellType="RowHeaderEdit" v-slot="cell">
              <wj-input-number :isReadOnly=true :value.sync="cell.item.sales"></wj-input-number>
          </wj-multi-row-cell-template>
          </wj-multi-row-cell>
        </wj-multi-row-cell-group>
        <wj-multi-row-cell-group>
          <wj-multi-row-cell header="削除" :width="100">
            <wj-multi-row-cell-template cellType="Cell" v-slot="cell">
              <v-btn x-small @click="deleteData(cell.item.id)">削除</v-btn>
          </wj-multi-row-cell-template>
          </wj-multi-row-cell>
          <wj-multi-row-cell header="複写" :width="100">
            <wj-multi-row-cell-template cellType="Cell" v-slot="cell">
              <v-btn x-small @click="copyData(cell.item.id)">複写</v-btn>
          </wj-multi-row-cell-template>
          </wj-multi-row-cell>
        </wj-multi-row-cell-group>
      </wj-multi-row>
    </div>
    {{errorList}}
    <div>編集データ</div>
    <div>{{editList.itemsEdited}}</div>
    <div>追加データ</div>
    <div>{{editList.itemsAdded}}</div>
    <div>削除データ</div>
    <div>{{editList.itemsRemoved}}</div>
  </div>
</template>

<script>
import '@grapecity/wijmo.vue2.grid';
import '@grapecity/wijmo.vue2.core';
import '@grapecity/wijmo.cultures/wijmo.culture.ja';
import "@grapecity/wijmo.vue2.grid.multirow";
import '@grapecity/wijmo.styles/wijmo.css';
import * as wjInput from '@grapecity/wijmo.input';
import { Globalize } from "@grapecity/wijmo";
import * as wjGrid from '@grapecity/wijmo.grid';
import "@grapecity/wijmo.vue2.grid.filter";
import * as wijmo from "@grapecity/wijmo";
export default {
  name: 'HelloWorld',
  props: {
  },
  data () {
    return {
      errorList: [],
      editList: '',
      display: true,
      gridData1: [],
      gridData: [
        {
          id: 15,
          product: 'ピュアデミグラスソース',
          date: '2017/01/10',
          amount: 6000,
          year: '2021年度',
          sales:1111,
          expenses: 1111,
          country: '',
          postcode: '',
          message: 'aaaaa',
          active: false,
          cancel: true
        },
        {
          id: 17,
          product: 'だしこんぶ',
          date: '2017/01/08',
          amount: 14500,
          year: '2022年度',
          sales:2222,
          expenses: 2222,
          country: '',
          postcode: '',
          active: false
        },
        {
          id: 18,
          product: 'ピリカラタバスコ',
          date: '2017/01/12',
          amount: 4000,
          year: '2023年度',
          sales:3333,
          expenses: 3333,
          country: '',
          postcode: '',
          active: false
        },
        { 
          id: 84,
          product: 'なまわさび',
          date: '2017/01/21',
          amount: 8000,
          year: '2024年度',
          sales:4444,
          expenses: 4444,
          country: '',
          postcode: '',
          active: false
        }
      ]
    }
  },
  created: function () {
    this.gridData1 = JSON.parse(JSON.stringify(this.gridData))
  },
  watch: {
    gridData:{
      handler (v) {
        this.display = false
          this.gridData1 = JSON.parse(JSON.stringify(v))
        setTimeout(() => {
          // this.editData()
          this.errorData()
          this.display = true
        }, 100);
      },
      deep:true
    }
  },
  methods: {
    editData () {
      this.editList = new wijmo.CollectionView(this.gridData, {
        trackChanges: true
      })
    },
    errorData () {
      this.errorList = new wijmo.CollectionView(this.gridData, {
        trackChanges: true,
        getError: this.getError()
      })
    },
    getError(item, propName) {
            switch (propName) {
                // case 'country':
                //     return countries.indexOf(item.country) < 0 ? '無効な国です。' : '';
                // case 'downloads':
                // case 'sales':
                // case 'expenses':
                //     return item[propName] < 0 ? '負の値を入力できません。' : '';
                case 'active':{
                    return item.active && item.country.match(/^(アメリカ|イギリス)$/)
                        ? 'アメリカとイギリスでは有効にできません。'
                        : '';
                }
                case null:{
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
        },
    copyData (id) {
      var copydata = JSON.parse(JSON.stringify(this.gridData.find(x=> x.id === id)))
      copydata.id = this.gridData.length + 1
      this.gridData.push(copydata)
    },
    deleteData (id) {
      this.gridData = this.gridData.filter(x=> x.id !== id)
    },
    createDate () {
      return new wjInput.InputDate(document.createElement('div'))
    },
    buildDataMap(items) {
        let map = [];
        for (let i = 0; i < items.length; i++) {
          map.push({ key: i, value: items[i] });
        }
        return new wjGrid.DataMap(map, 'key', 'value');
    },
    addData () {
      this.gridData.push({
        id: this.gridData.length + 1,
        product: '',
        date: '',
        amount: 0,
        year: '',
        sales:0,
        expenses: 0,
        country: ''
      })
    },
    format: function(value) {
      return Globalize.format(value, "c");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
