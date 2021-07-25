<template>
  <!-- 圆形进度条 -->
  <div class="circle-progress">
    <i class="iconfont" @click="changeClick" :class="{ iconzanting: value, iconbofang: !value }"></i>
    <canvas class="canvas" ref="canvas"></canvas>
  </div>
</template>

<script>
export default {
  props: {
    value: Boolean,
    progress: Number,
  },
  watch:{
      progress(){
        //console.log('需要重新绘制')
        this.renderAction()
      }
  },
  methods: {
    changeClick() {
      this.$emit("input", !this.value);
    },
    renderAction(){
        //清楚上次的绘制
        this.context.clearRect(0,0,62,62)
      this.context.save()
      this.context.beginPath()
      //1.2绘制外大圆
      this.context.moveTo(31,31);
      this.context.arc(31,31,31,0,2*Math.PI*360,false);
      this.context.lineTo(31,31);
      //1.3绘制内小圆
      this.context.moveTo(31,31);
      this.context.arc(31,31,24,0,2*Math.PI*360,false);
      this.context.lineTo(31,31);
      this.context.closePath();
      this.context.fillStyle='rgba(212,68,57,0.3)';
      //1.4镂空填充小圆
      this.context.fill('evenodd');
      //1.5恢复
      this.context.restore();

      //2.填充圆弧
      const startA=(Math.PI/180)*-90;
      const endA=startA + (Math.PI/180)*360*this.progress
      this.context.save()
      this.context.beginPath()
      //2.1填充外圆弧  角度转弧度
      this.context.moveTo(31,31);
      this.context.arc(31,31,31,startA,endA,false);
      this.context.lineTo(31,31);
      //2.2填充内圆弧
      this.context.moveTo(31,31);
      this.context.arc(31,31,24,startA,endA,false);
      this.context.lineTo(31,31);
      this.context.closePath();
      this.context.fillStyle='rgba(212,68,57,1)';
      //2.3镂空填充内圆弧
      this.context.fill('evenodd');
      //2.4恢复
      this.context.restore();
    }
  },
  mounted(){
      const canvas=this.$refs.canvas;
      //设置画布大小
      canvas.width=62;
      canvas.height=62;
      //1.绘制小圆环
      //1.1 获得画布上下文
      this.context=canvas.getContext("2d");
      this.renderAction()
  }
};
</script>

<style scoped lang="scss">
.circle-progress {
  width: 32px;
  height: 32px;
  position: relative;
  .iconfont {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
  }
}
.canvas {
  // 不能在CSS中给canvas画布设置宽高 设置了宽高是进行了拉伸
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
}
</style>