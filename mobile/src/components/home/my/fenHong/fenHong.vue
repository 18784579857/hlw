<template>
  <div class="fenHong">
    <div class="header">
      <headerTwo :headerList="headerList"></headerTwo>
    </div>
    <div class="table">
    <!-- <div class="table el-table el-table--fit el-table--striped el-table--scrollable-x el-table--enable-row-transition"> -->
      <!-- <div class="tableHeader el-table__header-wrapper">
        <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" style="width: 630px;">
          <thead>
            <tr>
              <th class="el-table_1_column_1 is-center is-leaf" v-for="column in columnList" :key="column.prop"><div class="cell">{{column.label}}</div></th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="el-table__body-wrapper">
        <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 630px;">
          <tbody>
            <tr class="el-table__row" v-for="(data, index) in tableData" :key="index">
              <td class="el-table_2_column_8 is-center" v-for="column in columnList" :key="column.prop">
                <div class="cell">
                  <div v-if="column.prop==='storeName'">{{data[column.prop]}}</div>
                  <div v-else-if="column.prop==='projectCost'">
                    <span class="costFee">{{data[column.prop]}}</span>
                    <i class="el-icon-caret-right project_cost"></i>
                  </div>
                  <div v-else>{{data[column.prop]}}</div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div> -->
      <div v-if="tableData[0].id">
        <el-table
        :data="tableData"
        stripe
        sum-text="合计:"
        height="100%"
        show-summary
        @cell-click="cellClick">
          <template v-for="column in columnList" >
            <el-table-column
            :key="column.prop"
            v-if="column.prop==='storeName'"
            fixed
            :prop="column.prop"
            :label="column.label"
            :width="column.width"
            align="center"></el-table-column>
            <el-table-column
            :key="column.prop"
            v-else-if="column.prop==='projectCost'"
            :label="column.label"
            :prop="column.prop"
            :width="column.width"
            align="center">
              <template slot-scope="scope">
                <span class="costFee">{{scope.row[column.prop]}}</span>
                <i class="el-icon-caret-right project_cost" v-if="scope.row.id"></i>
              </template>
            </el-table-column>
            <el-table-column
            v-else
            :key="column.prop"
            :fixed="column.fixed"
            :prop="column.prop"
            :label="column.label"
            :width="column.width"
            align="center"></el-table-column>
          </template>
        </el-table>
      </div>
      <el-table v-else></el-table>
    </div>
  </div>
</template>
<script>
import headerTwo from 'base/headerTwo/headerTwo'
import {allUrl} from '@/router/allUrl'
export default {
  props: ['fenHong'],
  components: {headerTwo},
  data () {
    return {
      headerList: {
        titleText: this.$props.fenHong.title,
        path: '',
        leftText: '返回',
        money: '',
        moneyText: '分红总额'
      },
      tableData: [{
        id: '',
        storeName: '',
        expect: '',
        sales: '',
        grossProfit: '',
        storeCost: '',
        projectCost: ''
      }],
      columnList: [{
        prop: 'storeName',
        label: '店铺名称',
        width: '110'
      }, {
        prop: 'expect',
        label: '预计分红',
        width: '100'
      }, {
        prop: 'sales',
        label: '销售金额',
        width: '100'
      }, {
        prop: 'grossProfit',
        label: '销售毛利',
        width: '100'
      }, {
        prop: 'storeCost',
        label: '店铺成本',
        width: '100'
      }, {
        prop: 'projectCost',
        label: '项目成本',
        width: '120'
      }]
    }
  },
  methods: {
    cellClick (row, column, cell, event) {
      if (column.property === 'projectCost') {
        // debugger
        console.log(row)
        this.$router.push({
          path: '/storeCost',
          query: {id: row.id, type: this.$props.fenHong.type, storeName: row.storeName}
        })
      }
    },
    getData () {
      this.$get(allUrl.storeFenHong + this.$props.fenHong.type + '/1/99').then((res) => {
        if (res.success) {
          if (!res.data.page.length) {
            this.tableData = [{
              id: '',
              storeName: '',
              expect: '',
              sales: '',
              grossProfit: '',
              storeCost: '',
              projectCost: ''
            }]
            this.headerList.money = res.data.totalDividend.amount
          } else {
            let arr = []
            res.data.page.forEach(element => {
              arr.push({
                id: element.storeId,
                storeName: element.storeName,
                expect: element.dividend.amount,
                sales: element.totalSales.amount,
                grossProfit: element.profit.amount,
                storeCost: element.storeCost.amount,
                projectCost: element.cost.amount
              })
            })
            this.tableData = arr
            this.headerList.money = res.data.totalDividend.amount
          }
        } else {
          this.tableData = [{
            id: 0,
            storeName: '',
            expect: '',
            sales: '',
            grossProfit: '',
            storeCost: '',
            projectCost: ''
          }]
        }
      })
    }
  },
  created () {
    this.getData()
  }
}
</script>
<style lang="less" scoped>
  .fenHong {
    display: flex;
    flex-direction: column;
    height: 100%;
    .table {
      flex: 1;
      overflow: scroll;
    }
  }
</style>
<style lang="less">
  .fenHong {
    .table {
      .el-table {
        overflow: scroll;
        .project_cost {
          width: 0px;
        }
        .costFee {
          text-decoration: underline;
        }
      }
    }
  }
</style>
