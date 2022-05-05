<template>
	<!--  今日推荐 - 更多-->
	<div class="more-list" v-if="this.$route.query.url === '/personalized/newsong'">
		<div class="wrapper" ref="container">
			<mu-load-more @refresh="refresh" :refreshing="refreshing">
				<h3>{{this.$route.query.title}}</h3>
				<div class="info url log" v-for="(item,index) in morelist" :key="index">
					<div @click="play(index)">
						<div class="poster">
							<div class="img">
								<img :src="item.picUrl" :alt="item.name">
							</div>
						</div>
						<div class="text-wrap">
							<div class="name">{{item.name}}</div>
							<div class="author">{{item.song.artists[0].name}}</div>
						</div>
					</div>
				</div>
			</mu-load-more>
		</div>
	</div>
	<!--  每日推荐 - 更多-->
	<div class="more-list" v-else-if="this.$route.query.url === '/recommend/songs'">
		<div class="wrapper" ref="container">
			<mu-load-more @refresh="refresh" :refreshing="refreshing">
				<h3>{{this.$route.query.title}}</h3>
				<div class="info url log" v-for="(item,index) in morelist" :key="index">
					<div @click="play(index)">
						<div class="poster">
							<div class="img">
								<img :src="item.al.picUrl" :alt="item.name">
							</div>
						</div>
						<div class="text-wrap">
							<div class="name">{{item.name}}</div>
						</div>
					</div>
				</div>
			</mu-load-more>
		</div>
	</div>
	<!--  新歌速递 - 更多-->
	<div class="more-list" v-else-if="this.$route.query.url === '/album/newest'">
		<div class="wrapper" ref="container">
			<mu-load-more @refresh="refresh" :refreshing="refreshing">
				<h3>{{this.$route.query.title}}</h3>
				<div class="info url log" v-for="(item,index) in morelist" :key="index">
					<div @click="play(index)">
						<div class="poster">
							<div class="img">
								<img :src="item.picUrl" :alt="item.name">
							</div>
						</div>
						<div class="text-wrap">
							<div class="name">{{item.name}}</div>
							<div class="author">{{item.artist.name}}</div>
						</div>
					</div>
				</div>
			</mu-load-more>
		</div>
	</div>
</template>

<script>
	import axios from '../plugins/axios'
	import router from '../router'
	import { TodayRecommendSongs } from '../Api/music'
	import { mapActions } from 'vuex'

	export default {
		name: 'moreList', //更多列表组件（热门歌单，今日推荐）
		data() {
			return {
				morelist: [],
				offset: 10,
				refreshing: false
			}
		},
		components: {},
		mounted() {
			if (this.$route.query.url === '/personalized/newsong') {
				axios
					.get(this.$route.query.url)
					.then((res) => {
						// console.log("1",res.data.result[0].song.artists[0].name)
						this.morelist = res.data.result
					})
					.catch((error) => {
						console.log(error)
					})
			}
			if (this.$route.query.url === '/recommend/songs') {
				TodayRecommendSongs().then((res) => {
					this.morelist = res.data.data.dailySongs
				})
			}
			if (this.$route.query.url === '/album/newest') {
				axios
					.get(this.$route.query.url)
					.then((res) => {
						this.morelist = res.data.albums
						this.morelist = this.morelist.slice(0, 10)
						// console.log("list",this.morelist)
					})
					.catch((error) => {
						console.log(error)
					})
			}
			// console.log("api",this.$route.query.url)
		},
		methods: {
			...mapActions(['showMusicplay', 'setSong']),
			refresh() {
				this.refreshing = true
				this.$refs.container.scrollTop = 0
				setTimeout(() => {
					if (this.$route.query.url === '/personalized/newsong') {
						axios
							.get(this.$route.query.url)
							.then((res) => {
								console.log('1', res.data)
								this.morelist = res.data.result
							})
							.catch((error) => {
								console.log(error)
							})
					}
					if (this.$route.query.url === '/recommend/songs') {
						TodayRecommendSongs().then((res) => {
							this.morelist = res.data.data.dailySongs
							this.morelist = this.morelist.slice(this.offset, this.offset + 10)
							// console.log("2",this.offset,this.offset+10)
							this.offset + 10 < res.data.hotSongs.length
								? (this.offset += 10)
								: console.log('无更多数据')
						})
						//数据迭代
						// this.morelist = this.morelist.slice(this.offset,this.offset + 10)
						// this.offset + 10 < res.data.hotSongs.length ? this.offset += 10 : console.log("无更多数据")
						//数据累加
						// this.morelist = res.data.hotSongs.slice(0,this.offset)
						// this.morelist.length < 50 ? this.offset += 10 : console.log("无更多数据")
					}
					if (this.$route.query.url === '/album/newest') {
						axios
							.get(this.$route.query.url)
							.then((res) => {
								this.morelist = res.data.albums
							})
							.catch((error) => {
								console.log(error)
							})
					}

					this.refreshing = false
				})
			},
			play(index) {
				let arr = []
				this.morelist.forEach((item) => {
					arr.push(item.id)
				})
				this.setSong({ currentIndex: index, songIdList: arr })
				this.showMusicplay()
			}
		}
	}
</script>

<style scoped>
	.wrapper {
		padding-top: 13px;
		text-align: center;
		margin-top: 10px;
		background: #fff;
		clear: both;
		overflow: hidden;
	}
	h3 {
		font-size: 22px;
		text-align: left;
		margin-left: 17px;
		margin-bottom: 5px;
	}
	.wrapper .info {
		width: 48%;
		float: left;
		padding-left: 17px;
		display: block;
		text-align: left;
		margin-bottom: 10px;
		position: relative;
	}
	.img {
		position: relative;
		width: 100%;
		height: 0;
		padding-top: 100%;
		margin-bottom: 5px;
	}
	img {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		border: 1px solid #eee;
		border-radius: 15px;
	}
	.name {
		font-size: 14px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		line-height: 14px;
		max-height: 28px;
		margin-top: 5px;
		margin-bottom: 2px;
	}
	.author {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: #999;
		font-size: 12px;
		line-height: 12px;
	}
</style>
