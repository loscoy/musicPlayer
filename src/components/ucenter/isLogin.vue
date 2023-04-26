<template>
	<div class="isLogin">
		<div class="user-list-info">
			<el-card class="top-card">
				<div class="tx">

					<mu-dialog title="我的资料" width="600" max-width="90%" style="border-radius:10px" :esc-press-close="false"
						:overlay-close="false" :open.sync="openAlert">
						<detail></detail>
						<mu-button slot="actions" round  @click="closeAlertDialog">关闭</mu-button>
					</mu-dialog>

					<div class="avatar" @click="userDetail">
						<el-image style="width: 50px; height: 50px" :src="userInfo.avatarUrl" fit="fill" alt="头像">
							<div slot="error" class="image-slot">
								<i class="el-icon-picture-outline"></i>
							</div>
						</el-image>
					</div>
				</div>
				<div class="info-card">
					<div class="info-name">
						<div class="nickName" @click="userDetail">
							{{userInfo.nickname}}
						</div>
						<div class="info-else">
							<div class="follows">{{userInfo.follows}} 关注</div>
							<el-divider direction="vertical"></el-divider>
							<div class="followeds">{{userInfo.followeds}} 粉丝</div>
							<el-divider direction="vertical"></el-divider>
							<div class="level" @click="levelDetail">Lv.{{userInfo.level}}</div>
						</div>
					</div>
				</div>
			</el-card>

			<el-card class="music-like" body-style="padding:10px">
				<div @click="getDetail(likePlaylist.id)">
					<div class="like-cover">
						<el-image style="width: 50px; height: 50px;border-radius: 10px" :src="likePlaylist.coverImgUrl" fit="fill"
							alt="cover">
							<div slot="error" class="image-slot">
								<i class="el-icon-picture-outline"></i>
							</div>
						</el-image>
					</div>
					<div class="like-describe">
						<div class="like-name" style="width: 100%">
							{{likePlaylist.name}}
						</div>
						<div class="like-info">
							<div>{{likePlaylist.trackCount}}首</div>
							<div class="counter">播放次数:{{likePlaylist.playCount}}</div>
						</div>
					</div>
				</div>
			</el-card>
		</div>
	</div>
</template>

<script>
	import { getMusicSheet, getUserInfo } from '../../Api/user'
	import { mapState } from 'vuex'
	import { getPlaylistDetail } from '../../Api/music'
	import router from '../../router'
	import detail from '../ucenter/userInfoDetail.vue'

	export default {
		name: 'isLogin',
		data() {
			return {
				userInfo: [],
				likePlaylist: {},
        openAlert:false
			}
		},
		components: {
			detail
		},
		computed: {
			...mapState({
				uid: state => state.user.id
			})
		},
		mounted() {
			if (this.uid) {
				// console.log(this.uid+','+this.token);
				this.getInfo()
			}
		},
		methods: {
			getInfo() {
				if (!this.uid) {
					return
				}
				getUserInfo(this.uid).then(res => {
					this.userInfo = {
						avatarUrl: res.data.profile.avatarUrl,
						nickname: res.data.profile.nickname,
						follows: res.data.profile.follows,
						followeds: res.data.profile.followeds,
						level: res.data.level
					}
				})
				getMusicSheet(this.uid).then(res => {
					this.likePlaylist = {
						name: res.data.playlist[0].name,
						trackCount: res.data.playlist[0].trackCount,
						playCount: res.data.playlist[0].playCount,
						coverImgUrl: res.data.playlist[0].coverImgUrl,
						id: res.data.playlist[0].id
					}
				})
			},
			getDetail(playlistId) {
				router.push({ path: '/Umlist', query: { id: playlistId } })
			},
			levelDetail() {
				router.push('/levelDetail')
			},
			userDetail() {
        this.openAlert = true
      },
      closeAlertDialog(){
        this.openAlert = false
      }
		}
	}
</script>

<style scoped>
	.user-list-info {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
	.avatar {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: 55px auto;
		border-radius: 50%;
		width: 50px;
		height: 50px;
		overflow: hidden;
	}
	.top-card {
		width: 100%;
		text-align: center;
		height: 90px;
		margin-top: 30px;
		border-radius: 10px;
	}
	.music-like {
		width: 100%;
		height: 70px;
		border-radius: 10px;
		margin-top: 10px;
	}

	.tx {
		text-align: center;
	}
	.nickName {
		position: relative;
		font-weight: bold;
	}
	.info-card {
		height: 55px;
		margin-top: 15px;
	}
	.info-name {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
	.nickName {
		width: 100%;
	}
	.info-else {
		display: flex;
		align-items: center;
		font-size: 10px;
		color: #999999;
		height: 25px;
	}

	.like-cover {
		width: 15%;
		float: left;
	}
	.like-describe {
		float: right;
		width: 80%;
		margin-top: 8px;
	}
	.like-info {
		color: #999;
		display: flex;
		font-size: 10px;
	}
	.like-name {
		font-size: 14px;
	}
	.counter {
		margin-left: 20px;
	}
</style>
