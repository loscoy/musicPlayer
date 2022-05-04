<template>
	<div class="search">
		<el-autocomplete v-show="!searchListShow" ref="autocomplete" prefix-icon="el-icon-search" class="searchInput"
			v-model="searchName" :trigger-on-focus="true" :fetch-suggestions="queryS" @select="goToSelected" :debounce=10
			:placeholder="searchDefault" @keypress.enter.native="submitSearch(searchName,offset)">
			<el-button slot="append" @click="submitSearch(searchName,offset)" icon="el-icon-search"></el-button>
		</el-autocomplete>
		<div class="container">
			<div class="hot">
				<hotSearch v-show="!searchListShow"></hotSearch>
				<searchList @back="searchListShow=false" @changePage="setOffset" v-show="searchListShow" ref="searchList"
					:searchName="searchName" :searchList="newSearchList">
				</searchList>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	import { getSearchDefault, getSearchList, getDetailInfo } from '../Api/music.js'
	import hotSearch from '../components/hotSearch'
	import searchList from '../components/searchList'

	export default {
		name: 'search',
		data() {
			return {
				searchName: '',
				searchList: [],
				newSearchList: [],
				searchDefault: '',
				newSearchDefault: '',
				musicInfo: [],
				searchListShow: false,
				searchResult: [],
				offset: 0
			}
		},
		components: {
			hotSearch,
			searchList
		},
		mounted() {
			getSearchDefault().then(res => {
				this.searchDefault = res.data.data.showKeyword
				this.hendleDefault()
			})
		},

		watch: {},

		methods: {
			...mapActions(['showMusicplay', 'setSong']),
			queryS(queryString, cb) {
				if (queryString) {
					setTimeout(() => {
						getSearchList(queryString, 30, 0).then(res => {
							this.searchList = res.data.result.songs
							cb(this.getSearchList())
						})
					}, 1000)
				}
			},
			getSearchList() {
				let arr = new Array(0)
				this.searchList.forEach((item, index) => {
					if (item.ar.length > 1) {
						// console.log(item);
						let l = item.ar.length
						let s = ''
						arr.push({
							id: item.id,
							value: '',
							artist: ''
						})
						//拼接歌名和歌手
						for (let i = 0; i < l; i++) {
							if (i + 1 < l) {
								s = s.concat(item.ar[i].name + ' / ')
							} else {
								s = s.concat(item.ar[i].name)
							}
						}
						arr[index]['value'] = item.name + ' - ' + s
						arr[index]['artist'] = s
					} else {
						arr.push({
							id: item.id,
							value: item.name + ' - ' + item.ar[0].name,
							artist: item.ar[0].name
						})
					}
				})
				this.searchResult = arr
				return arr
			},
			goToSelected(item) {
				let arr = []
				let currentIndex = 0
				this.searchResult.forEach((element, index) => {
					arr.push(element.id)
					if (item.id === element.id) {
						currentIndex = index
					}
				})
				this.setSong({ currentIndex: currentIndex, songIdList: arr })
				this.showMusicplay()
			},
			submitSearch(searchName, offset) {
				this.searchName = searchName
				this.searchListShow = true
				this.$refs.autocomplete.suggestions = [] //收起搜索建议
				// 不输入则使用默认关键词
				if (searchName === '' || searchName === null) {
					searchName = this.newSearchDefault
				}
				getSearchList(searchName, 50, offset).then(res => {
					let searchList = res.data.result.songs
					// console.log(searchList);
					this.newSearchList = []
					searchList.forEach((item, index) => {
						//多个歌手处理方式
						if (item.ar.length > 1) {
							// console.log(item);
							let l = item.ar.length
							let s = ''
							this.newSearchList.push({
								id: item.id,
								name: item.name,
								artist: ''
							})
							for (let i = 0; i < l; i++) {
								if (i + 1 < l) {
									s = s.concat(item.ar[i].name + ' / ')
								} else {
									s = s.concat(item.ar[i].name)
								}
							}
							this.newSearchList[index]['artist'] = s
						} else if (item.ar.length === 1) {
							this.newSearchList.push({
								id: item.id,
								name: item.name,
								artist: item.ar[0].name
							})
						}
					})
				})
			},
			hendleDefault() {
				this.newSearchDefault = this.searchDefault.split(' - ')[0]
			},
			setOffset(val) {
				this.offset = val - 1
				if (this.searchName) {
					this.submitSearch(this.searchName, val)
				} else {
					this.submitSearch(this.newSearchDefault, val)
				}
			}
		}
	}
</script>

<style scoped>
	.search {
		width: 100%;
		/* position: relative; */
		text-align: center;
	}
	.searchInput {
		width: 95%;
		margin: 10px 10px 0 10px;
		text-align: center;
	}
	.hot {
		width: 100%;
		margin: 20px 0;
		text-align: center;
	}
</style>
