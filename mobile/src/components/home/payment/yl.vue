<template>
  <div>
    <div class="input-div" contenteditable placeholder="请输入电话号码" v-on:input="change"></div>
  </div>
</template>
<script>
// import { allUrl } from '@/router/allUrl'
// import { Indicator } from 'mint-ui'
export default {
  name: '',
  data () {
    return {
      text: ''
    }
  },
  methods: {
    change (e) {
      if (e.target.innerText.length > 10) {
        e.target.innerText = e.target.innerText.substring(0, 10)
        let range = ''
        if (window.getSelection) {
          range = window.getSelection()
          range.selectAllChildren(e.target)
          range.collapseToEnd()
        } else {
          range = document.selection.createRange()
          range.moveToElementText(e.target)
          range.collapse(false)
          range.select()
        }
      }
    }
  },
  watch: {
    'text': function (val) {
      console.log(val)
    }
  }
}
</script>
<style lang="less" scoped>
  .input-div{
    width: 200px;
    line-height: 30px;
    border: 1px solid black;
    padding: 1px 10px;
    font-size: 14px;
    height: 30px;
    text-align: left;
  }
  .input-div:empty::before{
    content: attr(placeholder);
    color:#bbb;
  }
  .input-div:focus::before{
    content:none;
  }
</style>
