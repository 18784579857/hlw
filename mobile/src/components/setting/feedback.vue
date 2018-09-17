<template>
  <div class="">
    <Header :headerList="headerList"></Header>
    <ul class="setting">
      <li
      @click="clickSetting">
        <div class="text">
          {{type.name}}
        </div>
        <div class="rightImg">
          <img :src="ic_right" width="7" height="11">
        </div>
      </li>
    </ul>
    <div class="textareaText">
      <textarea
        placeholder="请输入内容"
        maxlength="100"
        v-model="textarea">
      </textarea>
    </div>
    <p class="textNum">{{textNum}}/100</p>
    <el-button class="signin" :type="btnType" :disabled="disabled" @click="submit">提交</el-button>
    <mt-popup
      style="width:100%"
      v-model="popupVisible"
      position="bottom">
      <div class="btns">
        <el-button class="leftBtn" @click="cancel" type="text">取消</el-button>
        <div class="text">反馈类型</div>
        <el-button class="rightBtn" @click="isOK" type="text">确定</el-button>
      </div>
      <mt-picker valueKey="name" :slots="slots" @change="onValuesChange"></mt-picker>
    </mt-popup>
  </div>
</template>
<script>
import Header from 'base/header/header'
import {allUrl} from '@/router/allUrl'
export default {
  name: 'setting',
  components: {
    'Header': Header
  },
  data () {
    return {
      popupVisible: false,
      textNum: 0,
      disabled: true,
      btnType: 'info',
      type: {
        name: '请选择反馈类型',
        type: ''
      },
      selectValue: {},
      slots: [{
        flex: 1,
        values: [{
          name: '商品相关',
          type: '1'
        }, {
          name: '物流状况',
          type: '2'
        }, {
          name: '客服服务',
          type: '3'
        }, {
          name: '优惠活动',
          type: '4'
        }, {
          name: '产品体验',
          type: '5'
        }, {
          name: '产品功能',
          type: '6'
        }, {
          name: '其他',
          type: '7'
        }],
        className: 'slot1',
        textAlign: ''
      }],
      ic_right: require('@/assets/image/personal/ic_right.png'),
      headerList: {
        leftText: '返回',
        text: '意见反馈'
      },
      textarea: ''
    }
  },
  methods: {
    clickSetting () {
      this.popupVisible = true
    },
    onValuesChange (picker, values) {
      this.selectValue = values[0]
    },
    cancel () {
      this.popupVisible = false
      this.selectValue = {}
    },
    isOK () {
      this.popupVisible = false
      this.type = this.selectValue
      this.checkBtn()
    },
    checkBtn () {
      let num = this.textNum
      let type = this.type.type
      if ((num > 0) && (num <= 100) && (type !== '')) {
        this.btnType = 'danger'
        this.disabled = false
      } else {
        this.btnType = 'info'
        this.disabled = true
      }
    },
    submit () {
      let type = this.type.type
      let value = this.textarea
      let me = this
      this.$post(allUrl.addOpinion, {
        typeCode: type,
        content: value
      }).then(function (res) {
        if (res.success) {
          me.$toast({
            message: '操作成功',
            iconClass: 'el-icon-success'
          })
          me.textarea = ''
          me.type = {
            name: '请选择反馈类型',
            type: ''
          }
        } else {
          me.$toast({
            message: res.msg,
            iconClass: 'el-icon-error'
          })
        }
      })
    }
  },
  watch: {
    textarea (val) {
      this.textNum = val.length
      this.checkBtn()
    }
  }
}
</script>
<style lang="less" scoped>
  .setting{
    padding: 0;
    background-color: white;
    margin: 10px 0 10px 0;
    li{
      border-bottom: 1px solid #E6E6E6;
      display: flex;
      height: 50px;
      font-size: 16px;
      line-height: 50px;
      padding: 0 10px 0 10px;
      .leftImg{
        width: 35px;
        img{
          margin-top: 13px;
        }
      }
      .text{
        flex: 1;
      }
      .rightImg{
        font-size: 14px;
      }
    }
    li:last-child{
      border-bottom: 0;
    }
  }
  .signin{
    width: 90%;
    margin-top: 20px;
    margin-left: 5%;
    color: white;
    font-size: 18px;
  }
  .textareaText{
    width: 100%;
    background-color: white;
    textarea{
      width: 90%;
      height: 125px;
      margin-left: 5%;
      margin-top: 10px;
      padding: 0;
      border: 0;
      overflow:auto;
      background-attachment:fixed;
      background-repeat:no-repeat;
      border-style:solid;
      border-color: #FFFFFF;
      resize:none;
      outline:none;
      vertical-align: middle;
    }
  }
  .textNum{
    text-align: right;
    background-color: white;
    margin: 0;
    padding: 10px;
    font-size: 14px;
    color: #BBBBBB;
  }
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
</style>
