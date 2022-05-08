<template>
  <div class="comment">
    <div class="container">
      <ul>
        <li ref="li" v-for="(item, index) in commentInfo.comments" :key="'new' + index">
          <div class="userInfo">
            <div class="avatar">
              <img :src="item.user.avatarUrl" alt="tx">
            </div>
            <div class="txt">
              <div class="nickName">{{ item.user.nickname }}</div>
              <div class="time">{{ item.timeStr }}</div>
            </div>
            <div class="praise">
              {{ item.likedCount }}
              <i class="icon icon-thumbs-up"></i>
            </div>
          </div>
          <div class="content">{{ item.content }}</div>
          <mu-divider></mu-divider>
        </li>
      </ul>
    </div>
    <mu-pagination :total="parseInt(commentInfo.totalCount)" :page-size="100" @change="changePageNo" :current.sync="pageNo">
    </mu-pagination>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getcomment } from '../../Api/music'
export default {
  name: "comment",
  data () {
    return {
      pageSize: 100,
      pageNo: 1,
      type: 0,
      sortType: 2,
      commentInfo: []
    }
  },
  computed: {
    ...mapState({
      songIdList: (state) => state.song.songIdList,
      currentIndex: (state) => state.song.currentIndex
    }),
    musicId () {
      return this.songIdList[this.currentIndex]
    }
  },
  watch: {
    pageNo (val) {
      this.getcomment()
    }
  },
  mounted () {
    this.getcomment()
  },
  methods: {
    getcomment () {
      let params = {
        pageSize: this.pageSize,
        pageNo: this.pageNo,
        type: this.type,
        id: this.musicId,
        sortType: this.sortType,
      }
      getcomment(params).then(res => {
        this.commentInfo = res.data.data
      })
    },
    changePageNo (val) {
      this.pageNo = val
      const liArr = this.$refs.li
      liArr[0].scrollIntoView()
    }
  }
}
</script>

<style scoped>
.container {
  height: 550px;
  overflow: auto;
  margin-bottom: 10px;
}

.userInfo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0 10px;
  font-size: 14px;
  color: black;
}

.txt {
  width: 65%;
}

.time {
  color: darkgrey;
  font-size: 12px;
}

.praise {
  color: darkgrey;
  font-size: 13px;
}

.avatar {
  width: 10vw;
  height: auto;
  border-radius: 50%;
  overflow: hidden;
}

.mu-divider {
  margin-left: 15vw;
}

.content {
  margin-left: 15vw;
  margin-bottom: 10px;
  font-size: 13px;
}
.comment .mu-pagination{
  width: 100%;
  margin: auto;
  font-size: 12px;
}
</style>