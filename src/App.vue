<template>
  <div id="app">
    <Header />
    <div class="color_bg"></div>
    <router-view/>
  </div>
</template>

<script>
import Header from './components/header';
export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style>
@import "../src/assets/css/normalize.css";
.color_bg{
  font-family: 'Nunito', sans-serif;
  background: -webkit-linear-gradient(right, #BE93C5 , #7BC6CC);
  background: linear-gradient(to left, #BE93C5 , #7BC6CC);
  position: absolute;z-index: -1;
  width: 100%;
  height: 100%;
}
</style>
