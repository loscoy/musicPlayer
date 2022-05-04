<template>
	<div class="cloud">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>单曲</span>
				<div style="width: 75%">
					<transition name="el-fade-in">
						<div v-show="show">
							<el-autocomplete ref="s" class="search" v-model="searchName" prefix-icon="el-icon-search" clearable
								:trigger-on-focus="true" :fetch-suggestions="queryS" @select="playSelected" :debounce=10
								placeholder="搜索云盘内歌曲"></el-autocomplete>
						</div>
					</transition>
				</div>
				<i class="el-icon-search" v-show="!isSearching" @click="showInput"></i>
				<i class="icon icon-x" v-show="isSearching" @click="closeInput"></i>
			</div>
			<el-skeleton style="width:100%;height:420px;text-align: center;padding-top: 5px;" :loading="loading" animated>
				<template #template>
					<div style="display: flex; flex-direction: column; align-items: flex-start; justify-content: space-between;"
						v-for="i in 5" :key="i">
						<el-skeleton-item variant="text" style="width: 30%" />
						<el-skeleton-item variant="text" style="width: 20%;margin-top: 2px" />
						<el-divider></el-divider>
					</div>
				</template>

				<template #default>
					<div class="temp">
						<mu-load-more :loading="load" @load="loadMore">
							<ul class="uList">
								<li @click="playSelected(index)" v-for="(item,index) in cloudList.slice(0,limit)" :key="index"
									class="item">
									<div class="num">{{index+1}}</div>
									<div>
										<div class="name" style="font-size: 14px">{{item.songName}}</div>
										<div style="display: flex;align-items:center;font-size: 12px">
											<div class="artist">{{item.artist}}</div>
										</div>
									</div>
									<div></div>
								</li>
							</ul>
						</mu-load-more>
					</div>
				</template>
			</el-skeleton>
		</el-card>
	</div>
</template>

<script>
	import { getCloud } from '../Api/user'
	import router from '../router'
	import { mapActions, mapState } from 'vuex'

	export default {
		name: 'cloud',
		data() {
			return {
				cloudList: [],
				loading: false,
				limit: 100,
				offset: 10,
				searchName: '',
				show: false,
				load: false,
				isSearching: false,
				songIdArr: [],
				searchResult: []
			}
		},
		mounted() {
			this.loading = true
			//先获取总条目再获取数据
			getCloud(1).then(res => {
				getCloud(res.data.count).then(res => {
					this.cloudList = res.data.data
					setTimeout(() => {
						this.loading = false
					}, 1000)
				})
			})
		},
		computed: {
			...mapState[
				{
					currentIndex: state => state.song.currentIndex
				}
			]
		},
		methods: {
			...mapActions(['showMusicplay', 'setSong']),

			playSelected(item) {
				if (typeof item === typeof 1) {
					this.cloudList.forEach(item => {
						this.songIdArr.push(item.songId)
					})
					this.setSong({ currentIndex: item, songIdList: this.songIdArr })
				} else {
					let currentIndex = 0
					this.searchResult.forEach((element, index) => {
						this.songIdArr.push(element.id)
						if (item.id === element.id) {
              currentIndex = index
						}
					})
					this.setSong({ currentIndex: currentIndex, songIdList: this.songIdArr })
				}
				this.showMusicplay()
			},
			queryS(queryString, cb) {
				if (queryString) {
					cb(this.getSearchList(queryString))
				}
			},
			getSearchList(queryString) {
				this.searchResult = []
				let arr = new Array(0)
				this.cloudList.forEach(item => {
					arr.push({
						id: item.songId,
						value: item.songName + ' - ' + item.artist
					})
				})
				this.searchResult = arr.filter(this.createFilter(queryString))
				return arr.filter(this.createFilter(queryString))
			},
			createFilter(queryString) {
				return item => {
					// console.log(item);
					return item.value.toLowerCase().match(queryString.toLowerCase())
				}
			},
			showInput() {
				this.isSearching = true
				this.show = true
				if (this.show) {
					this.$nextTick(() => {
						this.$refs.s.$refs.input.focus()
					})
				}
			},
			closeInput() {
				this.isSearching = false
				this.show = false
			},
			loadMore() {
				this.load = true
				setTimeout(() => {
					this.limit += 100
					this.$nextTick(() => {
						this.load = false
					})
				}, 500)
			}
		}
	}
</script>

<style scoped>
	.cloud {
		margin: 10px auto;
		width: 100%;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}
	.box-card {
		width: 95%;
		border-radius: 10px;
		margin-top: 10px;
	}

	.name {
		font-size: 14px;
		text-align: left;
	}
	.item {
		margin-bottom: 18px;
		text-align: left;
		display: flex;
		overflow: hidden;
	}
	.box-card {
		width: 100%;
		border-radius: 10px;
	}
	.artist {
		position: relative;
		font-size: 5px;
		color: #999999;
	}
	.clearfix span {
		font-weight: bolder;
	}
	.clearfix {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 30px;
	}
	.num {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 10%;
		color: #999;
		font-size: 15px;
		font-family: 'Helvetica Neue';
		margin-right: 20px;
	}
	.temp {
		overflow: auto;
		height: 420px;
	}
</style>
<style>
	.clearfix .el-card__header {
		height: 60px;
	}
	.el-input__icon {
		line-height: 30px;
	}
</style>
