<template>
	<div class="searchList">
		<el-card class="box-card">
			<el-page-header slot="header" @back="back" class="clearfix">
				<span slot="content">单曲</span>
			</el-page-header>
			<el-skeleton style="width:100%;text-align: center;padding-top: 5px;" :loading="loading" animated>
				<template #template>
					<div style="display: flex; flex-direction: column; align-items: flex-start; justify-content: space-between;"
						v-for="i in 10" :key="i">
						<el-skeleton-item variant="text" style="width: 30%" />
						<el-skeleton-item variant="text" style="width: 20%;margin-top: 2px" />
						<el-divider></el-divider>
					</div>
				</template>

				<template #default>
					<div class="temp">
						<ul >
							<li ref="li" v-for="(item,index) in newSearchList" @click="goToSelected(index)" :key="index" class="text item">
								<div class="name">{{item.name}}</div>
								<div class="artist">{{item.artist}}</div>
								<div></div>
								<el-divider></el-divider>
							</li>
						</ul>
					</div>
					<mu-pagination :total="300" :page-size="50" @change="changePage" :current.sync="currentPage"></mu-pagination>
				</template>
			</el-skeleton>
		</el-card>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	import { getDetailInfo } from '../Api/music'

	export default {
		name: 'searchList',
		data() {
			return {
				newSearchList: this.searchList,
				musicInfo: [],
				artistName: '',
				loading: false,
				currentPage: 1
			}
		},
		props: {
			searchName: '',
			searchList: []
		},
		watch: {
			// 监听父组件传值变化
			searchList(val) {
				this.newSearchList = val
				setTimeout(() => (this.loading = false), 500)
			}
		},
		computed: {},
		mounted() {
			this.loading = true
		},
		methods: {
			...mapActions(['showMusicplay', 'setSong']),
			goToSelected(index) {
				let arr = []
				this.newSearchList.forEach(item => {
					arr.push(item.id)
				})
				this.setSong({ currentIndex: index, songIdList: arr })
				this.showMusicplay()
			},
			back() {
				this.$emit('back')
			},
			changePage(val) {
				this.$emit('changePage', val)
				const liArr = this.$refs.li
				liArr[0].scrollIntoView()
			}
		}
	}
</script>

<style scoped>
	.searchList {
		text-align: center;
		position: relative;
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		height: 100%;
		/* margin-top: 10px; */
	}
	.item {
		/* margin-bottom: 18px; */
		text-align: left;
	}
	.clearfix:before,
	.clearfix:after {
		display: table;
		content: '';
	}
	.clearfix:after {
		clear: both;
	}
	.box-card {
		width: 100%;
		text-align: left;
	}
	.artist {
		position: relative;
		font-size: 5px;
		color: #999999;
	}
	.el-divider--horizontal {
		margin: 8px 0;
		background: 0 0;
		border-top: 1px solid #e8eaec;
	}
	.clearfix span {
		font-weight: bolder;
	}

	.el-card {
		border-radius: 10px;
	}
	.temp{
		overflow: auto;
		height: 380px;
	}
	.name{
		overflow: hidden;
	}
</style>

