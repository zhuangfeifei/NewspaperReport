<template>
  <div id="app">

    <router-view/>

    <van-loading v-if="isLoading" id="apploading" size="40px" color="#219DB9"/>

  </div>
</template>

<script>
export default {
  name: 'App',
  computed:{
    isLoading(){
      return this.$store.state.userId == null ? true : false || this.$store.state.isLoading
    }
  },
  beforeCreate(){
    
  }
}
</script>

<style>
#app {
    /* 去掉点击事件标签的阴影 */
    -webkit-tap-highlight-color:rgba(255,255,255,0);
}
*{ 
  margin: 0; padding: 0; box-sizing: border-box; font-size: 0.3rem; 
}


#apploading{
  position: absolute; top: calc(50% - 20px); left: calc(50% - 20px); z-index: 10000;
}
</style>
