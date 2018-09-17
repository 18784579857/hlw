<template>
  <div class="swiper" :class="message.length?'':'msg'">
    <div class="advertising">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="swipe in swipes" :key="swipe.id">
          <img style="width:100%;min-height:150px" @click="handlerClick(swipe)" :src="swipe.imgUrl" alt="广告位图片">
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="message" v-if="message.length">
      <i class="el-icon-xls-laba"></i>
      <mt-swipe :auto="5000" :show-indicators="false">
        <mt-swipe-item v-for="msg in message" :key="msg.id">
          <span>{{msg.content}}</span>
        </mt-swipe-item>
      </mt-swipe>
    </div>
  </div>
</template>
<script>
// import { MessageBox } from 'mint-ui'
import {allUrl} from '@/router/allUrl'
export default {
  data () {
    return {
      swipes: [],
      message: []
    }
  },
  methods: {
    getImgData () {
      this.$get(allUrl.advertising).then((res) => {
        if (res.success) {
          this.swipes = res.data
        }
      })
    },
    getMessage () {
      this.$get(allUrl.pushMessage).then((res) => {
        if (res.success) {
          this.message = res.data
        }
      })
    },
    handlerClick (obj) {
      switch (obj.adType) {
        case 'U': // 链接
          // window.location.href = obj.content
          window.open(obj.content)
          break
        case 'A': // 文字
          // MessageBox({
          //   title: obj.title,
          //   message: obj.content
          // })
          this.$router.push({
            path: '/news',
            query: {
              id: obj.id
            }
          })
          break
      }
    }
  },
  created () {
    this.getImgData()
    this.getMessage()
  }
}
</script>
<style lang="less" scoped>
  @import '../../../../assets/xlsicon/iconfont.css';
.swiper {
  .advertising {
    height: 48vw;
  }
  .message {
    height: 9vw;
    display: flex;
    align-items: center;
    padding: 0 4vw;
    line-height: 9vw;
    span {
      font-size: 13px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
    > div {
      flex: 1;
      margin-left: 5px;
    }
  }
}
.msg {
  padding-bottom: 3vw;
}
</style>
