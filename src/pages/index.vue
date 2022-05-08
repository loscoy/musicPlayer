<template>
	<div class="index">
		<el-container v-show="!musicPlayShow">
			<el-header class="index-header">
				<Header></Header>
			</el-header>
			<el-main>
				<router-view />
			</el-main>
			<el-footer class="index-footer">
				<Footer></Footer>
			</el-footer>
		</el-container>
		<mu-scale-transition>
			<musicplay class="musicPlay" v-show="musicPlayShow"></musicplay>
		</mu-scale-transition>
	</div>
</template>

<script>
import Header from '../components/index/header'
import Footer from '../components/index/footer'
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
		Footer,
		Header,
		musicplay
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
	left: 0;
	right: 0;
	top: 0;
	z-index: 10;
}

.index-footer {
	height: 40px !important;
	overflow: hidden;
}
.musicPlay{
	position: absolute;
	z-index: 20;
	top: 0;
	background-color: white;
}
</style>
<style>
.index .el-main {
	padding: 10px;
	margin-top: 45px;
}

.footer .el-card__body {
	padding: 0;
}
</style>
