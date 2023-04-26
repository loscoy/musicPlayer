<template>
	<div class="index">
		<el-container v-show="!musicPlayShow">
			<el-header class="index-header">
				<CustomHeader></CustomHeader>
			</el-header>
			<div class="main">
				<router-view />
			</div>
			<div ref="customFooter" class="index-footer">
				<CustomFooter></CustomFooter>
			</div>
		</el-container>
		<mu-scale-transition>
			<musicplay class="musicPlay" v-show="musicPlayShow"></musicplay>
		</mu-scale-transition>
	</div>
</template>

<script>
import CustomHeader from '../components/index/header'
import CustomFooter from '../components/index/footer'
import musicplay from '../pages/musicPlay2'
import { mapState } from 'vuex'
export default {
	name: 'index',
	computed: {
		...mapState({
			musicPlayShow: state => state.musicPlayShow
		})
	},
	components: {
		CustomFooter,
		CustomHeader,
		musicplay
	},
	mounted () {
		document.addEventListener('scroll', this.onScroll)
	},
	methods: {
		onScroll () {
			const scrollTop = document.documentElement.scrollTop + document.body.scrollTop
			const footerDom = this.$refs.customFooter
			if (scrollTop >= 100) {
				if (!footerDom.getAttribute("class").includes("no-top")) {
					footerDom.className = 'index-footer not-top'
				}
			} else {
				footerDom.className = 'index-footer'
			}
		}
	}
}
</script>

<style scoped>
.index img {
	width: 30px;
	height: 30px;
	display: inline-block;
	vertical-align: middle;
}

.index ul {
	display: flex;
	align-items: center;
	height: 50px;
	line-height: 40px;
	list-style: none;
	width: 100%;
}

.index ul li {
	flex: 1;
	text-align: center;
}

.index ul li a {
	font-size: 16px;
	color: #999;
}

.index-header {
	padding: 0;
	position: fixed;
	overflow: hidden;
	width: 100%;
	left: 0;
	right: 0;
	top: 0;
	z-index: 10;
}

.index-footer {
	position: fixed;
	height: 50px;
	z-index: 11;
	width: 100%;
	bottom: 0;
	transition: all 0.7s;
	transform: translate3d(0, 0, 0);

}

.not-top {
	transform: translate3d(0, 100px, 0);
}

.musicPlay {
	position: absolute;
	z-index: 20;
	top: 0;
	background-color: white;
}
.index .main {
	padding: 10px;
	margin-top: 45px;
}
</style>
<style>

.footer .el-card__body {
	padding: 0;
}
</style>
