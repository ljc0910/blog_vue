<template>
	<div class="loginPage" :style="{height:height}">
		<div class="content">
			<el-form  status-icon  class="demo-ruleForm">
				<el-form-item>
					<!-- <img src="../assets/img/sifo.png" alt="PTS"> -->
					<h2>jc`s blog</h2>
				</el-form-item>
				<el-form-item>
					<el-input  type="text" placeholder="账号" v-model="account" autocomplete="off" prefix-icon="el-icon-edit-outline">
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-input type="password" show-password  placeholder="密码" v-model="password" autocomplete="off" prefix-icon="el-icon-info"></el-input>
				</el-form-item>
				<el-row style="padding-top:20px;">
					 <el-button size="mini" @click="login()">登录</el-button>
					<!-- <el-button size="mini" @click="register()">注册</el-button> -->
				</el-row>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Login',
		data() {
			return {
				account: '',
				password: '',
				height:'',
				dialogVisible:false,
				pass:'',
				checkPass:'',
			}
		},
		mounted () {
			this.height = window.innerHeight+'px';	
			// this.register()
			var lett = this;
			document.onkeydown = function(e) {
				var key = window.event.keyCode;
				if (key == 13) {
					lett.login();
				}
			}
		},
		beforeDestroy(){
			document.onkeydown = function(e) {
				var key = window.event.keyCode;
				if (key == 13) {
					// lett.login();
				}
			}
		},
		methods: {
			login() {
				this.$axios.post(`/user`, { 
					username: this.account,
                    passwords: this.password,
                    type:"login"
				}).then(res => {
					if(res.data.success===true){
                        document.cookie="admin="+res.data.token
                        this.$root.$children[0].$children[0].isAdmin = true
                        this.$router.push({path:'/'}) 
					}else{
						this.$message.error(res.data.message);
					}
				}).catch(err=>{ 
					this.$message.error(err.toString());
				})
			},
			register() {
                this.$axios.post(`/user`, { 
					username: this.account,
                    passwords: this.password,
                    type:"register"
				}).then(res => {
					if(res.data.success===true){
						this.$message.error('111');
					}else{
						this.$message.error('err');
					}
				}).catch(err=>{ 
					this.$message.error(err.toString());
				})
			}

		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
	.loginPage{background:url(../assets/img/index_bg.jpg) no-repeat;background-size:100% 100%; overflow: hidden;position: relative;z-index: 999;}
	.content{width: 300px;height: 200px;margin: 200px auto;}
	.content .el-row{text-align: center;}
	.content .el-input__inner{height: 34px;}
	.content .el-form-item{margin: 10px;}
	.login_cpwd .el-input{width:280px;}
	.pwd_label{width: 120px;text-align: right;display: inline-block;}
	.loginPage .el-button--mini{padding: 10px 127px;border-radius: 5px;}
	.demo-ruleForm img{max-width:400px;max-height:150px;border:0;margin-left: -60px;}
	.demo-ruleForm h2{text-align: center;margin-top: -20px;}
</style>