<!-- 底部小播放器 -->
<template>
  <div class="mini-player" @click="enterFullScreenAction">
      <!-- 专辑图片 -->
      <div class="icon">
          <div class="img-wrapper">
          <img :class="{pause:!playing}"  :src="currentSong.al.picUrl" alt="">
      </div>
      </div>
      <!-- 歌曲信息 -->
      <div class="text">
          <h2 class="name">{{currentSong.name}}</h2>
          <p class="desc">{{currentSong.ar}}</p>
      </div>
       <!-- 歌曲图标 -->
      <div class="control circle" @click.stop="">
         <!-- <CircleProgress v-model="play" :progress="progress"/> -->
          <CircleProgress :value="playing" @input="changePlayingAction" :progress="progress"/>
      </div>
      <!-- 播放图标 -->
      <div class="control" @click.stop="">
          <i class="iconfont iconbofangliebiao"></i>
      </div>
  </div>
</template>

<script>
import { mapState,mapGetters } from 'vuex'
import CircleProgress from './children/CircleProgress'
export default {
    components:{
        CircleProgress
    },
    props:{
        //接收外部属性
        progress:Number,
    },
    data () {
        return {
            // play:false,
            // progress:0.2,
            // currentSong:{
            //     id:36496695,
            //     name:"Love Yourself",
            //     ar:"Justin Bieber",
            //     al:{
            //         name:"Purpose",
            //         picUrl:"https://p2.music.126.net/SmaGv_bQTYy5_uOmnAz4Mw==/3285340746015046.jpg"
            //     }
            // }
        }
    },
    computed:{
        //把仓库的state转为组件的计算属性
        ...mapState({
            playing:(state)=>state.Player.playing
        }),
        //把仓库的getters转为组件的计算属性
        ...mapGetters({
            currentSong:'Player/currentSong'
        })
    },
    methods:{
        changePlayingAction(value){
            console.log('切换',value)
            //让仓库修改playing的值
            this.$store.commit({
                type:'Player/setPlaying',
                value
            })
        },
        //进入全屏播放器
        enterFullScreenAction(){
            console.log('enter....'),
            this.$store.commit({
                type:'Player/setFullScreen',
                value:true
            })
        }
    }
}
</script>

<style scoped lang="scss">
.mini-player{
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 1000;
    width: 100%;
    height: 60px;
    background-color:#fff;
    display: flex;
    align-items: center;
}
.icon{
    flex: 0 0 40px;
    width: 40px;
    height: 40px;
    padding: 0 10px 0 20px;
}
   .img-wrapper{
        width: 100%;
        height: 100%;
    }
.img-wrapper img{
            border-radius: 50%;
            width: 100%;
            height: 100%;
            animation:rotate 10s linear infinite; 
             &.pause{
                animation-play-state: paused;
            }  
        }
        .text{
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            line-height: 20px;
            overflow: hidden;
            .name{
                margin-bottom: 2px;
                font-size: 14px;
                color: #333;
                font-weight: bold;
            }
            .desc{
                font-size: 12px;
                color: #999;
            }
        }
        .control{
            flex: 0 0 30px;
            padding: 0 10px;
            color: #d44439;
            .iconfont{
            font-size: 32px;
        }
        .iconzanting, .iconbofang{
            font-size: 18px;
            }    
        }
</style>
