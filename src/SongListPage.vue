<template>
  <div class="song-list page">
    <ul>
      <li
        class="item"
        v-for="(item, index) in data"
        :key="item.id"
        @click="songClickAction(index)"
      >
        <p class="index">{{ index + 1 }}</p>
        <div class="content">
          <h3 class="name">{{ item.name }}</h3>
          <p class="info">
            <span>{{ item.ar }}</span>
            <span> - </span>
            <span>{{ item.al.name }}</span>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  //接收外部的属性
  props: {
    data: Array,
  },
  methods:{
      songClickAction(index){
        //将用户点击歌曲列表下标和当前的歌曲列表传递给store
        this.$store.commit({
          type:'Player/selectSongByIndex',//commit的事件名称
          index:index,//参数：下标
          list:this.data//参数：整个歌单列表
        })
          // console.log(JSON.stringify(item))
      }
  }
};
</script scoped>

<style>
@keyframes rotate {
    0%{
        transform: rotate(0);
    }
    100%{
        transform: rotate(360deg);
    }
}
.song-list{
  width: 100%;
  height: 100%;
  overflow: auto;
}
.item {
  border: 1px solid #ddd;
  display: flex;
  padding: 10px;
}
.index {
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
}
.content {
  flex: 1;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: flex-start;
}
.name {
  font-size: 16px;
  font-weight: normal;
}
.info {
  font-size: 14px;
  color: #555;
}
</style>