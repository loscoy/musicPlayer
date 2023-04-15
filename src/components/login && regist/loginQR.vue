<!--
 * @Description: 
 * @Author: Loscoy
 * @Date: 2023-04-14 12:21:42
 * @LastEditTime: 2023-04-15 09:43:02
 * @LastEditors: Loscoy
-->
<template>
	<div class="loginQR">
		<img :src="qrimg" alt="qrcode" />
		<div class="alert">qrcode</div>
	</div>
</template>

<script>
	import { checkScan, createQr, getQrKey } from '../../Api/user'
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
				})
		},
		created() {
			let _this = this
			_this.checkQR()
		},
		methods: {
			back() {
				this.$emit('change', 'login', '登录', '暂不登录')
			},
		  async checkQR() {
				let _this = this
        await checkScan()
				_this.timer = setInterval(() => {
          
          let unikey = _this.unikey
          
					checkScan(unikey).then((res) => {
            console.log(res.data)
						// 801 等待掃碼    802 授權中
						if (res.data.code == 803) {
						  clearInterval(_this.timer)
              _this.$setCookie("userCookie", res.data.cookie, 7)
              setTimeout(()=>{
                // location.reload()
                _this.$toast.Info(res.message)
              },500)
						}
					})
				}, 2000)
			}
		}
	}
</script>

<style scoped>
	.loginQR {
		padding-left: 10px;
	}
	.alert {
		color: red;
	}
</style>
