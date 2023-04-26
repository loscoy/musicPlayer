<template>
	<div class="footer">
		<el-card class="footerC">
			<ul>
				<li @click="show">
					<mu-tooltip placement="top" content="播放器">
						<img src="../../assets/logo.png" height="30" width="30" alt="首页" />
					</mu-tooltip>
				</li>
				<li>
					<router-link to="/">
						首页
					</router-link>
				</li>
				<li>
					<router-link to="/cloud">
						云盘
					</router-link>
				</li>
				<li>
					<router-link to="/ucenter">
						我的
					</router-link>
				</li>
				<li>
					<router-link to="/search">
						搜索
					</router-link>
				</li>
			</ul>
		</el-card>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	export default {
		name: 'customFooter',
		methods: {
			...mapActions(['showMusicplay']),
			show() {
				this.$store.dispatch('showMusicplay')
			}
		}
	}
</script>

<style scoped>
	.footer {
		position: fixed;
		overflow: hidden;
		left: 0;
		right: 0;
		bottom: 0;
	}
	.footer ul {
		display: flex;
		align-items: center;
		height: 40px;
		line-height: 30px;
		list-style: none;
		width: 100%;
	}
	.footer ul li {
		flex: 1;
		text-align: center;
	}
	.footerC {
		margin: 0 10px 5px;
		border-radius: 30px;
		background-color: rgba(255, 255, 255, 0.72);
		backdrop-filter: saturate(180%) blur(20px);
	}
	
</style>
