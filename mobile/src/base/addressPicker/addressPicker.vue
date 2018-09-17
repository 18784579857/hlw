<template>
  <div class="addressPicker">
    <mt-popup
      style="width:100%"
      v-model="addressPopupVisible"
      position="bottom">
      <div class="btns">
        <el-button class="leftBtn" @click="cancel" type="text">取消</el-button>
        <div class="text">请选择</div>
        <el-button class="rightBtn" @click="isOK" type="text">确定</el-button>
      </div>
      <mt-picker valueKey="name" :slots="slots" @change="onValuesChange"></mt-picker>
    </mt-popup>
  </div>
</template>
<script>
import {allUrl} from '@/router/allUrl'
const uri = allUrl.getAddress
// 调用方法:使用 this.$ref.addressPicker.showAddressPicker()打开popup  <AddressPicker ref="addressPicker" @addressSelected="addressSelected"></AddressPicker>
export default {
  data () {
    return {
      addressPopupVisible: false,
      slots: [{
        flex: 1,
        values: [],
        className: 'province',
        textAlign: 'center'
      }, {
        flex: 1,
        values: [],
        className: 'city',
        textAlign: 'center'
      }, {
        flex: 1,
        values: [],
        className: 'county',
        textAlign: 'center'
      }],
      province: '',
      city: '',
      county: ''
    }
  },
  methods: {
    showAddressPicker () {
      this.addressPopupVisible = true
    },
    cancel () {
      this.addressPopupVisible = false
    },
    isOK () {
      let address = [this.province, this.city, this.county]
      this.$emit('addressSelected', address)
      this.addressPopupVisible = false
    },
    onValuesChange (picker, val) {
      this.province = picker.getSlotValue(0)
      this.city = picker.getSlotValue(1)
      this.county = picker.getSlotValue(2)
    },
    getProvince () {
      this.$get(uri + '?level=1').then((res) => {
        this.slots[0].values = res.data
      })
    },
    getCity (provinceId) {
      this.$get(uri + '?level=2&parent=' + provinceId).then((res) => {
        this.slots[1].values = res.data
      })
    },
    getCounty (cityId) {
      this.$get(uri + '?level=3&parent=' + cityId).then((res) => {
        this.slots[2].values = res.data
      })
    }
  },
  created () {
    // 初始化
    this.getProvince()
    // this.getCity('110000')
    // this.getCounty('110100')
  },
  watch: {
    'province': function (curProvinceVal, oldProvinceVal) {
      if (curProvinceVal) {
        this.getCity(curProvinceVal.code)
      }
    },
    'city': function (curCityVal, oldcityVal) {
      if (curCityVal) {
        this.getCounty(curCityVal.code)
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .addressPicker {
    .btns{
      height: 45px;
      display: flex;
      display: -webkit-flex;
      background-color: #F5F5F5;
      padding: 0 10px 0 10px;
      .leftBtn{
        color: #D94242;
      }
      .text{
        flex: 1;
        text-align: center;
        line-height: 45px;
        color: #222222;
        font-size: 16px;
      }
      .rightBtn{
        color: #01B04B;
      }
    }
  }
</style>
