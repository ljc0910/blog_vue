<template>
    <div class="demo">
        <div style="margin-top:20%;">
            <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item :title="v.name" :name="i" v-for="(v,i) in data" :key="i">
                    <p>链接：<a :href="v.url" target="_blank">{{v.name}}</a></p>
                    <p>技术栈：{{v.stack}}</p>
                    <p>描述：{{v.info}}</p>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        activeNames: [],
        data:[{
            name:'报价系统',
            // url:'http://www.jcgg.xyz/baojia',
            stack:'vue2.0+elementUI+axios+vuex-along+html2canvas、jspdf',
            info:'完整项目，主要成长点在权限控制模块'
        },{
            name:'设备系统vue',
            url:'http://www.jcgg.xyz/deviceSystem',
            stack:'vue2.0+vuex+elementUI+axios  nodejs+express+mongodb+mongoose',
            info:'设备管理系统，前端vue，后端nodejs'
        },{
            name:'设备系统react',
            url:'http://www.jcgg.xyz/reactDevice',
            stack:'react+redux+ant design',
            info:'react重构'
        },{
            name:'电影检索',
            url:'http://www.jcgg.xyz/movie',
            stack:'jquery+iframe+enjoyhint+node.js+cheerio爬虫+promise异步',
            info:'无广告、免会员视频'
        },{
            name:'必要商场',
            url:'http://www.jcgg.xyz/biyao',
            stack:'html+sass+js',
            info:'切图练习、原生插件编写'
        },
        ]
      };
    },
    methods: {
      handleChange(val) {
      }
    }
  }
</script>
<style>
.demo{width: 1000px;margin: 0 auto;overflow: hidden;}
.demo .el-collapse-item .el-collapse-item__header{padding:0 10px;background: rgba(255,255,255,.2)}
.demo .el-collapse-item__wrap{background: rgba(255,255,255,.8)}
.demo p{margin-left: 20px;text-indent: 0;}
</style>
