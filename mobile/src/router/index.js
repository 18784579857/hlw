import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 公共模块
/// ////////////账号模块
// 登录页面
const Login = r => require.ensure([], () => r(require('@/components/login/login')), 'Login')

/// ////////////功能模块
/// //////大盒子
const Home = r => require.ensure([], () => r(require('@/components/home/home')), 'Home')
const My = r => require.ensure([], () => r(require('@/components/home/my/my')), 'My')
const Ranking = r => require.ensure([], () => r(require('@/components/home/my/rank/rank')), 'Ranking')
const FindPwd = r => require.ensure([], () => r(require('@/components/login/findPwd')), 'FindPwd')
const Yesterday = r => require.ensure([], () => r(require('@/components/home/my/fenHong/yesterday')), 'Yesterday')
const HalfMonth = r => require.ensure([], () => r(require('@/components/home/my/fenHong/halfMonth')), 'HalfMonth')
const Current = r => require.ensure([], () => r(require('@/components/home/my/fenHong/current')), 'Current')
const Recording = r => require.ensure([], () => r(require('@/components/home/my/fenHong/recording')), 'Recording')
const StoreCost = r => require.ensure([], () => r(require('@/components/home/my/fenHong/storeCost')), 'StoreCost')
const TodayPersonalSales = r => require.ensure([], () => r(require('@/components/home/my/sales/personal/todayPersonalSales')), 'TodayPersonalSales')
const MonthPersonalSales = r => require.ensure([], () => r(require('@/components/home/my/sales/personal/monthPersonalSales')), 'MonthPersonalSales')
const YearPersonalSales = r => require.ensure([], () => r(require('@/components/home/my/sales/personal/yearPersonalSales')), 'YearPersonalSales')
const MyReward = r => require.ensure([], () => r(require('@/components/home/my/sales/personal/myReward')), 'MyReward')
const TodayTeamSales = r => require.ensure([], () => r(require('@/components/home/my/sales/team/todayTeamSales')), 'TodayTeamSales')
const MonthTeamSales = r => require.ensure([], () => r(require('@/components/home/my/sales/team/monthTeamSales')), 'MonthTeamSales')
const YearTeamSales = r => require.ensure([], () => r(require('@/components/home/my/sales/team/yearTeamSales')), 'YearTeamSales')
const Order = r => require.ensure([], () => r(require('@/components/home/order/order')), 'Order')
const GoodsList = r => require.ensure([], () => r(require('@/components/home/order/goodsList/goodsList')), 'GoodsList')
const GoodDetail = r => require.ensure([], () => r(require('@/components/home/order/goodsList/goodDetail')), 'GoodDetail')
const ShoppingCart = r => require.ensure([], () => r(require('@/components/home/shopping-cart/shopping-cart')), 'ShoppingCart')
const Personal = r => require.ensure([], () => r(require('@/components/home/personal/personal')), 'Personal')
const Setup = r => require.ensure([], () => r(require('@/components/setting/setting')), 'Setup')
const Feedback = r => require.ensure([], () => r(require('@/components/setting/feedback')), 'Feedback')
const Password = r => require.ensure([], () => r(require('@/components/setting/password')), 'Password')
const User = r => require.ensure([], () => r(require('@/components/setting/user')), 'User')
const Team = r => require.ensure([], () => r(require('@/components/setting/team')), 'Team')
const Agent = r => require.ensure([], () => r(require('@/components/setting/addAgent')), 'Agent')
const Address = r => require.ensure([], () => r(require('@/components/setting/address')), 'Address')
const Message = r => require.ensure([], () => r(require('@/components/setting/message')), 'Message')
const EditAddress = r => require.ensure([], () => r(require('@/components/setting/editAddress')), 'EditAddress')
const Audit = r => require.ensure([], () => r(require('@/components/setting/audit')), 'Audit')
const Payment = r => require.ensure([], () => r(require('@/components/home/payment/payment')), 'Payment')
const GoodsDetails = r => require.ensure([], () => r(require('@/components/home/goods-details/goods-details')), 'GoodsDetails')
const PaymentType = r => require.ensure([], () => r(require('@/components/home/payment/payment-type')), 'PaymentType')
const ShoppingOrder = r => require.ensure([], () => r(require('@/components/setting/shopping-order/shopping-order')), 'ShoppingOrder')
const PaymentOk = r => require.ensure([], () => r(require('@/components/home/payment/paymentOk')), 'PaymentOk')
const ExpressDetails = r => require.ensure([], () => r(require('@/components/setting/express-details/expressDetails')), 'ExpressDetails')
const OrderDetails = r => require.ensure([], () => r(require('@/components/setting/shopping-order/order-details')), 'OrderDetails')
const Yl = r => require.ensure([], () => r(require('@/components/home/payment/yl')), 'Yl')
const News = r => require.ensure([], () => r(require('@/components/home/my/swiper/news')), 'News')
const QrCode = r => require.ensure([], () => r(require('@/components/home/personal/qrCode')), 'QrCode')
const ConfirmOrder = r => require.ensure([], () => r(require('@/outsidePage/confirmOrder')), 'ConfirmOrder')
const ToOrder = r => require.ensure([], () => r(require('@/outsidePage/toOrder')), 'ToOrder')
const SendSuccess = r => require.ensure([], () => r(require('@/outsidePage/sendSuccess')), 'SendSuccess')
const OutorderDetails = r => require.ensure([], () => r(require('@/outsidePage/orderDetails')), 'OutorderDetails')
const CreatAgent = r => require.ensure([], () => r(require('@/outsidePage/creatAgent')), 'CreatAgent')
const ToOrderDetails = r => require.ensure([], () => r(require('@/outsidePage/order/order-details')), 'ToOrderDetails')
const ToGoodDetails = r => require.ensure([], () => r(require('@/outsidePage/order/goods-details')), 'ToGoodDetails')
const Shareorder = r => require.ensure([], () => r(require('@/components/home/my/shareorder')), 'Shareorder')
const MyWallet = r => require.ensure([], () => r(require('@/components/setting/myWallet/myWallet')), 'MyWallet')
const BlanceDetails = r => require.ensure([], () => r(require('@/components/setting/myWallet/blanceDetail')), 'BlanceDetails')
const WithdrawDeposit = r => require.ensure([], () => r(require('@/components/setting/myWallet/withdrawDeposit')), 'WithdrawDeposit')
const WechatUnbind = r => require.ensure([], () => r(require('@/components/setting/wechatUnbind')), 'WechatUnbind')
const ZizhuNews = r => require.ensure([], () => r(require('@/outsidePage/swiper/news')), 'ZizhuNews')
// 全部路由的名称
const myRouterList = [
  '/',
  'Login',
  'Home',
  'My',
  'Ranking',
  'FindPwd',
  'Yesterday',
  'HalfMonth',
  'Current',
  'Recording',
  'StoreCost',
  'TodayPersonalSales',
  'MonthPersonalSales',
  'YearPersonalSales',
  'MyReward',
  'TodayTeamSales',
  'MonthTeamSales',
  'YearTeamSales',
  'Order',
  'GoodsList',
  'GoodDetail',
  'ShoppingCart',
  'Personal',
  'Setup',
  'Feedback',
  'Password',
  'User',
  'Team',
  'Agent',
  'Address',
  'Message',
  'EditAddress',
  'Audit',
  'Payment',
  'GoodsDetails',
  'PaymentType',
  'ShoppingOrder',
  'PaymentOk',
  'ExpressDetails',
  'OrderDetails',
  'Yl',
  'News',
  'QrCode',
  'ConfirmOrder',
  'ToOrder',
  'SendSuccess',
  'OutorderDetails',
  'CreatAgent',
  'ToOrderDetails',
  'ToGoodDetails',
  'Shareorder',
  'MyWallet',
  'BlanceDetails',
  'WithdrawDeposit',
  'WechatUnbind',
  'ZizhuNews'
]
const routes = [{
  path: '/',
  name: 'Login',
  component: Login
},
{path: '/outside/toOrder',
  name: 'ToOrder',
  component: ToOrder
},
{path: '/outside/ConfirmOrder',
  name: 'ConfirmOrder',
  component: ConfirmOrder
},
{path: '/outside/sendSuccess',
  name: 'SendSuccess',
  component: SendSuccess
},
{
  path: '/outside/creatAgent',
  name: 'CreatAgent',
  component: CreatAgent
},
{
  path: '/outside/toOrderDetails',
  name: 'ToOrderDetails',
  component: ToOrderDetails
},
{
  path: '/outside/toGoodDetails',
  name: 'ToGoodDetails',
  component: ToGoodDetails
},
{path: '/outside/orderDetails',
  name: 'OutorderDetails',
  component: OutorderDetails
}, {
  path: '/outside/zizhuNews',
  name: 'ZizhuNews',
  component: ZizhuNews
},
{
  path: '/yl',
  name: 'Yl',
  component: Yl
},
{
  path: '/home',
  name: 'Home',
  component: Home,
  children: [{
    path: 'my',
    name: 'My',
    component: My
  }, {
    path: 'order',
    name: 'Order',
    component: Order
  }, {
    path: 'shoppingcart',
    name: 'ShoppingCart',
    component: ShoppingCart
  }, {
    path: '/storeCost',
    name: 'StoreCost',
    component: StoreCost
  }, {
    path: '/current',
    name: 'Current',
    component: Current
  }, {
    path: '/recording',
    name: 'Recording',
    component: Recording
  }, {
    path: '/todayPersonalSales',
    name: 'TodayPersonalSales',
    component: TodayPersonalSales
  }, {
    path: '/monthPersonalSales',
    name: 'MonthPersonalSales',
    component: MonthPersonalSales
  }, {
    path: '/yearPersonalSales',
    name: 'YearPersonalSales',
    component: YearPersonalSales
  }, {
    path: '/myReward',
    name: 'MyReward',
    component: MyReward
  }, {
    path: '/todayTeamSales',
    name: 'TodayTeamSales',
    component: TodayTeamSales
  }, {
    path: '/monthTeamSales',
    name: 'MonthTeamSales',
    component: MonthTeamSales
  }, {
    path: '/yearTeamSales',
    name: 'YearTeamSales',
    component: YearTeamSales
  }, {
    path: '/goodslist',
    name: 'GoodsList',
    component: GoodsList
  }, {
    path: '/setup',
    name: 'Setup',
    component: Setup
  }, {
    path: '/feedback',
    name: 'Feedback',
    component: Feedback
  }, {
    path: '/password',
    name: 'Password',
    component: Password
  }, {
    path: '/user',
    name: 'User',
    component: User
  }, {
    path: '/team',
    name: 'Team',
    component: Team
  }, {
    path: '/agent',
    name: 'Agent',
    component: Agent
  }, {
    path: '/address',
    name: 'Address',
    component: Address
  }, {
    path: '/message',
    name: 'Message',
    component: Message
  }, {
    path: '/editaddress',
    name: 'EditAddress',
    component: EditAddress
  }, {
    path: '/audit',
    name: 'Audit',
    component: Audit
  }, {
    path: '/payment',
    name: 'Payment',
    component: Payment
  }, {
    path: '/goodsdetails',
    name: 'GoodsDetails',
    component: GoodsDetails
  }, {
    path: '/paymenttype',
    name: 'PaymentType',
    component: PaymentType
  }, {
    path: '/shoppingorder',
    name: 'ShoppingOrder',
    component: ShoppingOrder
  }, {
    path: '/paymentok',
    name: 'PaymentOk',
    component: PaymentOk
  }, {
    path: '/orderdetails',
    name: 'OrderDetails',
    component: OrderDetails
  }, {
    path: '/news',
    name: 'News',
    component: News
  }, {
    path: 'personal',
    name: 'Personal',
    component: Personal
  }, {
    path: '/myWallet',
    name: 'MyWallet',
    component: MyWallet
  }, {
    path: '/blanceDetails',
    name: 'BlanceDetails',
    component: BlanceDetails
  }, {
    path: '/withdrawDeposit',
    name: 'WithdrawDeposit',
    component: WithdrawDeposit
  }, {
    path: '/wechatUnbind',
    name: 'WechatUnbind',
    component: WechatUnbind
  }]
}, {
  path: '/yesterday',
  name: 'Yesterday',
  component: Yesterday
}, {
  path: '/halfMonth',
  name: 'HalfMonth',
  component: HalfMonth
}, {
  path: '/goodDetail',
  name: 'GoodDetail',
  component: GoodDetail
}, {
  path: '/qrCode',
  name: 'QrCode',
  component: QrCode
}, {
  path: '/shareorder',
  name: 'Shareorder',
  component: Shareorder
},
{
  path: '/findPwd',
  name: 'FindPwd',
  component: FindPwd
}, {
  path: '/expressDetails',
  name: 'ExpressDetails',
  component: ExpressDetails
}, {
  path: '/ranking',
  name: 'Ranking',
  component: Ranking
}
]
const myRouter = new Router({
  routes
})
myRouter.beforeEach((to, from, next) => {
  // 限制路由跳转到空白页面
  let canTo = false
  myRouterList.forEach(function (i) {
    if (i === to.name) {
      canTo = true
    }
  })
  if (!canTo) {
    next(false)
  } else {
    next()
  }
})
export default myRouter
