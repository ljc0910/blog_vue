<template>
  <div class="Header">
    <div class="Header-cont">
      <div class="header-title">
        jc`s blog
      </div>
      <ul class="header-list">
        <router-link tag="li" to="/">首页</router-link>
        <router-link tag="li" to="/demo">demo</router-link>
        <router-link tag="li" to="/timeline">
          <el-menu :default-active="activeIndex"  mode="horizontal" @select="handleSelect">
            <el-submenu index="1">
              <template slot="title">{{timeline}}</template>
              <router-link tag="el-menu-item" index="1-1" :to="{name:'timeline',params:{year:2017}}">2017</router-link>
              <router-link tag="el-menu-item" index="1-2" :to="{name:'timeline',query:{year:2018}}">2018</router-link>
              <router-link tag="el-menu-item" index="1-3" :to="{name:'timeline',query:{year:2019}}">2019</router-link>
            </el-submenu>
          </el-menu>
        </router-link>
        <router-link tag="li" to="/edit" v-if="isAdmin">edit</router-link>
        <router-link tag="li" to="/admin" v-if="!isAdmin">admin</router-link>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
    data () {
        return {
            activeIndex:'1',
            timeline:'timeline',
            isAdmin:false
        }
    },
    methods:{
        handleSelect(){
            
        }
    },
    mounted(){
      if(document.cookie.split('=')[0]=='admin'){
            this.isAdmin = true
      }
    }
}
</script>

<style>
.Header{padding: 20px 0
;background: rgba(255, 255, 255, 0.5);overflow: hidden;position: fixed;top: 0;left: 0;width: 100%;z-index: 1;}
.Header-cont{width: 1200px;margin: 0 auto;}
.header-title{float: left;margin-left: 30px;}
.header-list{float: right;}
.header-list>li{cursor: pointer;float: left;margin: 0 20px;padding:5px 10px;border-radius: 6px;}
.router-link-exact-active{background: #BE93C5;color: #fff;}
.router-link-exact-active .el-submenu__title{color: #fff !important;}
.router-link-exact-active .el-submenu__title i{color: #fff;}
.Header .el-menu--horizontal>.el-submenu .el-submenu__title{height: 16px;line-height: 16px;padding: 0;border: none;color: #000;}
.Header .el-menu.el-menu--horizontal{border: none;background: none;}
.Header .el-menu--horizontal>.el-submenu .el-submenu__title:hover{background: none;}
.Header .el-menu--collapse .el-menu .el-submenu, .el-menu--popup{min-width: 94px;}
 .el-menu--popup-bottom-start{margin-left:-10px;}
</style>
