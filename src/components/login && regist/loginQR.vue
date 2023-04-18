<!--
 * @Description: 
 * @Author: Loscoy
 * @Date: 2023-04-14 12:21:42
 * @LastEditTime: 2023-04-18 18:21:51
 * @LastEditors: Loscoy
-->
<template>
	<div class="loginQR">
		<img :src="qrimg" alt="qrcode" />
	</div>
</template>

<script>
	import { checkScan, createQr, getQrKey, loginStatus } from '../../Api/user'
	import { mapActions } from 'vuex'
	export default {
		data() {
			return {
				unikey: '',
				qrimg: '',
				timer: null
			}
		},
		mounted() {
			let _this = this
			getQrKey()
				.then((res) => {
					_this.unikey = res.data.data.unikey
					return createQr(res.data.data.unikey)
				})
				.then((res) => {
					_this.qrimg = res.data.data.qrimg
					this.checkQR()
				})
		},
		beforeDestroy() {
			if (this.timer) {
				clearInterval(this.timer)
			}
		},
		methods: {
			...mapActions(['setUser']),
			back() {
				this.$emit('change', 'login', '登录')
			},
		  async checkQR() {
				let _this = this
        await checkScan()
				_this.timer = setInterval(() => {
					if (_this.unikey) {
						checkScan(_this.unikey).then((res) => {
							console.log(res.data)
							// 801 等待掃碼    802 授權中 803 授权成功
							if (res.data.code == 803) {
								clearInterval(_this.timer)
								// _this.$setCookie("userCookie", res.data.cookie, 7)
								loginStatus().then(r => {
									let data = {
										id: r.data.data.account.id,
										token: res.data.cookie
									}
									_this.setUser(data)
								})
								setTimeout(()=>{
									// location.reload()
									_this.$toast.Info(res.message)
								},500)
							}
						})
					}
				}, 2000)
			}
		}
	}
</script>

<style scoped>
	.loginQR {
		text-align: center;
	}
</style>
