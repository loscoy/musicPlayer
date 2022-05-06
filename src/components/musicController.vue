<template>
	<div class="musicController">
		<div class="slider" style="width: 90%">
			<mu-slider class="demo-slider" color="secondary" @change="moveSlider" v-model="schedule"></mu-slider>
		</div>
		<div class="controller">
			<div class="buttons">
				<div class="model">
					<i class="icon icon-repeat" v-if="playModel===0" @click="changeModel"></i>
					<i class="icon icon-shuffle" v-if="playModel===1" @click="changeModel"></i>
				</div>
				<div class="button">
					<div class="left"><i class="icon icon-skip-back" @click="preTrack"></i> </div>
					<div class="center">
						<i class="icon icon-play-circle" v-show="show" @click="play"></i>
						<i class="icon icon-pause-circle" v-show="!show" @click="pause"></i>
					</div>
					<div class="right"><i class="icon icon-skip-forward" @click="nextTrack"></i> </div>
				</div>
				<div class="list" @click="showList"><i class="icon icon-list"></i> </div>
				<mu-bottom-sheet :open.sync="open">
					<mu-sub-header>播放列表
						<div class="close" @click="open = false">
							<i class="icon icon-x"></i>
						</div>
					</mu-sub-header>
					<ul>
						<div class="list">
							<li ref="playList" v-for="(item,index) in songList" :key="index">
								<div class="icon-left" v-if="index === currentIndex">
									<i class="icon icon-bar-chart-2"></i>
								</div>
								<div class="content-center" @click="playItem(index)" :style="{'color':highLight(index)}">
									{{item}}
								</div>
								<div class="icon-right">
									<i class="icon icon-trash"></i>
								</div>
							</li>
						</div>
					</ul>
				</mu-bottom-sheet>
			</div>
		</div>
	</div>
</template>

<script>
	import { getDetailInfo } from '../Api/music'

	export default {
		name: 'musicController',
		data() {
			return {
				show: true,
				schedule: 0,
				open: false,
				songList: [],
				shuffleSongIdList: []
			}
		},
		props: {
			durationTime: 0,
			currentTime: 0,
			songIdList: []
		},
		watch: {
			songIdList(val) {
				this.getSongList()
			},
			currentTime(val, oval) {
				if (val) {
					this.schedule = Math.round((parseInt(val) / parseInt(this.durationTime)) * 100)
				}
			}
		},
		computed: {
			currentIndex() {
				return this.$store.state.song.currentIndex
			},
			idList() {
				return this.songIdList
			},
			playModel() {
				return this.$store.state.playModel
			},
			
		},
		mounted() {
			if (this.songIdList) {
				// console.log(this.songIdList);
				this.getSongList()
			}
		},
		methods: {
			play() {
				this.$emit('play')
				this.show = false
			},
			pause() {
				this.$emit('pause')
				this.show = true
			},
			moveSlider(val) {
				this.pause()
				let result = (val / 100) * this.durationTime
				this.$emit('moveSlider', result)
				this.play()
			},
			preTrack() {
				this.$emit('preTrack')
			},
			nextTrack() {
				this.$emit('nextTrack')
			},
			showList() {
				this.open = true
				setTimeout(() => {
					let playList = this.$refs.playList
					playList[this.currentIndex].scrollIntoView({ behavior: 'smooth' })
				}, 500)
			},
			getSongList() {
				let songsArr = []
				let art = ''
				let artArr = []
				this.songList = []
				getDetailInfo(...this.songIdList).then((res) => {
					songsArr = res.data.songs
					songsArr.forEach((item) => {
						artArr = item.ar
						artArr.forEach((elem, index) => {
							if (index < artArr.length - 1) {
								art = art + elem.name + ' / '
							} else {
								art = art + elem.name
							}
						})
						this.songList.push(item.name + ' - ' + art)
						art = ''
					})
				})
			},
			highLight(index) {
				if (index === this.currentIndex) {
					return 'red'
				} else {
					return ''
				}
			},
			playItem(index) {
				this.pause()
				this.$store.dispatch('setSong', {
					currentIndex: index,
					songIdList: this.idList
				})
				this.$emit('musicInit')
				setTimeout(() => {
					this.play()
				}, 1000)
			},
			changeModel() {
				this.$store.dispatch('changePlayModel')
			}
		}
	}
</script>

<style scoped>
	.musicController {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 70px;
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
	.controller {
		display: flex;
		width: 100%;
		padding-left: 20px;
		padding-right: 20px;
	}
	.mu-secondary-text-color {
		margin: 0;
	}
	.buttons {
		width: 100%;
		font-size: 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.button {
		font-size: 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.button .center {
		display: flex;
		font-size: 40px;
		padding-left: 20px;
		padding-right: 20px;
	}
	.list {
		overflow: auto;
	}
	ul {
		height: 400px;
	}
	li {
		padding: 5px 15px 5px 15px;
		line-height: 30px;
		display: flex;
		justify-content: space-between;
	}
	.content-center {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		width: 80%;
	}
	.close {
		display: inline;
		float: right;
		margin-right: 10px;
		font-size: 20px;
	}
</style>
