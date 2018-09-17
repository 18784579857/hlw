<template>
  <div class="team">
    <div class="teamHeader">
      <Header :headerList="headerList"></Header>
    </div>
    <div class="teamView">
      <ul>
        <li v-if="!this.dataList||this.dataList.length==0" class="nodata">--暂无更多--</li>
        <li v-else v-for="(item,index) in dataList" :key="index">
          <div class="l_top">
            <div class="l_div">
              <p>姓名：{{item.name}}</p>
              <!-- <p>
                月店销量：
                <span v-show="item.numLook">{{item.num}}</span>
                <span class="lookBtn" @click="look(index,item.id)" v-show="!item.numLook">点击查看</span>
              </p> -->
            </div>
            <div class="mid_div">
                <p>级别：{{item.userTypeDesc}}</p>
            </div>
            <div class="r_div">
              <p>电话：{{item.phone}}</p>
            </div>
          </div>
          <!-- <div @click="lookTeam(item.id,item.teamNum)" class="l_bottom">
            <div class="l_team">
              他的店长：{{item.teamNum}}
            </div>
            <div class="ic_right" style="display:none;">
              <img :src="ic_right" alt="" width="7" height="11">
            </div>
          </div> -->
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Header from 'base/header/header'
import { allUrl } from '@/router/allUrl'
export default {
  name: 'team',
  components: {
    'Header': Header
  },
  data () {
    return {
      ic_right: require('@/assets/image/personal/ic_right.png'),
      loading: false,
      headerList: {
        leftText: '返回',
        text: '店长人数'
      },
      dataList: []
    }
  },
  methods: {
    look (index, id) { // 查看具体月团销量和月团奖金
      const self = this
      this.$get(allUrl.selectUserSales + '/' + id).then(res => {
        if (res.success) {
          self.dataList[index].num = res.data.amount
          self.dataList[index].numLook = true
        } else {
          self.$toast({
            message: res.msg,
            iconClass: 'el-icon-error'
          })
        }
      })
    },
    lookTeam (id, num) { // 查看他的团队
      // const self = this
      // if (num <= 0) {
      //   this.$toast({
      //     message: '该团队没有团队人员！'
      //   })
      // } else {
      //   self.$get(allUrl.selectTeam + '/' + 1 + '/' + 10000 + '/' + id).then(res => {
      //     if (res.success) {
      //       self.dataList = []
      //       let list = res.data.list
      //       if (list) {
      //         list.forEach(e => {
      //           self.dataList.push({
      //             id: e.id,
      //             name: e.userName,
      //             phone: e.mobile,
      //             num: 0,
      //             teamNum: e.people,
      //             numLook: false
      //           })
      //         })
      //       }
      //     }
      //   })
      // }
    },
    getTeamData () {
      const self = this
      self.$get(allUrl.selectTeam + '/' + 1 + '/' + 10000).then(res => {
        if (res.success) {
          let list = res.data.list
          if (list) {
            list.forEach(e => {
              //  <!--userTypeCode  1 经理 2 会员 3 店主    userLevelCode 0 普通经理  1 一星经理 2 2邢经理 -->
              if (e.userTypeCode) {
                if (e.userTypeCode === '2') {
                  e.userTypeDesc = '会员'
                } else if (e.userTypeCode === '3') {
                  e.userTypeDesc = '店主'
                } else {
                  if (e.userLevelCode === '0') {
                    e.userTypeDesc = '经理'
                  } else if (e.userLevelCode === '1') {
                    e.userTypeDesc = '一星经理'
                  } else if (e.userLevelCode === '2') {
                    e.userTypeDesc = '二星经理'
                  } else if (e.userLevelCode === '3') {
                    e.userTypeDesc = '三星经理'
                  } else if (e.userLevelCode === '4') {
                    e.userTypeDesc = '合伙人'
                  } else {
                    e.userTypeDesc = ''
                  }
                }
              }
              self.dataList.push({
                id: e.id,
                name: e.userName,
                phone: e.mobile,
                num: 0,
                teamNum: e.people,
                numLook: false,
                userTypeDesc: e.userTypeDesc
              })
            })
          }
        }
      })
    }
  },
  mounted () {
    this.getTeamData()
  }
}
</script>
<style lang="less" scoped>
  .team{
    display: flex;
    flex-direction:column;
    justify-content: space-between;
    height: 100%;
  }
  .teamHeader{
    border-bottom: 1px solid #ECECEC;
  }
  .nodata{
    text-align: center;
    padding: 10px;
  }
  .teamView{
    flex: 1;
    overflow: auto;
    ul{
      list-style: none;
      padding: 0;
      margin: 0;
      margin-top: 5px;
      li{
        .l_top{
          // display: flex;
          border-bottom: 1px solid #ECECEC;
          padding: 5px 15px 18px 15px;
          font-size: 15px;
          margin-top: 10px;
          flex:wrap;
          background-color: white;
          p{
            padding: 0;
            margin: 10px 0 0 0;
            color: #222222;
          }
          .l_div{
            flex: 0.4;
            p{
              .lookBtn{
                color: #143675;
              }
            }
          }
          .mid_div{
              flex: 0.6;
            p{
              .lookBtn{
                color: #143675;
              }
            }
          }
          .r_div{
            p{
              .lookBtn{
                color: #143675;
              }
            }
          }
        }
        .l_bottom{
          display: flex;
          height: 45px;
          padding: 0 15px 0 15px;
          line-height: 45px;
          font-size: 15px;
          color: #222222;
          background-color: white;
          .l_team{
            flex: 1;
          }
          .ic_right{
            width: 20px;
            text-align: right;
          }
        }
      }
    }
  }
</style>
