<template>
  <div>
    <music-list :url="url"></music-list>
  </div>
</template>

<script>

  import musicList from '@/components/musicList'

  export default {
    name: "singerList",
    data(){
      return{
        url:"/top/artists?offset=0&limit=30"
      }
    },
    components:{
      musicList
    }
  }
</script>

<style scoped>

</style>
