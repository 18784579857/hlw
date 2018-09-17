<template>
  <div class="payment">
    <div class="paymentHeader">
      <Header :headerList="headerList"></Header>
    </div>
    <div class="paymentContent">
      <div class="address"  @click="goAddress">
        <div class="address_l" v-show="flagAddress">
          <p class="p_name">
            收货人：{{formData2.name}}
            <span class="s_phone">{{formData2.mobile}}</span>
          </p>
          <div class="d_address">
            <div class="d_img">
              <img :src="ic_location" width="9" alt="">
            </div>
            <div class="d_text">
              收货地址：{{formData2.detailAddress}}
            </div>
          </div>
          <p>
          </p>
        </div>
        <div class="address_l addAddress" v-show="!flagAddress">
          <img :src="ic_location2" alt="">
          <span>添加地址</span>
        </div>
        <div class="address_r">
          <img :src="ic_right" width="7" alt="">
        </div>
      </div>
      <div class="line"></div>
      <ul class="g_ul" v-for="(item,index) in formData" :key="index">
        <p class="cangku">订单{{index+1}}:{{item.warehouseName}}</p>
        <li>
          <div class="goods">
            <ul>
              <li v-for="(it,index2) in item.shopingCarList" :key="index2">
                <img :src="it.goodsImg" width="65" height="65" alt="">
              </li>
            </ul>
            <div @click="goGoodsDetails(item.shopingCarList)" class="goodsNum">
              共{{item.num}}件
              <img :src="ic_right" width="7" alt="">
            </div>
          </div>
        </li>
        <li class="g_li">
          <div class="d_name">
            商品合计
          </div>
          <div class="d_value">
            <div><span>市场总价：￥</span>{{item.retailMoney}}</div>
            <div style="font-size:13px;margin-top:4px"><span>代理总价：￥</span>{{item.totalMoney}}</div>
          </div>
        </li>
         <li class="g_li" style="color:#f4554d">
            <div class="d_name">
            本单津贴
          </div>
          <div class="d_value">
            ￥{{item.profitMoney}}
          </div>
         </li>
        <li class="g_li">
          <div class="d_name">
            运费
          </div>
          <div class="d_value">
            ￥{{item.postFee}}
          </div>
        </li>
        <!-- <li class="g_li">
          <div class="d_name">
            开具发票
          </div>
          <div class="d_value" @click="invoiceClick(item.isOkInvoice,index)">
            {{item.isOkInvoice ? '是' : '否'}}
            <img :src="ic_right" width="7" alt="">
          </div>
        </li>
        <li class="g_li" v-show="item.isOkInvoice">
          <div class="d_name">
            发票抬头
          </div>
          <div class="d_value">
            <input type="text" placeholder="请输入发票抬头" v-model="item.invoiceHead">
          </div>
        </li> -->
        <li class="g_li">
          <div class="d_name">
            备注
          </div>
          <div class="d_value">
            <textarea name="" placeholder="请输入备注" v-model="item.remark" rows="5"></textarea>
          </div>
        </li>
      </ul>
    </div>
    <div class="paymentBottom">
      <div class="money">
        <p>
          应付金额:
          <span class="s_icon">{{formData2.allMoney}}</span>
        </p>
      </div>
      <div @click="selectType" class="btn">
        提交订单
      </div>
    </div>
  </div>
</template>
<script>
import Header from 'base/header/header'
import { allUrl } from '@/router/allUrl'
import { Indicator } from 'mint-ui'
export default {
  name: 'audit',
  components: {
    'Header': Header
  },
  data () {
    return {
      headerList: {
        leftText: '返回',
        text: '支付购买'
      },
      ic_right: require('@/assets/image/personal/ic_right.png'),
      ic_location: require('@/assets/image/payment/ic_location.png'),
      goodsList: [],
      goodsListsort: [], /// 新增变量，控制订单的分类展示
      formData2: {
        allMoney: '',
        addressId: '',
        detailAddress: '',
        mobile: '',
        name: ''
      },
      formData: [
      ],
      flagAddress: false,
      addressId: '',
      // {
      //   isOkInvoice: true,
      //   num: 0,
      //   totalMoney: '',
      //   postFee: '',
      //   detailAddress: '',
      //   mobile: '',
      //   name: '',
      //   allMoney: '',
      //   invoiceHead: '',
      //   remark: '',
      //   addressId: ''
      // },
      goodsParams: [],
      ic_location2: require('@/assets/image/payment/tianjiadizhi.png')
    }
  },
  methods: {
    // invoiceClick (state, index) {
    //   this.formData[index].isOkInvoice = !state
    // },
    goGoodsDetails (goodlist) { // 进入商品详情页面
      console.log(goodlist, '...')
      let shopingCarList = []
      goodlist.forEach(e => {
        shopingCarList.push({
          goodsId: e.goodsId,
          buyAmount: e.buyAmount
        })
      })
      this.$router.push({
        path: '/goodsdetails',
        query: {
          goods: JSON.stringify(shopingCarList)
        }
      })
    },
    goAddress () { // 进入选择地址页面
      this.$router.push({
        name: 'Address',
        query: {
          goods: JSON.stringify(this.goodsParams),
          other: 1
        }
      })
    },
    selectType () { // 提交订单订单
      if (this.flagAddress) {
        Indicator.open('提交订单中...')
        // let formData2 = this.formData2
        let goodsList = []
        this.goodsList.forEach(e => {
          goodsList.push({
            goodsId: e.goodsId,
            buyAmount: e.buyAmount
          })
        })
        // let params = {
        //   shopingCarList: goodsList,
        //   addressId: formData2.addressId,
        //   invoiceHead: formData.isOkInvoice ? formData.invoiceHead : '',
        //   remark: formData.remark
        // }
        let params = []
        this.formData.forEach((it, index) => {
          let shoplistTemp = it.shopingCarList.map(e => {
            return {goodsId: e.goodsId, buyAmount: e.buyAmount}
          })
          params.push({
            warehouseId: it.warehouseId,
            remark: it.remaark,
            addressId: it.addressId,
            shopingCarList: shoplistTemp
          })
        })
        this.$post(allUrl.submitOrder, params).then(res => {
          Indicator.close()
          if (res.success) {
            Indicator.close()
            this.$router.replace({
              path: '/paymenttype',
              query: {
                orderId: res.data
              }
            })
          } else {
            this.$toast({
              message: res.msg,
              iconClass: 'el-icon-error'
            })
          }
        })
      } else {
        this.$toast({
          message: '请添加地址',
          iconClass: 'el-icon-error'
        })
      }
    },
    update () {
      let shopingCarList = []
      this.goodsParams.forEach(e => {
        shopingCarList.push({
          goodsId: e.id,
          buyAmount: e.num
        })
      })
      let shopingCarListData = {}
      if (this.flagAddress) {
        shopingCarListData = {
          shopingCarList: shopingCarList,
          addressId: this.addressId
        }
      } else {
        shopingCarListData = {
          shopingCarList: shopingCarList
        }
      }
      this.$post(allUrl.updateOrder, shopingCarListData).then(res => {
        if (res.success) {
          if (res.data.detail && res.data.detail.length > 0) {
            let alldata = res.data.detail
            let allpostFee = 0
            if (res.data.detailAddress) {
              this.flagAddress = true
            }
            alldata.forEach(e => {
              let totalMoney = parseFloat(e.totalMoney.amount)
              let postFee = parseFloat(e.postFee ? e.postFee.amount : 0)
              allpostFee += postFee
              let allMoney = (((totalMoney * 100) + (postFee * 100)) / 100).toFixed(2)
              const goodImgList = e.goods
              let goodList = []
              goodImgList.forEach(element => {
                goodList.push({
                  amount: element.amount,
                  buyAmount: element.buyAmount,
                  goodsId: element.goodsId,
                  goodsImg: this.changeImgUrl(element.goodsImg, '_150x150'),
                  goodsName: element.goodsName,
                  retailPrice: element.retailPrice.amount,
                  salePrice: element.salePrice.amount
                })
              })
              this.formData.push(
                {
                  num: e.countNum,
                  // isOkInvoice: true,
                  profitMoney: e.profitMoney ? e.profitMoney.amount : '0.00',
                  totalMoney: e.totalMoney ? e.totalMoney.amount : '0.00',
                  retailMoney: e.retailMoney ? e.retailMoney.amount : '0.00',
                  postFee: !e.postFee ? 0 : e.postFee.amount,
                  // detailAddress: res.data.detailAddress,
                  // mobile: res.data.mobile,
                  // name: res.data.name,
                  // addressId: res.data.addressId,
                  invoiceHead: '',
                  remark: '',
                  allMoney: allMoney,
                  warehouseName: e.warehouseName,
                  warehouseId: e.warehouseId,
                  addressId: res.data.addressId,
                  shopingCarList: goodList
                }
              )
              e.goods.forEach(it => {
                this.goodsList.push({
                  goodsImg: it.goodsImg,
                  goodsId: it.goodsId,
                  buyAmount: it.buyAmount
                })
              })
            })
            let totalMoney = parseFloat(res.data.totalMoney.amount)
            let allMoney = (((totalMoney * 100) + (allpostFee * 100)) / 100).toFixed(2)
            this.formData2 = {
              detailAddress: res.data.detailAddress,
              mobile: res.data.mobile,
              name: res.data.name,
              addressId: res.data.addressId,
              allMoney: allMoney
            }
          }
        } else {
          this.$toast({
            message: res.msg,
            iconClass: 'el-icon-error',
            duration: 1500
          })
          // setTimeout(() => {
          //   this.$router.go(-1)
          // }, 1700)
          this.flagAddress = false
        }
      })
    }
  },
  mounted () {
    if (this.$route.query.id) {
      this.addressId = this.$route.query.id
    }
    if (JSON.parse(this.$route.query.goods)) {
      this.goodsParams = JSON.parse(this.$route.query.goods)
      this.update()
    }
  }
}
</script>
<style lang="less" scoped>
  .payment{
    display: flex;
    flex-direction:column;
    justify-content: space-between;
    height: 100%;
    font-family: "PingFang SC";
    .paymentHeader{
      border-bottom: 1px solid #F5F5F5;
    }
    .paymentContent{
      flex: 1;
      overflow: auto;
      ul{
        padding: 0;
        margin: 0;
        list-style: none;
        background-color: white;
      }
      .g_ul{
        margin-top: 15px;
        padding-left: 15px;
        li{
          border-bottom: 1px solid #ECECEC;
          padding: 15px 0 15px 0;
        }
        li:last-child{
          border: 0;
        }
        .g_li{
          display: flex;
          padding-right: 15px;
          font-size: 15px;
          color: #222222;
          .d_name{
            padding-right: 15px;
          }
          .d_value{
            flex: 1;
            text-align: right;
            img{
              margin-left: 10px;
            }
            input, textarea{
              border:none;
              outline: none;
              height: auto;
              text-align: right;
              width: 100%;
            }
          }
        }
      }
      .address{
        background-color: white;
        display: flex;
        .address_l{
          flex: 1;
          padding-left: 15px;
          .p_name{
            font-size: 16px;
            color: #222222;
            padding: 20px 0 10px 19px;
            font-weight: 600;
            margin: 0;
            .s_phone{
              margin-left: 15px;
            }
          }
          .d_address{
            display: flex;
            .d_img{
              margin-right: 10px;
              margin-top: -1px;
            }
            .d_text{
              font-size: 14px;
              color: #222222;
            }
          }
        }
        .address_r{
          width: 27px;
          display: flex;
          align-items: center;
          padding-left: 10px;
        }
      }
      .addAddress{
        padding: 40px 0px;
        color: #222222;
        font-size: 16px;
        display:flex;
        align-items: center;//子元素垂直居中
        justify-content: center;//子元素水平居中
        img{
          height: 16px;
          width: 16px;
          margin-right: 5px;
        }
      }
      .line{
        height: 6px;
        background: url(../../../assets/image/payment/pic_line.png) no-repeat;
        background-size: 100% 100%;
      }
      .goods{
        display: flex;
        ul{
          flex: 1;
          display: flex;
          overflow: auto;
          li{
            padding: 0 10px 0 0;
            border: 0;
          }
        }
        .goodsNum{
          display: flex;
          align-items: center;
          padding-right: 15px;
          padding-left: 15px;
          font-size: 14px;
          color: #222222;
          img{
            margin-left: 6px;
          }
        }
      }
    }
    .paymentBottom{
      display: flex;
      background-color: white;
      border-top:1px solid #ECECEC;
      .money{
        flex: 1;
        padding-left: 15px;
        color: #666666;
        font-size: 13px;
        display: flex;
        align-items: center;
        p{
          padding: 0;
          margin: 0;
          span{
          color: #F4554D;
          }
          .s_icon{
            font-size: 20px;
          }
          .s_icon::before{
            content: "￥";
            font-size: 12px;
          }
        }
      }
      .btn{
        background-color: #F4554D;
        padding: 3vw 5vw 3vw 5vw;
        font-size: 6vw;
        color: white;
        text-align: center;
      }
    }
    .cangku{
    height:41.5px;
    display:flex;
    margin:10px 0 0 0;
    align-items:center;
    background:white;
    border-bottom:solid 1px #ECECEC;
    }
  }
</style>
