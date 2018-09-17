<template>
  <div class="addressView">
    <div class="addressHeader">
      <Header :headerList="headerList"></Header>
    </div>
    <!-- <div class="search">
      <el-input
      placeholder="搜索收货人姓名"
      prefix-icon="el-icon-search"
      v-model="searchValue">
      </el-input>
      <el-button type="text" @click="searchConsignee">搜索</el-button>
    </div> -->
    <div @click="addAddress" class="addressBottom">
      添加地址
    </div>
    <div class="addressContent">
      <ul>
        <li v-for="(item,index) in addressList" :key="index" >
          <div class="addressText" @click="selected(index,item.id)">
            <div class="t_left">
              <!-- <img
                width="17"

                :src="item.selected  ? ic_choice : ic_unchoice"
                alt=""> -->
            </div>
            <div  class="t_right">
              <p class="p_top">
                收货人：{{item.consignee}}
                <span class="s_phone">{{item.phone}}</span>
              </p>
              <p class="p_bottom">
                收货地址：{{item.address}}
              </p>
            </div>
          </div>
          <div class="addressSetup">
            <div
            class="setup_l"
            :style="item.defaultAddress === 'Y' ? 'color:#01B04B' : 'color:#999999'"
            @click="setupDefault(item.id,index)">
              <img
              width="12"
              :src="item.defaultAddress === 'Y' ? ic_choice2 : ic_unchoice2"
              alt="">
              {{item.defaultAddress === 'Y' ? "默认地址" : "设为默认地址"}}
            </div>
            <div class="setup_r">
              <mt-button type="default" @click="edit(item.id)" size="small" plain>编辑</mt-button>
              <mt-button type="default" @click="deleteAddress(item.id)" size="small" plain>删除</mt-button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Header from 'base/header/header'
import { allUrl } from '@/router/allUrl'
import { MessageBox } from 'mint-ui'
export default {
  name: 'addressView',
  components: {
    'Header': Header
  },
  data () {
    return {
      ic_choice: require('@/assets/image/shopping/ic_choice.png'),
      ic_unchoice: require('@/assets/image/shopping/ic_unchoice.png'),
      ic_choice2: require('@/assets/image/address/ic_choice2.png'),
      ic_unchoice2: require('@/assets/image/address/ic_unchoice2.png'),
      headerList: {
        leftText: '返回',
        text: '地址管理'
      },
      addressList: [],
      // isSelect: false,
      searchValue: '',
      goods: '',
      other: ''
    }
  },
  methods: {
    selected (index, id) {
      const self = this
      this.$get(allUrl.insertAddress + '/' + id).then(res => {
        if (res.success) {
          this.addressList.forEach(e => {
            e.selected = false
          })
          this.addressList[index].selected = true
          // this.updateAddress()
          if (this.other === 1 || this.other === '1') {
            self.$router.push({
              path: '/payment',
              query: {
                goods: JSON.stringify(self.goods),
                id: id
              }
            })
          }
        } else {
          this.$toast({
            message: '选择失败！',
            iconClass: 'el-icon-error',
            duration: 1500
          })
        }
      })
    },
    setupDefault (id, index) {
      if (this.addressList[index].defaultAddress === 'N') {
        this.$get(allUrl.setDefault + '/' + id).then(res => {
          if (res.success) {
            this.$toast({
              message: '设置成功！',
              iconClass: 'el-icon-success',
              duration: 1500
            })
            this.addressList.forEach(e => {
              e.selected = false
            })
            this.addressList[index].selected = true
            this.addressList.forEach(e => {
              if (e.id === id) {
                e.defaultAddress = 'Y'
              } else {
                e.defaultAddress = 'N'
              }
            })
          } else {
            this.$toast({
              message: '设置失败！',
              iconClass: 'el-icon-error',
              duration: 1500
            })
          }
        })
      }
    },
    updateAddress () {
      this.$get(allUrl.selectAddress + '/1/10000').then(res => {
        if (res.success) {
          this.addressList = []
          if (res.data) {
            let list = res.data.list
            list.forEach(e => {
              this.addressList.push({
                id: e.id,
                consignee: e.name,
                defaultAddress: e.isDefault,
                selected: e.isDefault === 'Y',
                phone: e.mobile,
                address: e.areaName + e.detailAddress
              })
            })
          }
        } else {
          this.$toast({
            message: res.msg,
            iconClass: 'el-icon-error'
          })
        }
      })
    },
    edit (id) {
      this.$router.push({
        name: 'EditAddress',
        params: {
          id: id
        }
      })
    },
    deleteAddress (id) {
      MessageBox.confirm('确定要删除该地址?').then(action => {
        this.$get(allUrl.deleteAddress + '/' + id).then(res => {
          if (res.success) {
            this.$toast({
              message: '删除成功！',
              iconClass: 'el-icon-success'
            })
            this.updateAddress()
          } else {
            this.$toast({
              message: res.msg,
              iconClass: 'el-icon-error'
            })
          }
        })
      }).catch(action => {})
    },
    addAddress () {
      this.$router.push({
        name: 'EditAddress'
      })
    },
    searchConsignee () { // 搜索收货人姓名
      this.$get(allUrl.selectByName + '?name=' + this.searchValue).then(res => {
        if (res.success) {
          this.addressList = []
          if (res.data) {
            let list = res.data
            list.forEach(e => {
              this.addressList.push({
                id: e.id,
                consignee: e.name,
                defaultAddress: e.isDefault,
                selected: e.isDefault === 'Y',
                phone: e.mobile,
                address: e.areaName + e.detailAddress
              })
            })
          }
        } else {
          this.$toast({
            message: res.msg,
            iconClass: 'el-icon-error'
          })
        }
      })
    }
  },
  mounted () {
    this.updateAddress()
    if (this.$route.query && this.$route.query.goods) {
      this.goods = JSON.parse(this.$route.query.goods)
      //   this.isSelect = true
    }
    if (this.$route.query.other) {
      this.other = this.$route.query.other
    }
  }
}
</script>
<style lang="less" scoped>
  .addressView{
    display: flex;
    flex-direction:column;
    justify-content: space-between;
    height: 100%;
    font-family: "PingFang SC";
    .addressHeader{
      border-bottom: 1px solid #F5F5F5;
    }
    .addressContent{
      flex: 1;
      overflow: auto;
      ul{
        list-style: none;
        margin: 0;
        padding: 0;
        li{
          margin-top: 10px;
          background-color: white;
          .addressText{
            border-bottom: 1px solid #ECECEC;
            display: flex;
            padding: 20px 0 20px 0;
            .t_left{
              padding: 0 0 0 15px;
              display: flex;
              align-items: center;
            }
            .t_right{
              flex: 1;
              padding-right: 10px;
              padding-left: 15px;
              p{
                padding: 0;
                margin: 0
              }
              .p_top{
                font-size: 16px;
                color: #222222;
                font-weight: 600;
                .s_phone{
                  margin-left: 15px;
                }
              }
              .p_bottom{
                font-size: 14px;
                color: #222222;
                padding-top: 5px;
              }
            }
          }
          .addressSetup{
            padding: 10px 15px 10px 15px;
            display: flex;
            font-size: 13px;
            align-items: center;
            .setup_l{
              flex: 1;
              img{
                vertical-align: middle;
                margin-top: -3px;
              }
            }
            .setup_r{
              flex: 1;
              text-align: right;
              button{
                height: 26px;
              }
            }
          }
        }
      }
    }
    .addressBottom{
      height: 50px;
      background: #F4554D;
      font-size: 19px;
      text-align: center;
      line-height: 50px;
      color: white;
      width: 80%;
      border-radius: 4px;
      margin: 10px auto 0 auto;
    }
  }

</style>
<style lang="less">
.addressView{
  .search{
    padding:10px 15px;
    background: #feca5c;
    .el-input{
      width:82%;
      vertical-align: middle;
      margin-right: 5px;
    }
    .el-input__inner{
      border:1px solid #fff;
      border-radius: 50px;
      height: 35px;
      line-height:35px;
    }
    .el-input__icon{
      height: 35px;
      line-height:35px;
    }
    .el-button--text{
      color:#fff;
      font-size:16px;
    }
  }
}
</style>
