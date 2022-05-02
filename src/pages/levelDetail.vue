<template>
	<div class="userDetail">

		<el-card>
			<el-skeleton :loading="loading" animated>
				<template>
					<el-skeleton-item></el-skeleton-item>
				</template>
				<template #default>
					<el-page-header @back="back">
						<div style="font-size: 15px" slot="content">我的等级</div>
					</el-page-header>

					<div class="nowLevel">
						当前等级: <span>LV.{{levelInfo.level}}</span>
					</div>
					<div class="levelSchedule">
						<mu-linear-progress mode="determinate" :value="levelInfo.level*10" :size="5" color="red">
						</mu-linear-progress>
					</div>
					<div style="color:#999;margin:5px;font-size:12px">
						等级数据每天下午2时更新
					</div>

					<hr style="FILTER:alpha(opacity=100,finishopacity=0,style=3)" color=#ccc SIZE=0 margin=10px>

					<div class="nowPrivilege">
						<div class="title">当前音乐特权</div>
						<ul>
							<li>{{info.info1}}</li>
							<li>{{info.info2}}</li>
						</ul>
					</div>
				</template>
			</el-skeleton>
		</el-card>

		<el-card style="margin-top:10px">
			<el-skeleton :loading="loading" animated>
				<template></template>
				<template #default>
					<div class="nextLevel">
						距离下一个等级:<span>LV.{{levelInfo.level+1}}</span>
					</div>
					<div class="detail">
						<div class="listenCount">
							<mu-circular-progress class="demo-circular-progress" mode="determinate" color="secondary" :max="listenMax"
								:stroke-width="5" :value="levelInfo.listenCount" :size="100">
							</mu-circular-progress>
							<div style="text-align:center;font-size:12px">听歌量:{{levelInfo.listenCount}}</div>
						</div>
						<div class="loginCount">
							<mu-circular-progress class="demo-circular-progress" mode="determinate" :stroke-width="5" :max="loginMax"
								:value="levelInfo.loginCount" :size="100">
							</mu-circular-progress>
							<div style="text-align:center;font-size:12px">登录天数:{{levelInfo.loginCount}}</div>
						</div>
					</div>
				</template>
			</el-skeleton>
		</el-card>
		<div style="font-size:12px;color:#999">听歌量是指累计播放的歌曲而非播放次数，并且实际播放时间过短的歌曲将不纳入计算，每天最多计算300首</div>
	</div>
</template>

<script>
	import { getLevelInfo } from '../Api/user'

	export default {
		name: 'userDetail',
		data() {
			return {
				levelInfo: [],
				lisCountSp: [],
				logCountSp: [],
				loading: false
			}
		},
		computed: {
			uid() {
				return this.$store.state.user.id
			},
			info() {
				if (this.levelInfo.info) {
					return {
						info1: this.levelInfo.info.split('$')[0],
						info2: this.levelInfo.info.split('$')[1]
					}
				}
			},
			listenMax() {
				return (this.lisCountSp[0] + 1) * Math.pow(10, this.lisCountSp.length - 1)
			},
			loginMax() {
				return (this.logCountSp[0] + 1) * Math.pow(10, this.logCountSp.length - 1)
			}
		},
		created() {
			this.loading = true
			this.getLevel()
		},
		methods: {
			getLevel() {
				getLevelInfo().then(res => {
					this.levelInfo = {
						info: res.data.data.info,
						level: res.data.data.level,
						listenCount: res.data.data.nowPlayCount,
						loginCount: res.data.data.nowLoginCount
					}
					this.lisCountSp = this.splitNum(res.data.data.nowPlayCount)
					this.logCountSp = this.splitNum(res.data.data.nowLoginCount)
					setTimeout(() => {
						this.loading = false
					}, 500)
				})
			},
			splitNum(num) {
				return (num + '').split('').map(Number)
			},
			back() {
				this.$router.go(-1)
			}
		}
	}
</script>


<style scoped>
	.nowLevel {
		text-align: center;
		margin: 10px;
	}
	.nowLevel span {
		color: red;
		font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva,
			Verdana, sans-serif;
	}
	.nextLevel {
		font-size: 12px;
		color: #999;
	}
	.nextLevel span {
		color: red;
		font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva,
			Verdana, sans-serif;
	}
	.nowPrivilege ul,
	li {
		list-style-type: disc !important;
		overflow-x: visible !important;
		margin-left: 10px;
		color: #999;
	}
	ul li::marker {
		color: red;
	}
	hr {
		margin: 10px 0 10px;
	}
	.detail {
		display: flex;
		justify-content: space-between;
		margin: 15px;
	}
</style>