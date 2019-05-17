<template>
  <div class="home">
    <div class="home_bg"></div>
    <div class="home-cont">
      <div class="cont-nav">
        <ul class="summary">
          <li>
            <h1>文章</h1>
            <div>{{blogInfo.articleLength}}</div>
          </li>
          <li>
            <h1>评论</h1>
            <div>{{blogInfo.comment}}</div>
          </li>
          <li>
            <h1>访问</h1>
            <div>{{blogInfo.traffic}}</div>
          </li>
        </ul>
        <p>
          欢迎来到jc的个人博客，本网站建于2019年1月28号。在这里你可以看到一些web相关的文章，今天是{{curDate.year}}年{{curDate.month}}月{{curDate.day}}日，农历{{lunarDate.lunarYear}}年{{lunarDate.lunarMonth}}月{{lunarDate.lunarDay}}！
        </p>
        <ul class="latest-article">
          <li>
            <h2>最新文章</h2>
          </li>
          <router-link tag="li" class="alink" :to="{name:'detail',query:{id:v._id}}" v-for="(v,i) in newInfo.newArticle" :key=i>{{i+1}}.{{v.title}}</router-link>
        </ul>
        <ul class="latest-comments">
          <li>
            <h2>最新评论</h2>
          </li>
          <router-link tag="li" class="alink" :to="{name:'detail',query:{id:v.id}}" v-for="(v,i) in newInfo.newComment" :key=i>{{i+1}}.{{v.textVal}}</router-link>
        </ul>
      </div>
      <div class="cont-detail">
          <!-- <div class="lunbo">
            <el-carousel :interval="5000" arrow="hover">
              <el-carousel-item v-for="item in 4" :key="item">
                <h3>{{ item }}</h3>
              </el-carousel-item>
            </el-carousel>
          </div> -->
          <el-input placeholder="请输入关键词" v-model="searchVal" class="input-with-select">
            <el-select v-model="articleType"  slot="prepend"  placeholder="请选择" @change="articleQuery">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
          
          <ul class="cont-detail_list">
              <!-- <router-link tag="li" :to="{name:'detail',query:{id:v._id}}" v-for="(v,i) in articleCont" :key=i > -->
                <li v-for="(v,i) in articleCont" :key=i>
                  <div class="article">
                    <!-- <el-button class="delete" size="mini"  type="danger" round @click="deleteArticle(v._id)" v-if="isAdmin">删除</el-button> -->
                    <img :src=v.picBase alt="">
                    <div class="article-cont">
                      <h1>
                        {{v.title}}
                      </h1>
                      <p>
                        {{v.value}}
                        <router-link tag="a" :to="{name:'detail',query:{id:v._id}}">查看更多</router-link>
                      </p>
                      <div class="article-info">
                        <div class="article-time">
                           <i class="el-icon-time">{{v.curTime}}</i> 
                        </div>
                        <div class="article-readnum">
                          <i class="el-icon-edit" style="color:#409EFF;cursor:pointer;font-size:18px;" @click="editArticle(v._id)" v-if="isAdmin"></i>
                          <i class="el-icon-delete" style="color:#f56c6c;cursor:pointer;font-size:18px;" @click="deleteArticle(v._id)" v-if="isAdmin"></i>
                          <i class="el-icon-view">{{v.viewNum}}</i>
                          <i class="el-icon-document">{{v.commentNum}}</i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="comments"></div>
                </li>
              <!-- </router-link> -->
              <li v-if="!articleCont.length"><h3  style="height:100px;line-height:100px;text-align:center;">暂无相关数据!</h3></li>
          </ul>
          <el-pagination
            layout="prev, pager, next"
            :current-page.sync="pageNum"
            :total="pageNums"
            @current-change="articleQuery">
          </el-pagination>
      </div>
      <p style="position: absolute;bottom: 30px;left:0;text-align: center;width:100%;"><a href="https://github.com/ljc0910" target="_blank">github</a></p>
      <p style="position: absolute;bottom: 10px;left:0;text-align: center;width:100%;"><a href="http://www.miitbeian.gov.cn">豫ICP备17044219号</a></p>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import sloarToLunar from '../plugins/fragment.js'
export default {
  data(){
    return{
      articleCont:[
        
      ],
      pageNums:0,
      pageNum:1,
      articleType:0,
      searchVal:'',
      options: [{
        value: 0,
        label: '全部'
      },{
        value: 1,
        label: '前端框架'
      }, {
        value: '2',
        label: 'nodejs'
      }, {
        value: '3',
        label: '切图仔'
      }, {
        value: '4',
        label: '其他'
      }],
      blogInfo:'',
      curDate:{
        year:'',
        month:'',
        day:''
      },
      lunarDate:{
        lunarDay:'',
        lunarMonth:'',
        lunarYear:''
      },
      newInfo:{},
      isAdmin:false
    }
  },
  methods: {
    articleQuery(){
      this.$axios.get(`/getBlogInfo`).then(res=>{
        this.blogInfo = res.data
      })
      this.$axios.get(`/getNewInfo`).then(res=>{
        this.newInfo = res.data
      })

      this.$axios.get(`/outArticle`, {
                  params:{
                    articleType:this.articleType,
                    pageNum:this.pageNum,
                    searchVal:this.searchVal
                  }
        }).then(res => {
            this.articleCont = res.data.data,
            this.articleCont.forEach(v=>{
              v.picBase = v.picBase==""?'../assets/img/index_bg.jpg':v.picBase
            })
            this.pageNums = res.data.pageNums*10
        })
        
    },
    search(){
      this.articleQuery()
    },
    editArticle(id){
      this.$confirm('前往编辑页, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push({
            path:'/edit',query:{id:id}
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
    },
    deleteArticle(id){
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post(`/deleteArticle`, { 
            id:id
            }).then(res => {
            if(res.data.success){			
               this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.articleQuery();
            }else{
             this.$message.error('网络错误');
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
  },
  mounted(){
      var curTime = new Date();
      this.curDate = {
        year:curTime.getFullYear(),
        month:curTime.getMonth()+1,
        day:curTime.getDate()
      }
      this.lunarDate = sloarToLunar(this.curDate.year,this.curDate.month,this.curDate.day)
      this.articleQuery();
      if(document.cookie.split('=')[0]=='admin'){
        this.isAdmin = true
      }
  }
}
</script>

<style>
.home{height: 100vh;overflow: auto;}
.home .home-cont{width: 1200px;border-radius:5px;margin:80px auto;background: rgba(255, 255, 255, 0.1);height: 800px;padding: 3px;}
.home .cont-nav{width: 290px;float: left;background: rgba(255, 255, 255, 0.2);height: calc(100% - 10px);padding:5px;}
.home .cont-detail{width: 890px;float: right;}
.home .el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.home .el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.home .el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
.home .cont-detail_list{height: 718px;}
.home .cont-detail_list li{margin: 1px 0;overflow: hidden;background:rgba(255,255,255,.2);}
.home .article>img{float: left;width: 200px;height: 140px;}
.home .article-cont{float: right;width: 670px;}
.home .article{position: relative;}
.home .article:hover .delete{display: block;}
.home .article-cont h1{font-size: 20px;height: 30px;line-height: 30px;}
.home .article-cont p{font-size: 14px;line-height: 16px;height: 90px;overflow: hidden;}
.home .article-readnum{height: 20px;line-height: 20px; float: right;margin-right: 10px;}
.home .article-readnum i{font-size: 14px;}
.home .summary{display: flex;justify-content: space-around;border-bottom: 1px solid #eaeefb;background: rgba(255, 255, 255, 0.5);padding: 10px;margin-bottom: 5px; }
.home .summary h1{font-size: 16px;font-weight: normal}
.home .summary div{font-size: 14px;text-align: center;}
.cont-nav>p{padding: 10px;background: rgba(255, 255, 255, 0.5)}
.home .el-pagination{text-align: center;background: rgba(255, 255, 255, 0.6);}
.home .el-pagination button{background:none;}
.home .el-pagination li{background: none;}
.home .article-time{float:left;}
.home .el-select{width: 100px;}
.latest-article,.latest-comments{background: rgba(255, 255, 255, 0.5);padding: 10px;margin: 5px 0;}
.latest-article .alink{color: royalblue;cursor: pointer;margin: 4px;}
.latest-article .alink:hover{ text-decoration:underline;}
.latest-comments .alink{color: royalblue;cursor: pointer;margin: 4px;}
.latest-comments .alink:hover{ text-decoration:underline;}
.home .delete{position: absolute;right: 100px;top: 10px;display: none;}
</style>
