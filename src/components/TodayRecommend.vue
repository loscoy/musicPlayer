<template>
	<el-card class="mod-albums">
		<el-skeleton animated :loading="loading">
			<template #template>
				<div style="display: flex;flex-wrap: wrap;justify-content: center;width: 100%">
					<div style="width: 95%;margin-top: 10px">
						<el-skeleton-item style="width: 30%;float: left;height: 20px"></el-skeleton-item>
						<el-skeleton-item style="width: 20%;float: right;height: 20px"></el-skeleton-item>
						<div style="width:100%;display: flex;flex-wrap: wrap">
							<div style="width: 33%;" v-for="i in 6" :key="i">
								<el-skeleton-item variant="image" style="height: 100px;margin:10px;border-radius: 10px">
								</el-skeleton-item>
							</div>
						</div>
					</div>
				</div>
			</template>

			<template>
				<div v-if="this.url === '/personalized/newsong'">
					<div class="hd log url">
						<h2>{{title}}</h2>
						<router-link :to="{ name:'moreList', query:{ url:url,title:title}}" custom v-slot="{ navigate }">
							<div @click="navigate" role="link">更多</div>
						</router-link>
					</div>
					<div class="container">
						<div class="gallery">
							<div class="scroller">
								<div class="card url border-0" v-for="(item,index) in todayRecommend.slice(0, 6)" :key="index">
									<div class="album" @click="play(index)">
										<div class="img">
											<img :src="item.picUrl" :alt="item.name">
										</div>
										<div class="name">{{item.name}}</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div v-else-if="this.url === '/recommend/songs'">
					<div class="hd log url">
						<h2>{{title}}</h2>
						<router-link :to="{name:'moreList',query:{url:url,title:title}}" custom v-slot="{ navigate }">
							<div @click="navigate" role="link">更多</div>
						</router-link>
					</div>
					<div class="container">
						<div class="gallery">
							<div class="scroller">
								<div class="card url border-0" v-for="(item,index) in todayRecommend.slice(0,6)" :key="index">
									<div class="album" @click="play(index)">
										<div class="img">
											<img :src="item.al.picUrl" :alt="item.name">
										</div>
										<div class="name">{{item.name}}</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</template>
		</el-skeleton>
	</el-card>
</template>

<script>
	import { mapActions } from 'vuex'
	import { TodayRecommendPlaylist, TodayRecommendSongs } from '../Api/music.js'
	import axios from '../plugins/axios.js'
	import router from '../router'

	export default {
		name: 'TodayRecommend',
		data() {
			return {
				todayRecommend: [],
				loading: false
			}
		},
		props: {
			title: {
				type: String,
				default: '今日推荐'
			},
			url: {
				type: String,
				default: '/personalized/newsong'
			}
		},
		mounted() {
			this.loading = true
			if (this.url === '/personalized/newsong') {
				axios
					.get(this.url)
					.then(res => {
						this.todayRecommend = res.data.result
					})
					.catch(error => {
						console.log(error)
					})
			}
			if (this.url === '/recommend/songs') {
				TodayRecommendSongs().then(res => {
					this.todayRecommend = res.data.data.dailySongs
				})
			}
			setTimeout(() => {
				this.loading = false
			}, 1000)
		},
		computed: {},
		methods: {
			...mapActions(['showMusicplay', 'setSong']),
			play(index) {
				let arr = []
				this.todayRecommend.forEach(item => {
					arr.push(item.id)
				})
				this.setSong({ currentIndex: index, songIdList: arr })
				this.showMusicplay()
			}
		}
	}
</script>

<style scoped>
	.mod-albums {
		background-color: #fff;
		padding: 10px 17px;
		margin-top: 10px;
		z-index: -1;
	}
	.hd {
		display: flex;
		margin: 14px 0 18px 0;
	}
	.hd h2 {
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		flex: 1;
		margin: 0;
		padding: 0;
		font-size: 20px;
	}
	.hd div {
		width: 64px;
		font-size: 12px;
		text-align: right;
	}
	.mod-albums .gallery {
		overflow: hidden;
		margin: 0 -5px;
	}
	.mod-albums .gallery .card {
		width: 33.3%;
		float: left;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		padding: 0 5px 10px;
	}
	.mod-albums .gallery .card .album {
		position: relative;
	}
	.img {
		position: relative;
		width: 100%;
		height: 0;
		padding-top: 100%;
	}
	.mod-albums .gallery .card img {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		border: 1px solid #eee;
		border-radius: 15px;
	}
	.mod-albums .gallery .card .name {
		font-size: 12px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-top: 4px;
		line-height: 14px;
		max-height: 28px;
		margin-bottom: 2px;
	}
</style>
<style>
	.mod-albums .el-card__body {
		padding: 0;
	}
</style>
