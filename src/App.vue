<template>
  <div id="app">
    <SongListPage ref="player" :data="dataSource" :class="{hasPadding:showPlayer}"/>
    <Player  v-if="showPlayer"/>
  </div>
</template>
<script>
import SongListPage from './SongListPage'
import Player from './player/Index'
import axios from 'axios'
import {mapState} from 'vuex'
export default {
  //声明子组件
  components:{
    SongListPage,
    Player
  },
  data(){
    return{
      //数据源
      dataSource:[]
    }
  },
  computed:{
    ...mapState({
      showPlayer:state=>(state.Player.currentIndex >0)
    })
  },
  created(){
    //请求歌手数据
    axios.get('http://localhost:3000/artists/songs?id=35531')
    .then(data=>{
      console.log('请求成功')
      //console.log(data)
      //过滤数据
      const newData=data.data.hotSongs.map(item=>({
        id:item.id,
        name:item.name,
        ar:item.ar.map(arItem=>arItem.name).join('/'),//歌手列表
        al:{
          name:item.al.name,
          picUrl:item.al.picUrl
        }
      }));
      console.log(newData)
      //将数据赋值给当前组件的属性
      this.dataSource=newData;
    })
    .catch(error=>{
      console.log('请求失败')
       console.log(error)
    })
  },
  // beforeMount(){
  //   console.log('beforeMount',this.$el)
  //   console.log('beforeMount--ref',this.$refs.player)
  // },
  // mounted(){
  //   console.log('mounted',this.$el)
  //   console.log('mounted--ref',this.$refs.player)
  // }
}
</script>
<style>
*{padding: 0;margin: 0;}
html,body,#app, .page{
  width: 100%;
  height: 100%;
}
.hasPadding{
  padding-bottom: 60px;
}
</style>
