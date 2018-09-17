<template>
  <div class="shopping_view">
    <Header class="shopping_header" :headerList="headerList" @operation="batchDelete"></Header>
    <div class="shopping_middle">
      <div class="kong" v-show="kongView">
        <img :src="konggouwuche" alt="">
        <p>这里是空的，再去逛逛吧！</p>
      </div>
      <div class="shoppingList">
        <ul v-for="(it,index) in shoppingList" :key="index">
          <p class="cangku"> <img @click="cangkuSelect(index)" :src="goodselectObj[it.name]  ? ic_choice : ic_unchoice" alt=""><img :src="cangku">  {{it.showname}}</p>
          <li v-for="(item,index2) in it.value" :key="index2">
            <mt-cell-swipe
              :right="[{
                content: '删除',
                style: {
                  background: '#F4554D',
                  color: '#fff',
                  width: '75px',
                  padding: 0,
                  textAlign: 'center',
                  lineHeight: '115px'
                },
                handler: () => deleteGoods(item.id)
              }]">
              <div slot="title" class="shoppingContent">
                <img
                  class="choice"
                  :src="item.selected ? ic_choice : ic_unchoice"
                  alt=""
                  @click="selectGoods(index,index2)">
                <img class="shoppingLogo" :src="item.img" alt="">
                <div class="shoppingText">
                  <p class="p_name">{{item.name}}</p>
                  <p class="p_describe">{{item.describe}}g</p>
                  <div class="d_count">
                    <div class="count_l">
                      <span class="s_symbol" style="font-size:11px">代理价：￥ <span class="s_money"> {{item.salePrice}}</span></span>
                      <p style="font-size:11px;margin-top:9px;"><span class="s_symbol">市场价：￥ <span class="s_money" style="font-size:16px;font-weight:bold;"> {{item.retailPrice}}</span></span></p>
                    </div>

                    <div class="count_r1" v-show="clientWidth !== 320">
                      <img @click="reduce_num(index,index2)" :src="item.num > 1 ? ic_reduce : ic_reduce_un" alt="">
                      <span>{{item.num}}</span>
                      <img @click="add_num(index,index2)" :src="ic_add" alt="">
                    </div>
                  </div>
                  <div class="count_r" v-show="clientWidth === 320">
                      <img @click="reduce_num(index,index2)" :src="item.num > 1 ? ic_reduce : ic_reduce_un" alt="">
                      <span>{{item.num}}</span>
                      <img @click="add_num(index,index2)" :src="ic_add" alt="">
                    </div>
                </div>
              </div>
              </mt-cell-swipe>
          </li>
        </ul>
      </div>
      <div class="InvalidList" v-show="InvalidList.length > 0">
        <div class="clean_up">
          <el-button @click="clean_up" type="text">清空失效产品</el-button>
        </div>
        <ul>
          <li v-for="(item,index) in InvalidList" :key="index">
            <div slot="title" class="shoppingContent">
              <img class="shoppingLogo" :src="item.img" alt="">
              <div class="shoppingText">
                <p class="p_name">{{item.name}}</p>
                <p class="p_describe">{{item.describe}}</p>
                <div class="d_count">
                  <div class="count_l">
                    <span class="s_symbol">￥<span class="s_money">{{item.salePrice}}</span></span>
                    <p>市场价：￥ {{item.retailPrice}}</p>
                  </div>
                  <div class="count_r">
                    <span>数量:X{{item.num}}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="bottom_content">
      <div class="bottom_l">
        <img @click="allSelect" :src="all_select ? ic_choice : ic_unchoice" alt="">
        全选
      </div>
      <div class="bottom_c">
        合计:
        <!-- <span class="s_symbol"> 代理价：￥ <span class="all_money">{{all_money}}</span></span>
        <span>市场价：￥{{all_money}}</span> -->
      </div>
      <div class="priceAll">
        <p class=""> 代理价：￥ <span class="dailiprice">{{all_money}}</span></p>
        <p>市场价：￥{{all_retailPrice}}</p>
      </div>
      <div @click="goPayment" class="bottom_r">
        去支付
      </div>
    </div>
  </div>
</template>

<script>
import Header from 'base/header/header'
import { allUrl } from '@/router/allUrl'
import { MessageBox, Indicator } from 'mint-ui'
export default {
  name: 'shopping-cart',
  components: {
    'Header': Header
  },
  data () {
    return {
      msg: '购物车',
      ic_add: require('@/assets/image/shopping/ic_add.png'),
      ic_reduce_un: require('@/assets/image/shopping/ic_reduce_un.png'),
      ic_reduce: require('@/assets/image/shopping/ic_reduce.png'),
      ic_choice: require('@/assets/image/shopping/ic_choice.png'),
      ic_unchoice: require('@/assets/image/shopping/ic_unchoice.png'),
      konggouwuche: require('@/assets/image/shopping/konggouwuche.png'),
      cangku: require('@/assets/image/shopping/cangku.png'),
      all_select: false,
      all_money: '0.00',
      all_retailPrice: '0.00',
      headerList: {
        text: '购物车',
        righText: '删除'
      },
      clientWidth: '',
      shoppingList: [],
      InvalidList: [],
      goodselectObj: {},
      kongView: false
    }
  },
  methods: {
    clean_up () {
      const self = this
      MessageBox.confirm('是否清空失效产品?').then(action => {
        self.$get(allUrl.cleanGoods).then(res => {
          if (res.success) {
            self.$toast({
              message: '清除成功！',
              iconClass: 'el-icon-success'
            })
            self.InvalidList = []
          } else {
            self.$toast({
              message: res.msg,
              iconClass: 'el-icon-error'
            })
          }
        })
      }).catch(action => {})
    },
    selectGoods (index, index2) { // 选中商品
      Indicator.open('加载中...')
      let row = this.shoppingList[index].value[index2]
      let selected = row.selected
      let flag = true
      this.shoppingList[index].value[index2].selected = !selected
      this.isOneCangkuAllSelect(this.shoppingList[index].value)
      this.shoppingList.forEach(element => {
        element.value.forEach(it => {
          if (it.selected === false) {
            flag = false
          }
        })
      })
      this.all_select = flag
      this.changState()
    },
    /// /判断是否一个仓库的商品全部选中时,如果是则把那个所在仓库勾选上
    isOneCangkuAllSelect (value) {
      if (value && value.length > 0) {
        let needcgSelectflag = true
        value.forEach((item) => {
          if (!item.selected) {
            needcgSelectflag = false
          }
        })
        if (needcgSelectflag) this.goodselectObj[value[0].warehouseId] = true
        else { this.goodselectObj[value[0].warehouseId] = false }
      }
    },
    cangkuSelect (index, selectflag = false) { // 仓库按钮点中
      let cangkuName = this.shoppingList[index].name
      this.goodselectObj[cangkuName] = !this.goodselectObj[cangkuName]
      this.shoppingList[index].value.forEach((item) => {
        item.selected = this.goodselectObj[cangkuName]
      })
      let flag = true
      this.shoppingList.forEach(element => {
        element.value.forEach(it => {
          if (it.selected === false) {
            flag = false
          }
        })
      })
      this.all_select = flag
      this.changState()
      // Indicator.open('加载中...')
      // let row = this.shoppingList[index].value[index2]
      // let selected = row.selected
      // let flag = true
      // this.shoppingList[index].value[index2].selected = !selected
      // this.shoppingList.forEach(element => {
      //   element.value.forEach(it => {
      //     if (it.selected === false) {
      //       flag = false
      //     }
      //   })
      // })
      // this.all_select = flag
      // this.changState()
    },
    add_num (index, index2) { // 添加商品数量
      Indicator.open('加载中...')
      this.shoppingList[index].value[index2].num += 1
      this.changState()
    },
    reduce_num (index, index2) { // 减少商品数量
      let row = this.shoppingList[index].value[index2]
      let num = row.num
      if (num > 1) {
        Indicator.open('加载中...')
        this.shoppingList[index].value[index2].num -= 1
        this.changState()
      }
    },
    deleteGoods (id) { // 删除单个商品
      const self = this
      let goodsList = [id]
      self.deleteShopping(goodsList)
    },
    allSelect () { // 全选
      if (this.shoppingList.length > 0) {
        Indicator.open('加载中...')
        let allSelect = this.all_select
        this.all_select = !allSelect
        for (let p in this.goodselectObj) {
          this.goodselectObj[p] = this.all_select
        }
        this.shoppingList.forEach(element => {
          if (element.value) {
            element.value.forEach(it => {
              it.selected = this.all_select
            })
          }
        })
        this.changState()
      } else {
        this.$toast({
          message: '请先添加商品！',
          iconClass: 'el-icon-error'
        })
      }
    },
    batchDelete () { // 批量删除商品
      const self = this
      let goodsList = []
      self.shoppingList.forEach(e => {
        if (e.value) {
          e.value.forEach(it => {
            if (it.selected) {
              goodsList.push(it.id)
            }
          })
        }
      })
      if (goodsList.length > 0) {
        MessageBox.confirm('是否要删除商品！').then(action => {
          Indicator.open('删除中...')
          self.deleteShopping(goodsList)
        }).catch(action => {})
      } else {
        self.$toast({
          message: '请选择商品！'
        })
      }
    },
    deleteShopping (goodsList) { // 删除商品请求
      this.$post(allUrl.deleteShopping, {
        goodsList: goodsList
      }).then(res => {
        if (res.success) {
          this.goodselectObj = {}
          this.findAll()
        } else {
          this.$toast({
            message: res.msg,
            iconClass: 'el-icon-error'
          })
        }
      })
    },

    findAll () { // 获取购物车商品
      const self = this
      self.shoppingList = []
      self.InvalidList = []
      self.all_select = false
      self.all_money = '0.00'
      self.all_retailPrice = '0.00'
      this.$get(allUrl.findAll).then(res => {
        if (res.success) {
          let list = res.data
          if (list.length === 0) {
            self.kongView = true
          }
          Indicator.close()
          var realarray = []
          list.forEach(e => {
            if (e.status !== 'disable') {
              // testdata.forEach(e => {
              // })
              if (this.goodselectObj[e.warehouseId] === undefined) {
                this.goodselectObj[e.warehouseId] = false
              }
              if (realarray && realarray.length === 0) {
                realarray.push({'name': e.warehouseId,
                  'showname': e.warehouseName,
                  'value': [{
                    img: this.changeImgUrl(e.indexImg, '_150x150'),
                    name: e.name,
                    describe: e.spec,
                    money: e.salePrice.amount,
                    num: e.buyAmount,
                    selected: e.isChoose,
                    id: e.id,
                    warehouseId: e.warehouseId,
                    warehouseName: e.warehouseName,
                    retailPrice: e.retailPrice.amount, // 市场价
                    salePrice: e.salePrice.amount // 代理价
                  }]})
              } else {
                let flag = true
                realarray.forEach((item, index) => {
                  if (item.name === e.warehouseId) {
                    flag = false
                    realarray[index].value.push({
                      img: this.changeImgUrl(e.indexImg, '_150x150'),
                      name: e.name,
                      describe: e.spec,
                      money: e.salePrice.amount,
                      num: e.buyAmount,
                      selected: e.isChoose,
                      id: e.id,
                      warehouseId: e.warehouseId,
                      warehouseName: e.warehouseName,
                      retailPrice: e.retailPrice.amount, // 市场价
                      salePrice: e.salePrice.amount // 代理价
                    })
                  }
                })
                if (flag) {
                  realarray.push({'name': e.warehouseId,
                    'showname': e.warehouseName,
                    'value': [{
                      img: this.changeImgUrl(e.indexImg, '_150x150'),
                      name: e.name,
                      describe: e.spec,
                      money: e.salePrice.amount,
                      num: e.buyAmount,
                      selected: e.isChoose,
                      id: e.id,
                      warehouseId: e.warehouseId,
                      warehouseName: e.warehouseName,
                      retailPrice: e.retailPrice.amount, // 市场价
                      salePrice: e.salePrice.amount // 代理价
                    }]})
                }
              }
              self.shoppingList = realarray
              // self.shoppingList.push({
              //   img: e.indexImg,
              //   name: e.name,
              //   describe: e.spec,
              //   money: e.salePrice.amount,
              //   num: e.buyAmount,
              //   selected: e.isChoose,
              //   id: e.id,
              //   warehouseId: e.warehouseId,
              //   warehouseName: e.warehouseName
              // })
            } else {
              self.InvalidList.push({
                img: this.changeImgUrl(e.indexImg, '_150x150'),
                name: e.name,
                describe: e.spec,
                money: e.salePrice.amount,
                num: e.buyAmount,
                id: e.id,
                retailPrice: e.retailPrice.amount, // 市场价
                salePrice: e.salePrice.amount // 代理价
              })
            }
          })
        } else {
          self.$toast({
            message: res.msg,
            iconClass: 'el-icon-error'
          })
        }
      })
    },
    changState () { // 改变商品状态或者数量后请求接口获取合计价格
      const self = this
      let parameter = []
      this.shoppingList.forEach(e => {
        if (e.value) {
          e.value.forEach(it => {
            parameter.push({
              isChoose: it.selected,
              goodsId: it.id,
              buyAmount: it.num
            })
          })
        }
      })
      this.$post(allUrl.price, {
        shoppingCar: parameter
      }).then(res => {
        Indicator.close()
        if (res.success) {
          self.all_money = res.data.totalPrice.amount
          self.all_retailPrice = res.data.retailPrice.amount
        } else {
          self.$toast({
            message: res.msg,
            iconClass: 'el-icon-error'
          })
        }
      })
    },
    goPayment () { // 去支付
      let goodsParams = []
      let shoppingCarList = []
      let self = this
      this.shoppingList.forEach(e => {
        e.value.forEach(it => {
          if (e.value) {
            if (it.selected) {
              goodsParams.push({
                id: it.id,
                num: it.num
              })
              shoppingCarList.push({
                goodsId: it.id,
                buyAmount: it.num
              })
            }
          }
        })
      })
      if (goodsParams.length > 0) {
        self.$post(allUrl.checkGoods, {
          shopingCarList: shoppingCarList
        }).then(res => {
          if (res.success) {
            self.$get(allUrl.findAddress).then(res => {
              if (res.success) {
                self.$router.push({
                  path: '/payment',
                  query: {
                    goods: JSON.stringify(goodsParams)
                  }
                })
              } else {
                MessageBox.confirm('请添加收货地址！').then(action => {
                  self.$router.push({
                    name: 'Address'
                  })
                }).catch(action => {})
              }
            })
          } else {
            self.$toast({
              message: '已有商品下架，请重新选择！',
              iconClass: 'el-icon-error'
            })
            self.findAll()
          }
        })
      } else {
        this.$toast({
          message: '请先选择商品！',
          iconClass: 'el-icon-error'
        })
      }
    }
  },
  mounted () {
    this.findAll()
    this.clientWidth = document.body.clientWidth
  }
}
</script>
<style lang="less" scoped>
  .shopping_view{
    display: flex;
    flex-direction:column;
    justify-content: space-between;
    height: 100%;
    .shopping_header{
      border-bottom: 1px solid #F5F5F5;
    }
    .shopping_middle{
      flex: 1;
      overflow: auto;
      .kong{
        margin: auto;
        text-align: center;
        margin-top: 35%;
        img{
          width: 20%;
        }
        p{
          font-size: 14px;
          color: #999595;
        }
      }
    }
    .bottom_content{
      height: 50px;
      border-top: 1px solid #F5F5F5;
      background-color: white;
      padding-left: 15px;
      display: flex;
      margin-bottom: 0;
      .bottom_l{
        font-size: 13px;
        color: #666666;
        line-height: 50px;
        img{
          width: 18px;
          vertical-align: middle;
          margin-top: -5px;
        }
      }
      .bottom_c{
        line-height: 46px;
        // flex: 1;
        font-size: 18px;
        transform: scale(0.8);
        height: 100%;
        margin-left:5px;
        .s_symbol{
          font-size: 12px;
          color: #F4554D;
          margin-left: -5px;
        }
        .all_money{
          font-size: 20px;
          color: #F4554D;
          font-weight: 600;
          margin-left: -5px;
        }
      }
      .bottom_r{
        width: 80px;
        height: 100%;
        text-align: center;
        background-color: #F4554D;
        font-size: 19px;
        line-height: 50px;
        color: white;
      }
    }
  }
  .shoppingList{
    margin-top: 10px;
    ul{
      padding: 0;
      margin: 0;
      list-style: none;
      li{
        // margin-top: 10px;
        background-color: white;
        border-bottom:solid 1px #ECECEC;
        .shoppingContent{
          display: flex;
          padding: 25px 0 25px 0;
          .choice{
            width: 17px;
            height: 17px;
            vertical-align: middle;
            padding: 0 15px 0 15px;
            margin-top: 25px;
          }
          .shoppingLogo{
            width: 66px;
            height: 66px;
            padding-right: 10px;
          }
          .shoppingText{
            flex: 1;
            overflow: hidden;
            padding-right: 15px;
            p{
              margin: 0;
              padding: 0;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: 14px;
            }
            .p_name{
              color: #222222;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .p_describe{
              margin-top: 10px;
              color: #999999;
              font-size: 12px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .d_count{
              margin-top: 10px;
              display: flex;
              font-size: 14px;
              color: #222222;
              .count_l{
                flex: 1;
                .s_symbol{
                  font-size: 10px;
                  color: #F4554D;
                  // margin-left: -5px;
                }
                .s_money{
                  color: #F4554D;
                  margin-left: -5px;
                }
              }
              .count_r1{
                color: #F4554D;
                margin-top: -5px;
                display: block;
                margin-right: 5px;
                img{
                  width: 23px;
                  height: 23px;
                }
                span{
                  padding: 0 10px 0 10px;
                  color: #222222;
                  font-size: 18px;
                  margin-top: 5px;
                  vertical-align: middle;
                }
              }
            }
          }
        }
      }
    }
  }
  .count_r{
    float: right;
    color: #F4554D;
    margin-top: 5px;
    display: block;
    margin-right: 5px;
    img{
      width: 23px;
      height: 23px;
    }
    span{
      padding: 0 10px 0 10px;
      color: #222222;
      font-size: 18px;
      margin-top: 5px;
      vertical-align: middle;
    }
  }
  .InvalidList{
    margin-top: 10px;
    .clean_up{
      background-color: white;
      border-bottom: 1px solid #ECECEC;
      padding: 0 15px 0 15px;
    }
    ul{
      padding: 0;
      margin: 0;
      list-style: none;
      li{
        // margin-bottom: 10px;
        background-color: white;
        .shoppingContent{
          display: flex;
          padding: 25px 15px 25px 15px;
          .shoppingLogo{
            width: 66px;
            height: 66px;
            padding-right: 10px;
          }
          .shoppingText{
            flex: 1;
            overflow: hidden;
            color: #999999;
            p{
              margin: 0;
              padding: 0;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: 14px;
            }
            .p_name{
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .p_describe{
              margin-top: 10px;
              font-size: 12px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .d_count{
              margin-top: 10px;
              display: flex;
              font-size: 14px;
              .count_l{
                flex: 1;
                .s_symbol{
                  font-size: 10px;
                  transform: scale(0.2);
                  // margin-left: -5px;
                }
                .s_money{
                  margin-left: -5px;
                }
              }
              .count_r{
                span{
                  vertical-align: middle;
                }
              }
            }
          }
        }
      }
    }
  }
  .priceAll{
    flex: 1;
    p{
      margin: 0px;
      padding: 0px;
      font-size: 12px;
      color: #F4554D;
    }
    .dailiprice{
      font-size: 20px;
    }
  }
</style>
<style lang="less">
.mint-cell-wrapper{
  padding: 0;
}
.mint-cell-title{
  width: 100%;
}
.clean_up {
  .el-button--text{
    color: #01B04B !important;
    letter-spacing: 1px;
  }
}
.cangku{
  height:41.5px;
  display:flex;
  margin:10px 0 0 0;
  align-items:center;
  background:white;
  border-bottom:solid 1px #ECECEC;
  img{
    width:17px;
    height:17px;
    padding:0 15px;
  }
}
</style>
