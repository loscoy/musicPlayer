<template>
  <div class="setting">
    <mu-paper>
      <mu-row>
        <mu-list>
          <mu-list-item button>
            <mu-list-item-title>收到赞</mu-list-item-title>
            <mu-list-item-action>
              <mu-switch v-model="settingInfo.allowLikedNotify"></mu-switch>
            </mu-list-item-action>
          </mu-list-item>
        </mu-list>
      </mu-row>
    </mu-paper>
  </div>
</template>

<script>
  import { getSetting } from "../../../Api/user";

  export default {
    name: "setting",
    data () {
      return {
        settingInfo: [],
      };
    },
    props: {
      openSetting:false
    },
    watch: {
    },
    mounted () {
      if(this.openSetting === true){
        getSetting().then(res => {
          this.settingInfo = res.data.setting
        });
      }
    },
    methods:{

    }
  };
</script>

<style scoped>

</style>
