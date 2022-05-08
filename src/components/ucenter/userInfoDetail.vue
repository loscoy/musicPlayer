<template>
	<div class="userInfoDetail">
		<div class="Info">
			<ul>
				<li v-for="(item, key) in currentInfo"  v-show="!isEdit" :key="key">
					<div class="info-list">
						<div class="avatar" v-if="key === 'avatarUrl'">
							<div>{{ item.title }}</div>
							<mu-avatar>
								<img :src="item.value">
							</mu-avatar>
						</div>
						<div v-else>
							<mu-text-field full-width disabled v-model="item.edit" :prefix="item.title"
								:suffix="item.value">
							</mu-text-field>
						</div>
					</div>
				</li>
				<mu-button color="red" flat @click="isEdit===!isEdit">修改</mu-button>
			</ul>
		</div>
	</div>
</template>

<script>
import { updateUserInfo, getCurrentUserInfo } from '../../Api/user'
import musicList from '../musicList.vue'

export default {
	components: { musicList },
	name: 'userInfoDetail',
	data () {
		return {
			currentInfo: {},
			isEdit: false
		}
	},
	mounted () {
		this.getNowInfo()
	},
	methods: {
		submitUpdate () {
			updateUserInfo()
		},

		getNowInfo () {
			getCurrentUserInfo().then(res => {
				this.currentInfo = {
					avatarUrl: { title: '头像', value: res.data.profile.avatarUrl, edit: '' },
					nickname: { title: '昵称', value: res.data.profile.nickname, edit: '' },
					gender: { title: '性别', value: this.handleGender(res.data.profile.gender), edit: '' },
					birthday: { title: '生日', value: this.handleBirthday(res.data.profile.birthday), edit: '' },
					province: { title: '省份', value: res.data.profile.province.toString(), edit: '' },
					city: { title: '城市', value: res.data.profile.city.toString(), edit: '' },
					signature: { title: '简介', value: res.data.profile.signature, edit: '' }
				}
			})
		},
		handleGender (gender) {
			if (gender === 1) {
				return '男'
			} else if (gender === 2) {
				return '女'
			} else {
				return ''
			}
		},
		handleBirthday (birthday) {
			let time = new Date(birthday)
			return time.toLocaleDateString().replace(/\//g, "-") + " " + time.toTimeString().substr(0, 8)
		},
		birthdayToNumber (birthday) {
			return new Date(birthday).getTime()
		}
	}
}
</script>

<style scoped>
.info-list {
	padding: 5px;
}

.avatar {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.mu-input {
	margin-bottom: 0;
}
</style>