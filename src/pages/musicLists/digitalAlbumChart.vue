<template>
  <div>
    <music-list :url="url"></music-list>
  </div>
</template>

<script>

  import musicList from '@/components/musicList'

  export default {
    name: "digitalAlbumChart",
    data(){
      return{
        url:"/album/list?limit=6"
      }
    },
    components:{
      musicList
    }
  }
</script>

<style scoped>

</style>
