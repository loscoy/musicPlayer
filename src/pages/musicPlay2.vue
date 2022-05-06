<template>
	<div class="play">
		<div class="header">
			<div class="title">
				<div style="font-size: 30px">
					<i class="icon icon-chevron-down" @click="hide"></i>
					<!--          <i  ></i>-->
				</div>
				<div class="music-info">
					<p>{{ musicInfo.name }}</p>
					<p class="author">{{ artistName }}</p>
				</div>
				<router-link to="/search">
					<i class="iconfont icon-sousuo right"></i>
				</router-link>
			</div>
		</div>

		<div class="song-info">
			<div class="song-info-img">
				<img :src="musicInfo.picUrl" alt="musicName">
				<div class="song-lrc">
					<!--          <LRC2 :currentLyric="currentLyric" :currentLyricNum="currentLyricNum" :lrcId="parseInt(musicId)"></LRC2>-->
					<ul ref="ul" class="content">
						<li :id="index" v-for="(item, index) in currentLyric.lines" @click="playThis(index)" :key="index">
							{{ item.txt }}</li>
					</ul>
					<div class="no-lyric" v-if="lrcLength === 0">暂无歌词,请搜索重试</div>
				</div>

			</div>

			<div class="iconbox">
				<i class="icon icon-heart"></i>
				<i class="box"></i>
				<i class="icon icon-more-vertical"></i>
			</div>
		</div>
		<div class="song">
			<music-controller ref="ctl" @moveSlider="moveSlider" @play="play" @pause="pause" @nextTrack="nextTrack"
				@preTrack="preTrack" @musicInit="musicInit" :currentTime="currentTime" :durationTime="durationTime"
				:songIdList="songIdList"></music-controller>
			<audio class="audio" id="player" v-show="false" @canplay="canplay" @timeupdate="updateTime" ref="player"
				:src="musicUrl" controls></audio>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import Lyric from 'lyric-parser'
import { getDetailInfo, getLyric, getMusicUrl, getSQUrl } from '../Api/music'
import musicController from '../components/musicController'
import { mapActions, mapState } from 'vuex'

const LRC2 = Vue.component('lrc', (resolve) => require(['../components/LRC2'], resolve))

export default {
	name: 'musicPlay',
	data () {
		return {
			musicUrl: '',
			currentLyric: {},
			lyric: '',
			currentLyricNum: 0,
			musicInfo: [],
			artistName: '',
			lineNo: 0,
			Cpos: 3,
			offset: -32,
			lrcLength: 0,
			currentTime: 0,
			durationTime: 0,
			can: false
		}
	},
	components: {
		LRC2,
		musicController
	},
	computed: {
		...mapState({
			currentIndex: (state) => state.song.currentIndex,
			songIdList: (state) => state.song.songIdList,
			musicPlayShow: (state) => state.musicPlayShow
		}),
		musicId () {
			return this.songIdList[this.currentIndex]
		}
	},
	watch: {
		currentIndex (val, oval) {
			this.musicInit()
		},
		songIdList (val) {
			return val
		}
	},
	created () {
		if (this.musicId) {
			this.musicInit()
		}
	},
	mounted () {
		this.listenPlayer()
	},
	methods: {
		...mapActions(['addIndex', 'subIndex', 'hideMusicplay']),
		musicInit () {
			this.can = false
			this.getLyric(this.musicId)
			getSQUrl(this.musicId).then((res) => {
				if (res.data.data.code === 200) {
					//如果存在则使用高品质播放链接
					this.musicUrl = res.data.data.url
				} else {
					//否则使用试听链接
					getMusicUrl(this.musicId).then((res) => {
						this.musicUrl = res.data.data[0].url
					})
				}
				this.goback()
			})
			getDetailInfo(this.musicId).then((res) => {
				this.musicInfo = {
					name: res.data.songs[0].name,
					picUrl: res.data.songs[0].al.picUrl
				}
				this.handleArtist(res.data.songs[0])
			})
		},
		listenPlayer () {
			const music = this.$refs.player
			music.addEventListener('timeupdate', () => {
				if (this.lineNo === this.lrcLength) return //当前行数与歌词数组长度相同时结束
				const curTime = music.currentTime //播放器时间

				if (this.currentLyric.lines[this.lineNo].time <= curTime * 1000) {
					this.lineHigh(this.lineNo) //歌词中的时间小于当前播放时间，高亮当前行
					this.lineNo += 1
				}
			})
			music.addEventListener('ended', () => {
				this.goback() //回滚歌词
				this.nextTrack() //下一曲
			})
		},
		// 获取并处理歌词
		async getLyric (id) {
			try {
				let res = await getLyric(id)
				this.lyric = res.data.lrc.lyric
				this.currentLyric = new Lyric(this.lyric, this.lyricHandle)
				this.lrcLength = this.currentLyric.lines.length
			} catch (error) {
				console.log(error)
			}
		},

		lyricHandle ({ lineNum, txt }) { },
		handleArtist (musicInfo) {
			let l = musicInfo.ar.length
			let s = ''
			if (l > 1) {
				for (let i = 0; i < l; i++) {
					if (i + 1 < l) {
						s = s.concat(musicInfo.ar[i].name + ' / ')
					} else {
						s = s.concat(musicInfo.ar[i].name)
					}
				}
				this.artistName = s
			} else {
				this.artistName = musicInfo.ar[0].name
			}
		},
		//点击歌词播放
		playThis (index) {
			//获取DOM
			const music = this.$refs.player
			const ulist = this.$refs.ul
			const list = ulist.getElementsByTagName('li')

			// 删除之前的高亮样式并设置当前点击部分高亮样式
			list[this.lineNo - 1].removeAttribute('class')
			this.lineNo = index //当前歌词行数为所点歌词行数
			list[this.lineNo].className = 'lineHigh' //高亮显示当前行

			// 将所点歌词时间赋给播放时间
			music.currentTime = this.currentLyric.lines[this.lineNo].time / 1000
		},

		// 歌词高亮与滚动
		lineHigh (lineNo) {
			const ulist = this.$refs.ul
			const list = ulist.getElementsByTagName('li')
			const pre = document.getElementsByClassName('lineHigh')
			if (lineNo > 0) {
				list[lineNo - 1].removeAttribute('class') //去掉上一行的高亮样式
			}
			list[lineNo].className = 'lineHigh' //高亮显示当前行
			//滚动至指定元素
			const element = document.getElementById(lineNo)
			element.scrollIntoView({ behavior: 'smooth', block: 'center' }) // 当前播放的歌词滚动至中间
		},
		// 歌词重置
		goback () {
			const ulist = this.$refs.ul
			const items = ulist.querySelectorAll('.lineHigh')
			items.forEach((element) => {
				element.removeAttribute('class')
			})
			this.lineNo = 0 //lineNo清零，重新播放
		},
		updateTime (e) {
			this.currentTime = e.target.currentTime //获取audio当前播放时间
		},
		canplay (e) {
			this.durationTime = e.target.duration //歌曲可播放时获取总时间
			this.can = true
			if (this.musicPlayShow) {
				this.$refs.ctl.play()
			}
		},
		hide () {
			this.hideMusicplay()
		},
		play () {
			this.$refs.player.play()
		},
		pause () {
			this.$refs.player.pause()
		},
		//行数处理
		currentNo (time) {
			let length = 0
			this.lineNo = 0
			length = this.currentLyric.lines.length
			for (let i = 0; i < length; i++) {
				if (this.currentLyric.lines[i].time / 1000 >= time) {
					this.lineNo = i - 1
					break
				} else if (i === length - 1) {
					this.lineNo = length - 1
					break
				}
			}
		},
		//移动进度条
		moveSlider (val) {
			this.$refs.player.currentTime = val //将子组件传来的时间赋给播放器时间
			this.currentNo(val) //获取应该跳转的行数
			const ulist = this.$refs.ul
			ulist.querySelector('.lineHigh').removeAttribute('class') //移除之前的高亮
			this.lineHigh(this.lineNo)
		},
		//下一首
		nextTrack () {
			this.addIndex()
			this.$refs.ctl.pause()
			if (this.can) {
				this.$refs.ctl.play()
			}
		},
		//上一首
		preTrack () {
			this.subIndex()
			this.$refs.ctl.pause()
			if (this.can) {
				this.$refs.ctl.play()
			}
		}
	}
}
</script>

<style scoped>
.play {
	/*position: relative;*/
	text-align: center;
}

.header {
	padding: 15px;
}

.music-info {
	flex: 1;
	font-size: 20px;
}

.title {
	display: flex;
	text-align: center;
}

.left {
	font-size: 30px;
}

.ca {
	color: red;
}

.right {
	font-size: 30px;
}

.song-info {
	padding: 15px;
}

.song-info-img {
	text-align: center;
}

.song-info-img img {
	width: 50%;
	border-radius: 15%;
}

.song-lrc {
	margin-top: 30px;
	min-height: 50px;
	overflow: scroll;
	position: absolute;
	right: 0;
	left: 0;
	height: 230px;
}

ul {
	line-height: 32px;
	width: 100%;
	padding-bottom: 1rem;
}

li {
	font-size: 16px;
	transition-duration: 500ms;
}

.iconbox {
	display: flex;
	margin: 15px 0 15px;
	position: absolute;
	bottom: 70px;
	width: 90%;
	font-size: 20px;
}

.iconbox .box {
	flex: 1;
	height: 70%;
}

.song {
	text-align: center;
	width: 100%;
	position: absolute;
	bottom: 0;
}

.song audio {
	width: 100%;
}

.author {
	color: #999;
	font-size: 12px;
}

.lineHigh {
	color: #ff0000;
	font-size: 20px;
}

div::-webkit-scrollbar {
	display: none;
}

/*.no-lyric {*/
/*  color: #222222;*/
/*  text-align: center;*/
/*}*/
</style>
