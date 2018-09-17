/**
 * 请求路径配置
 */
// let admin = 'http://192.168.5.52:8080/'
// let admin = 'http://xlstest.testzhumengapp.com/'
// let admin = '/'
// let admin = 'http://dev1.zhumengapp.com/'

let admin = 'http://192.168.5.104:8085/'
// export var onlineurl = 'http://192.168.5.125:8080/#/'
// let admin = '/'

export const allUrl = {
  // 自助下单的轮播图片请求
  'getBananerImg': admin + 'self/service/findAdPosition',
  /**
   * 钱包提现
   */
  // 进入我的钱包
  'getBlanceNum': admin + 'app/wallet/myWallet',
  // 余额明细
  'getBlanceDetails': admin + 'app/wallet/balanceDetail/',
  // 绑定微信
  'bindWechat': admin + 'app/wx/authorization',
  // 获取微信用户信息
  'getWechatUserMsg': admin + 'app/wx/authorizationInfo',
  // 获取当前用户是否已经绑定微信号
  'isBindWechat': admin + 'app/wallet/isBanding',
  // 提现
  'withdrawDeposit': admin + 'app/wallet/extract',
  // 解绑微信号
  'unBindWechat': admin + 'app/wx/cancel/auth',

  /**
   * 个人信息
   */
  // 获取用户的id
  'getUserId': admin + 'app/user/select/id',
  // 获取用户名称
  'getUserName': admin + 'app/user/getName',
  // 获取自助下单的二维码
  'getShareOrder': admin + 'app/user/shareQr',
  // 获取微信分享的相关信息
  'getWeixinMsg': admin + 'share.htm',
  // 获取用户信息
  'getUserMsg': admin + 'app/user/findUser',
  // 登录
  'login': admin + 'h5/login',
  // 获取验证码
  'appimgcode': admin + 'appimgcode',
  // 二维码
  'appQrCode': admin + 'app/qrcode',
  // 获取短信验证码
  'getCode': admin + 'verify/mobile/',
  // 获取地址
  'getAddress': admin + 'area/ajaxSearchArea',
  // 找回密码
  'checkPwd': admin + 'h5/reset',
  /**
   * 首页
   */
  // 首页广告
  'advertising': admin + 'app/adPosition/findAdPosition',
  // 文章详情
  'articleDetail': admin + 'app/adPosition/selectAdById/',
  // 消息推送
  'pushMessage': admin + 'app/adPosition/sendMessage',
  // 查询个人销售
  'personalSales': admin + 'app/user/sales/selectUserSales/',
  // 查询本年个人销售
  'yearPersonalSales': admin + 'app/user/sales/selectUserSalesByYear',
  // 查询团队销售
  // 'teamSales': admin + 'app/user/sales/selectTeamSales/',
  // // 查询店铺预期分红
  // 'storeFenHong': admin + 'app/user/sales/selectStore/',
  // // 查询店铺成本
  // 'storeCost': admin + 'app/user/sales/selectByStoreId/',
  // // 查询本期店铺分红
  // 'storeCurrent': admin + 'app/user/sales/selectStoreDevidend',
  // // 查询店铺分红记录
  // 'fenHongRecord': admin + 'app/user/sales/select/storeDevidend/record',
  // 查询结算奖励
  'waitCheck': admin + 'app/user/sales/waitCheck',
  // 获取工资明细
  'getSalaryDetail': admin + 'app/user/sales/salary/detail',
  // 获取奖励记录
  // 'getAwardRecord': admin + 'app/user/sales/awardRecord/',
  /**
   * 分类展示
   */
  // 品牌列表
  'allBrand': admin + 'app/goods/getBrand',
  // 新一级分类
  'selectChild': admin + 'app/goods/selectChildClassify',
  // 一级分类
  'classify': admin + 'app/goods/getParentClassify',
  // 二级分类
  'childClassify': admin + 'app/goods/getChildClassify/',
  // 下单左边导航栏
  'leftChoose': admin + 'self/service/select/tree',
  // 下单右边导航栏
  'rightChoose': admin + 'self/service/select/goods',
  /**
   * 商品展示
   */
  'goodsList': admin + 'app/goods/goodsList',
  // 添加购物车
  'addShopCart': admin + 'app/order/car/goods/add',
  // 获取商品详情
  'getGoodDetail': admin + 'app/goods/detial/',

  /**
   * 个人中心
   */
  // 修改密码
  'changePassword': admin + 'app/user/changePassword',
  // 退出登录
  'logout': admin + 'h5/logout',
  // 提交意见反馈
  'addOpinion': admin + 'app/user/opinion/add',
  // 获取个人信息
  'selectUserInfo': admin + 'app/user/selectUserInfo',
  // 提交个人信息
  'changeInfo': admin + 'app/user/changeInfo',
  // 获取团队人数
  'selectTeam': admin + 'app/user/selectSales',
  // 获取个人月团销量
  'selectUserSales': admin + 'app/user/selectUserSales',
  // 添加代理
  'addAgency': admin + 'app/user/addAgency',
  // 自助下单添加代理
  'addAgencyBypage': admin + 'app/user/addAgencyBypage',
  // 获取地址数据
  'selectAddress': admin + 'app/address/selectAddress',
  // 设置默认地址
  'setDefault': admin + 'app/address/setDefault',
  // 通过id获取一条地址
  'selectById': admin + 'app/address/selectById',
  // 通过id获取一条地址
  'updateAddress': admin + 'app/address/updateAddress',
  // 删除一条地址
  'deleteAddress': admin + 'app/address/deleteAddress',
  // 添加一条地址
  'addAddress': admin + 'app/address/insertAddress',
  // 搜索收货人姓名
  'selectByName': admin + 'app/address/selectByName',
  // 获取下级代理审核进度
  'selectSchedule': admin + 'app/user/selectSchedule',
  // 消息
  'getMsg': admin + 'message/selectMessage',
  // 获取订单数量
  'getOrderNum': admin + 'app/order/count/orderNum',
  // 消息
  'getExpress': admin + 'app/order/get/express/',

  /**
   * 商品展示
   */
  // 获取购物车数据
  'findAll': admin + 'app/shopping/cart/find/all',
  // 获取合计
  'price': admin + 'app/shopping/cart/get/shoppingcar/price',
  // 删除购物车商品
  'deleteShopping': admin + 'app/order/car/goods/delete',
  // 删除购物车商品
  'cleanGoods': admin + 'app/shopping/cart/clean/pastGoods',
  // 验证购物车商品是否失效
  'checkGoods': admin + 'app/shopping/cart/check/goods/status',
  /**
   * 商品展示
   */
  // 获取支付购买信息
  'updateOrder': admin + 'app/shopping/cart/create/purchase',
  // 提交订单
  'submitOrder': admin + 'app/order/build/order',
  // 选择收货地址
  'insertAddress': admin + 'app/address/insertSession',
  // 退货订单编号获取订单详情
  'getOrder': admin + 'app/order/get/order/detail',
  // 商品详情
  'goodsDetails': admin + 'app/shopping/cart/details/goods',
  // 判断是否有收货地址
  'findAddress': admin + 'app/shopping/cart/find/address/for/user',

  /**
   * 支付
   */
  // 银联
  'unionpay': admin + 'app/pay/unionpay/unifiedOrder',
  // 支付宝
  'alipay': admin + 'app/pay/alipay/unifiedOrder',
  // 微信
  'wxpay': admin + 'app/pay/wxpay/unifiedOrder',

  /**
   * 支付
   */
  // 获取订单列表
  'findOrder': admin + 'app/order/find/order',
  // 取消订单
  'cancelOrder': admin + 'app/order/cancel',
  // 确认收货
  'confirmSh': admin + 'app/order/take',
  // 申请退货
  'thConfirm': admin + 'app/order/sale/return',
  // 删除订单
  'deleteOrder': admin + 'app/order/delete',
  // 取消退货
  'cancelTh': admin + 'app/order/update/status/for/return',
  // 退货进度
  'thjd': admin + 'app/order/get/return',
  // 卖家备注
  'remarks': admin + 'app/order/get/seller/remark',
  // 获取微信信息
  'getWxUrl': admin + 'app/pay/wxpay/getcode',
  // 微信app
  'wxpayApp': admin + 'app/pay/wxpay/gunifiedOrder',
  // 审核通过
  'shTg': admin + 'app/user/audit/',
  // 获取团队人数
  'getTimeNum': admin + 'app/user/selectSales/num',
  // 获取审核人数
  'getAuditNum': admin + 'app/user/selectSchedule/num',
  // 获取分享页
  'getSharePage': admin + 'app/qrcodeShare',
  // 获取分享页-商品详情
  'sharePageDetail': admin + 'self/service/detail',
  // 自助下单确认订单页面
  'autoPurchase': admin + 'self/service/purchase',
  // 获取邮费
  'getPostage': admin + 'self/service/calculate',
  // 自主下单发送订单
  'sendautoOrder': admin + 'self/service/send/order',
  // 拉取用户历史个人信息
  'getHistory': admin + 'self/service/select/useraddr',
  // 拉取
  'getSuccess': admin + 'self/service/select/Info',
  // // 业绩排行获取当前用户信息
  // 'getuserRank': admin + 'app/numeral/location',
  // // 业绩排行数据获取
  // 'getrankdata': admin + 'app/numeral/selectappnumeral',
  // 业绩排行获取当前用户信息
  'getuserRank': admin + 'app/user/select/rank',
  // 业绩排行数据获取
  'getrankdata': admin + 'app/user/select/user/rank',
  // 获取自助下单订单详情
  'autoOrderDetails': admin + 'self/service/select/order/detail',
  // 自助下单商品详情
  'autoOrderGoodsDetail': admin + 'self/service/details/goods',
  // 商品添加购物车时操作
  'handleGoods': admin + 'self/service/add/goodsinfo',
  // 购物车详情
  'carInfo': admin + 'self/service/select/carInfo',
  // 清空购物车
  'clearCartAll': admin + 'self/service/clean/car'
}
