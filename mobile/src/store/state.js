/**
 * 全局状态管理字段
 */
import wodeImg from './../assets/indexImg/wodeyeji1.png'
import wodeActiveImg from './../assets/indexImg/wodeyeji2.png'
import xiadanImg from './../assets/indexImg/xiadan1.png'
import xiadanActiveImg from './../assets/indexImg/xiadan2.png'
import gwcImg from './../assets/indexImg/gouwuche1.png'
import gwcActiveImg from './../assets/indexImg/gouwuche2.png'
import grzxImg from './../assets/indexImg/gerenzhongxin1.png'
import grzxActiveImg from './../assets/indexImg/gerenzhongxin2.png'
const state = {
  userState: '1',
  flag: '',
  orderflag: '',
  menu: [{
    name: '我的',
    icon: 'el-icon-xls-msnui-home-inverse',
    Img: wodeImg,
    activeImg: wodeActiveImg,
    path: '/home/my'
  }, {
    name: '下单',
    icon: 'el-icon-xls-jiadianxiadanzhongleixuanze',
    Img: xiadanImg,
    activeImg: xiadanActiveImg,
    path: '/home/order'
  }, {
    name: '购物车',
    icon: 'el-icon-xls-ai66',
    Img: gwcImg,
    activeImg: gwcActiveImg,
    path: '/home/shoppingcart'
  }, {
    name: '个人中心',
    icon: 'el-icon-xls-personal',
    Img: grzxImg,
    activeImg: grzxActiveImg,
    path: '/home/personal'
  }],
  goodsSelected: [],
  goodsSelectedCount: [],
  totalCart: []
}

export default state
