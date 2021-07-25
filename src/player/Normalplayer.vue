<!-- 正常小播放器 -->
<template>
  <div class="normal-player">
    <!-- 背景 -->
    <div class="background">
      <img :src="currentSong.al.picUrl" width="100%" height="100%" alt="" />
    </div>
    <!-- 蒙层 -->
    <div class="background layer"></div>
    <!-- 头部歌曲信息 -->
    <div class="top">
      <div class="back" @click="leaveFullScreenAction">
        <i class="iconfont iconfanhui"></i>
      </div>
      <h1 class="title">{{ currentSong.name }}</h1>
      <h2 class="subtitle">{{ currentSong.ar }}</h2>
    </div>
    <!-- 中间的唱片 -->
    <div class="middle">
      <div class="CD-wrapper">
        <img :class="{ pause: !playing }" :src="currentSong.al.picUrl" alt="" />
      </div>
    </div>
    <!-- 底部操作按键 -->
    <div class="bottom">
      <!-- <BarProfress v-model="progress" :currentTime="currentTime" :duration="duration"/> -->
      <BarProfress @touchend="handleTouchAction('end')" @touchstart="handleTouchAction('start')" :value="progress" @input="changeProgressAction" :currentTime="currentTime" :duration="duration"/>
      <div class="operators">
        <div class="icon i-left" @click="changePlayModeAction">
          <i class="iconfont" :class="playModeIcon"></i>
        </div>
        <div class="icon i-left" @click="prevAction">
          <i class="iconfont iconshangyishou"></i>
        </div>
        <div class="icon i-center" @click="playChangeAction">
          <i class="iconfont" :class="{'iconzanting1':!playing,'iconbofang1':playing}"></i>
        </div>
        <div class="icon i-right" @click="nextAction">
          <i class="iconfont iconxiayishou"></i>
        </div>
        <div class="icon i-right">
          <i class="iconfont iconbofangliebiao"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BarProfress from './children/BarProgress'
import { mapState,mapGetters } from 'vuex'
export default {
  components:{
    BarProfress
  },
  data() {
    return {
      // play: false,
      // progress:0.2,
      // currentSong: {
      //   id: 36496695,
      //   name: "Love Yourself",
      //   ar: "Justin Bieber",
      //   al: {
      //     name: "Purpose",
      //     picUrl:
      //       "https://p2.music.126.net/SmaGv_bQTYy5_uOmnAz4Mw==/3285340746015046.jpg",
      //   },
      // },
    };
  },
  props: {
    //接收外部属性
    duration:Number,
    currentTime:Number,
    progress:Number
  },
  computed:{
      //把仓库的state转为组件的计算属性
    ...mapState({
      playing:state=>state.Player.playing,
      mode:state=>state.Player.mode
    }),
      //把仓库的getters转为组件的计算属性
    ...mapGetters({
      currentSong:'Player/currentSong'
    }),
    //当前播放模式图标
    playModeIcon(){
      switch (this.mode){
        case 0://顺序循环
          return 'iconBAI-xunhuan';
           case 1://单曲播放
          return 'icondanquxunhuan ';
           case 2://随机播放
          return 'iconsuijibofang';
      }
    }
  },
  // watch:{
  //   mode(newValue){
  //      //判断播放模式如果由其他模式变为随机播放 那么我们要找到当前歌曲所在歌单下标
  //     if(newValue===2){
  //       //根据当前歌曲id找到下标
  //     }
  //   }
  // },
  methods:{
    //退出全屏播放
    leaveFullScreenAction(){
      this.$store.commit({
                type:'Player/setFullScreen',
                value:false
            })
    },
    //进度条组件：修改进度条事件
    changeProgressAction(newVal){
      //将进度传值给父组件index
      this.$emit('change',newVal)
    },
    //将进度条的触摸的拖拽状态传递给外部
    handleTouchAction(flag){
      this.$emit('touchChange',flag)
    },
    //播放暂停事件
    playChangeAction(){
      this.$store.commit({
        type:'Player/setPlaying',
        value:!this.playing
      })
    },
    //切换播放模式事件
    changePlayModeAction(){
      //修改播放模式
      this.$store.commit({
        type:'Player/changePlayMode'
      })
    },
    //上一曲 点击事件
    prevAction(){
      //播放模式为顺序播放：播放上一首
      //播放模式为单曲播放：播放歌单上一首
      //播放模式为随机播放：随机歌曲列表的上一首
    },
    //下一曲
    nextAction(){
      //播放模式为顺序播放：播放下一首
      //播放模式为单曲播放：播放歌单下一首
      //播放模式为随机播放：随机歌曲列表的下一首
    }
  }
};
</script>

<style scoped lang="scss">
.normal-player {
  /* 固定定位 */
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
  background-color: #eee;
}
.background {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.6;
  filter: blur(20px);
  &.layer {
    background-color: #aaa;
    opacity: 0.3;
    filter: none;
  }
}
.top {
  position: relative;
  margin-bottom: 25px;
  .back {
    position: absolute;
    left: 6px;
    top: 0;
    .iconfont {
      display: block;
      padding: 9px;
      font-size: 24px;
      color: #333;
      font-weight: bold;
      transform: rotate(-90deg);
    }
  }
  .title {
    width: 70%;
    margin: 0 auto;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    color: #333;
  }
  .subtitle {
    line-height: 20px;
    text-align: center;
    font-size: 12px;
    color: #666;
  }
}
.middle {
  position: absolute;
  margin: auto;
  top: 20%;
  left: 0;
  right: 0;
  width: 70%;
  height: 70vw;
  box-sizing: border-box;
  .CD-wrapper {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      border-radius: 50%;
      border: 35px solid #000;
      animation: rotate 20s linear infinite;
      &.pause {
        animation-play-state: paused;
      }
    }
  }
}
.bottom {
  position: absolute;
  left: 0;
  bottom: 50px;
  width: 100%;
  .operators {
    display: flex;
    align-items: center;
    .icon {
      // font-weight: bold;
      flex: 1;
      color: #2e3030;
      text-align: center;
      .iconfont{
        font-size: 30px;
      }
    }
  }
}
</style>