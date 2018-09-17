<template>
  <div class="audit">
    <div class="auditHeader">
      <Header :headerList="headerList"></Header>
    </div>
    <div class="auditContent">
      <ul>
        <li v-for="(item,index) in list" :key="index">
          <p class="p_name">
            姓名：{{item.name}}
            <span class="s_phone">
              电话：{{item.phone}}
            </span>
          </p>
          <p class="p_time">
            <span class="s_time">
              {{item.time}}
            </span>
            <span v-if="item.state === '1'" class="s_state" style="color:#27AAF6">
              <!-- {{item.stateText}} -->
              <mt-button @click="shClick(item.id)" style="padding:0 5px;height:25px;" v-show="item.state === '1'" type="danger" size="small">立即通过</mt-button>
            </span>
            <span v-if="item.state === '2'" class="s_state" style="color:#01B04B">
              {{item.stateText}}
            </span>
            <span v-if="item.state === '3'" class="s_state" style="color:#D94242">
              {{item.stateText}}
            </span>
            <br>
          </p>
          <!-- <p style="text-align: right;">
            <mt-button @click="shClick(item.id)" style="padding:0 5px;height:25px;" v-show="item.state === '1'" type="danger" size="small">立即通过</mt-button>
          </p> -->
          <p class="p_reason" v-if="item.state === '3'">
            失败原因：{{item.reason}}
          </p>
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
  name: 'audit',
  components: {
    'Header': Header
  },
  data () {
    return {
      headerList: {
        leftText: '返回',
        text: '下级代理审核进度'
      },
      list: []
    }
  },
  methods: {
    selectSchedule () {
      this.list = []
      this.$get(allUrl.selectSchedule + '/1/10000').then(res => {
        if (res.success) {
          let list = res.data.list
          if (list) {
            list.forEach(e => {
              let stateText = ''
              switch (e.statusCode) {
                case '1':
                  stateText = '待审核'
                  break
                case '2':
                  stateText = '已通过'
                  break
                case '3':
                  stateText = '审核未通过'
                  break
                default:
                  break
              }
              this.list.push({
                id: e.id,
                name: e.userName,
                phone: e.mobile,
                time: e.gmtCreateStr,
                state: e.statusCode,
                stateText: stateText,
                reason: e.reason
              })
            })
          }
        }
      })
    },
    shClick (id) {
      let self = this
      MessageBox.confirm('是否通过?', '').then(action => {
        self.$get(allUrl.shTg + id).then(res => {
          if (res.success) {
            self.$toast({
              message: '下级代理已通过！',
              iconClass: 'el-icon-success',
              duration: 1500
            })
            this.selectSchedule()
          } else {
            self.$toast({
              message: res.msg,
              iconClass: 'el-icon-error',
              duration: 1500
            })
          }
        })
      }).catch(action => {})
    }
  },
  mounted () {
    this.selectSchedule()
  }
}
</script>
<style lang="less" scoped>
  .audit{
    display: flex;
    flex-direction:column;
    justify-content: space-between;
    height: 100%;
    font-family: "PingFang SC";
    .auditHeader{
      border-bottom: 1px solid #F5F5F5;
    }
    .auditContent{
      flex: 1;
      overflow: auto;
      ul{
        padding: 0;
        margin: 10px 0 0 0;
        background-color: white;
        li{
          border-bottom: 1px solid #F5F5F5;
          padding: 15px;
          p{
            padding: 0;
            margin: 0;
          }
          .p_name{
            font-size: 15px;
            color: #222222;
            .s_phone{
              margin-left: 15px;
            }
          }
          .p_time{
            display: flex;
            margin-top: 8px;
            .s_time{
              font-size: 12px;
              color: #999999;
              flex: 1;
            }
            .s_state{
              font-size: 14px;
              text-align: right;
            }
          }
          .p_reason{
            color: #666666;
            font-size: 12px;
            margin-top: 6px;
          }
        }
      }
    }
  }
</style>
