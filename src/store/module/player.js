import { Math } from "core-js";

//定义常量
let mode=0;
const playMode={
    sequence:0,//顺序播放
    loop:1,//单曲循环
    random:2//随机播放
}
//仓库的音乐播放器相关状态

//根据播放模式和原始列表
const getPlayList=function(mode,sequencePlayList){
    //播放模式为顺序播放：列表为原始歌单
    if(mode===playMode.sequence){
        //拷贝  [...state.sequencePlayList]
        return [...sequencePlayList];
    }
    //播放模式为单曲播放：列表为原始歌单
    else if(mode===playMode.loop){
        return  [...sequencePlayList];
    }
    //播放模式为随机播放：列表为随机歌单
    else if(mode===playMode.random){
        const newArr=[...sequencePlayList]
        for(let i=0;i<newArr.length;i++){
            const item=newArr[i];
            const randomIndex=Math.floor(Math.random()*(i+1));
            //i=0的时候，randomIndex向下取整 0
            //i=1的时候，randomIndex向下取整 0、1
            //i=2的时候，randomIndex向下取整 0、1、2
            //randomIndex就是遍历出来的这个item的随机位置
            newArr[i]=newArr[randomIndex]
            newArr[randomIndex]=item
        }
        //设置播放歌曲列表
        return newArr;
    }
}
export default{
    namespaced: true,//命名空间
    state:{
        //是否要全屏播放
        fullScreen:false,
        //当前音乐是否在播放
        playing:false,
        //顺序歌曲列表 原始的歌单列表
        sequencePlayList:[],
        //播放歌曲列表
        playList:[],
        //播放模式
        mode:playMode.sequence,
        //当前播放歌曲在播放列表的下标
        currentIndex:-1,
        //当前歌曲信息
        currentSong:{}
    },
    getters:{
        //当前歌曲信息
        currentSong(state,getters){
            if(state.currentIndex>=0 && state.currentIndex<getters.playList.length){
                //选中了歌曲要播放
                return getters.playList[state.currentIndex];
            }else{
                //没有选中歌曲
                return{};
            }
        },
    },
    mutations: {
        //歌单中点击歌曲后的处理事件
        selectSongByIndex(state,payLoad){
            console.log(payLoad)
            //设置歌曲下标
            state.currentIndex=payLoad.index
            //歌单原始数据需要一直保留 不能被其他事件影响到歌单顺序
            state.sequencePlayList=[...payLoad.list]
            //重新计算播放歌单
            state.playList=getPlayList(state.mode,state.sequencePlayList);
            //设置当前歌曲信息
            state.currentSong=state.sequencePlayList[state.currentIndex]
            //找到歌曲所在playList正确的下标
            state.currentIndex=state.playList.findIndex(item=>item.id===state.currentSong.id)
            //播放音乐的状态
            state.playing=true
            },
            //修改播放状态
            setPlaying(state,payLoad){
                state.playing=payLoad.value
            },
            //修改是否为全屏播放
            setFullScreen(state,payLoad){
                state.fullScreen=payLoad.value;
            },
            //切换播放模式
            changePlayMode(state){
                //1.修改播放模式
                mode+=1;
                // mode%3
                //0 1 2 3 4 5 6
                //0 1 2 0 1 2 0
                state.mode=mode%3

                                     //2.修改播放列表
                state.playList=getPlayList(state.mode,state.sequencePlayList);

                //3.修改index
                state.currentIndex=state.playList.findIndex(item=>{
                   return item.id===state.currentSong.id
                })
                //4.修改当前歌曲信息
                state.currentSong=state.playList[state.currentIndex]
       
            }
        },
    actions: {
        
    }
}