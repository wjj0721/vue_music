<!-- 播放器的整体结构 -->
<template>
  <div class="player-wrap">
      <MinPlayer v-if="!fullScreen" :progress="progress"/>
      <NormalPlayer v-else @touchChange="handleTouchAction" :progress="progress" @change="handleProgressChangAction" :currentTime="currentTime" :duration="duration"/>
      <!-- 音频播放器只有一个就行了 -->
      <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${id}.mp3`"/>
  </div>
</template>

<script>
import NormalPlayer from "./Normalplayer"
import MinPlayer from './Minplayer'
import { mapGetters ,mapState} from "vuex";
export default {
    components:{
        NormalPlayer,
        MinPlayer
    },
    data(){
        return {
            //当前audio时间
            currentTime:0,
            //audio总时长
            duration:0
        }
    },
    computed:{
        //从仓库中湖区仓库计算属性，转为组件的计算属性
        // ...mapGetters({
        //     currentSong:'Player/currentSong'
        // }),
        ...mapState({//从仓库中获得仓库state 转为组件的计算属性
        fullScreen:(state)=>state.Player.fullScreen,
        playing:state=>state.Player.playing,
        currentSong:state=>state.Player.currentSong
        }),
        id(){
            //计算歌曲id
            return this.currentSong.id
        },
        //计算audio进度百分比
        //计算属性如果这样写 那么只能使用不能修改
        //如果要修改属性1.实现set函数2.修改计算依赖
        progress(){
            const result =this.currentTime/this.duration;
            //console.log(result)
            return isNaN(result) ? 0 : result;
        }
    },
    watch:{
        playing(newVal){
             console.log(newVal)
             //等DOM渲染完之后再操作
             this.$nextTick(()=>{
                  console.log(this.audio.src)
                   if(newVal){//播放音乐
                 this.audio.play()
             }else{//暂停音乐
                 this.audio.pause()
             }
             });
        },  
        //监听歌曲id id变了 要重新加载歌曲 重新播放歌曲
        id(newVal,oldVal){
            if(!oldVal){
                return;
            }
            //有上一首歌
            this.$nextTick(()=>{
                this.audio.load();
                this.audio.play();
            })
        } 
    },
        methods:{
            //根据handleTouchChangeAction和handleProgressChangeAction两个事件实现效果
            //用户拖拽只更新进度 用户停止拖拽后 更新播放时间
        //处理进度条
        handleProgressChangAction(newVal){
            //1.修改进度不是真的修改progress，而是应该修改currenttime
            this.currentTime=newVal*this.duration//进度百分比*总时长=当前时间
        },
        //全屏播放器的触摸拖拽事件
        //触摸开始：start 触摸结束：end
        handleTouchAction(value){
            if(value==='start'){
                this.isTouch=true
            }else if(value==='end'){
                this.isTouch=false
                //2.音乐播放器，调整播放时间
            this.audio.currentTime=this.currentTime
            }
        }
    },
    mounted(){
        //组件挂载好 DOM首次渲染完毕 获得audio
        this.audio=this.$refs.audio

        this.audio.addEventListener('canplay',()=>{
            //audio可以播放时 获得音乐的时长
            //console.log(this.audio.duration)
            this.duration=this.audio.duration
        })

        //audio播放过程中时间的更新事件
        this.audio.addEventListener('timeupdate',()=>{
            //console.log('timeupdate',this.audio.currentTime)
            if(this.isTouch){
                return//用户在拖拽进度条
            }
            this.currentTime=this.audio.currentTime
        })
        //监听一首歌播放结束的事件
        this.audio.addEventListener('ended',()=>{
            //console.log('music end...')
            //播放模式为顺序播放：播放下一首
            //播放模式为单曲播放：重播这一首
            //播放模式为随机播放：随机歌曲列表的下一首
        })
    }
}
</script>

<style>
@keyframes rotate {
    0%{
        transform: rotate(0);
    }
    100%{
        transform: rotate(360deg);
    }
}
</style>