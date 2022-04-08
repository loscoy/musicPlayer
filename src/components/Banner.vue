<template>

  <swiper class="banner" :options="swiperOption" v-if="banner.length" ref="mySwiper">
    <!--    v-if控制循环-->
    <swiper-slide v-for="(item, index) in banner" :key="index">
        <img :src="item.imageUrl" alt="item.encodeId"/>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>

</template>
<script>

  // npm install vue-awesome-swiper@3 --save-dev  不指定版本可能报错
  import { swiper, swiperSlide } from "vue-awesome-swiper";
  import "swiper/css/swiper.css"; //注意路径

  import axios from '../plugins/axios.js'

  export default {
    name: "banner",
    components:{
      swiper,
      swiperSlide,
    },
    data(){
      return {
        banner:[],
        swiperOption: {
          autoplay: {
            disableOnInteraction: false,  // 用户操作swiper之后，是否禁止autoplay
            delay: 3000, // 自动切换的时间间隔（单位ms）
          },
          loop: true,
          speed: 1000,
          pagination: {
            el: ".swiper-pagination", //分页器
            clickable: true,
          }
        },
      }
    },
    mounted(){
      const url = "/banner";
      axios.get(url).then(res=>{
        // console.log(res.data.banners)
        this.banner = res.data.banners
      }).catch(error =>{
        console.log(error)
      })
    },



  }
</script>

<style scoped>

  .banner{
    padding: 10px;
  }

</style>
