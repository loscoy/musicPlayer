<template>
  <div>
    <music-list :url="url"></music-list>
  </div>
</template>

<script>

  import musicList from '@/components/musicList'

  export default {
    name: "newMusic",
    data(){
      return{
        url:"/album/newest"
      }
    },
    components:{
      musicList
    }
  }
</script>

<style scoped>

</style>
