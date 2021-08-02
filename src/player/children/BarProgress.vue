<template>
  <div class="bar-progress">
    <span class="text">{{currentTime | formatTime}}</span>
    <div class="bar" ref="bar" :style="{backgroundImage:backgroundStyle}">
      <span class="icon" ref="icon"></span>
    </div>
    <span class="text">{{duration | formatTime}}</span>
  </div>
</template>

<script>
export default {
    props: {
      //接收外部属性
        value:Number,
        duration:Number,
        currentTime:Number
    },
    //过滤器申明
    filters:{
      formatTime(value){
        //计算分钟数
        let mins=Math.floor(value/60)
        // mins=mins>9?mins:('0'+mins)
        //计算秒数
        let secend=Math.floor(value%60)
        secend=secend>9?secend:('0'+secend)

        return mins+":"+secend;
      }
    },
    watch:{
        value:{
            handler(){
                //组件挂载后 再执行
                this.$nextTick(()=>{
                     //调整初始位置
                 this.$refs.icon.style.transform=`translate(${this.maxScroll*this.value}px,-50%)`;
                })
            },
            immediate:true//初始化后执就行
        }
    },
     computed:{
    //根据value的变化线性渐变效果
    backgroundStyle(){
      const percent=this.value *100;
      return `linear-gradient(to right,red 0%,red ${percent}%,gray ${percent}%,gray 100%)`;
    }
  },
  mounted() {
    //操作DOM 添加移动端的触摸事件
    const bar = this.$refs.bar;
    const icon = this.$refs.icon;
    const maxScroll=this.maxScroll=bar.offsetWidth - icon.offsetWidth;
    //添加icon的触摸事件
    //基于触摸开始事件上的监听移动和停止
    icon.addEventListener("touchstart", (ev) => {
      // console.log("touchstart");
      let x=this.maxScroll*this.value//记录每一次偏移的位置
      //告诉外部触摸开始了
      this.$emit('touchstart')
      //记录开始的位置
      const startX=ev.changedTouches[0].clientX
      const touchmoveCallback = (ev) => {
        // console.log("touchmove");
        //计算偏移量
        let offsetX=ev.changedTouches[0].clientX - startX;
        offsetX=offsetX+x;//叠加上一次的位置
        //约束偏移量
        if(offsetX <=0){
            offsetX=0
        }
        if(offsetX >= maxScroll)
        {
            offsetX=maxScroll
        }
        // console.log(offsetX);
        //手指移动多少 就让icon标签跟着偏移多少
        icon.style.transform=`translate(${offsetX}px,-50%)`;
        //计算进度的百分比
        const progress=offsetX / maxScroll;
        //传值给外部
        this.$emit('input',progress)
      };
      const touchendCallback = (ev) => {
          //移除监听
        // console.log("touchend");
        //告诉外部触摸停止了
        // this.$emit('touchend')
        document.removeEventListener("touchmove", touchmoveCallback);
        document.removeEventListener("touchend", touchendCallback);
      };
      //添加监听
      document.addEventListener("touchmove", touchmoveCallback);
      document.addEventListener("touchend", touchendCallback);
    });
  },
};
</script>

<style scoped lang="scss">
.bar-progress {
  width: 80%;
  margin: 25px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.bar {
  position: relative;
  flex: 1;
  height: 4px;
  background-color: #eee;
  .icon {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(0, -50%);
    display: block;
    width: 10px;
    height: 10px;
    border: 4px solid #fff;
    background-color: red;
    border-radius: 50%;
    //扩大作用域
    &::before {
      content: "";
      position: absolute;
      left: -5px;
      top: -5px;
      right: -5px;
      bottom: -5px;
    }
  }
}
.text {
  font-size: 12px;
  color: #666;
  margin: 0 5px;
  width: 25px;
  text-align: center;
}
</style>