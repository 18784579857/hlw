<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style>
body{
  padding: 0;
  margin: 0;
  background: #F5F5F5;
}
#app {
  position: absolute;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}
</style>
<style lang="less">
 .mint-msgbox {
   border-radius: 10px;
   .mint-msgbox-content {
     padding: 8vw;
     .mint-msgbox-message {
      color: #222;
     }
   }
   .mint-msgbox-btns {
     .mint-msgbox-btn.mint-msgbox-cancel {
       color: #D94242;
     }
     .mint-msgbox-btn.mint-msgbox-confirm {
       color: #01B04B;
     }
   }
 }
</style>
