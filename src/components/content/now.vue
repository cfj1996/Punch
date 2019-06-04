<style scoped lang="less">
  .component {
    canvas {
      margin: 0 auto;
    }
    .daka {
      font-size: 16px;
      width: 80px;
      text-align: center;
      margin: 10px auto 0 auto;
      padding: 16px 0;
      border-radius: 50%;
      background-image: -webkit-gradient(linear, 0% 0%, 39% 100%, from(#3befd7), to(#7EFF75));
      .date {
        font-size: 14px;
        margin-top: 8px;
      }
    }
  }
</style>
<template>
  <div class="component">
    <canvas @click="onClick" style="width: 80px; height: 80px;" canvas-id="firstCanvas"></canvas>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'content',
  data () {
    return {
      canvasData: {
        canvas: wx.createCanvasContext(),
        myCanvas: wx.createCanvasContext('firstCanvas'),
        text: '上班打卡',
        date: moment().format('HH:mm:ss'),
        step: 0,
        width: 80,
        height: 80,
        bunColor: '#0feadd',
        path: '#20ffd3',
        textColor: '#000000'
      }
    }
  },
  props: {
    content: {
      type: Object,
      default () {
        return {}
      }
    },
    time: {
      type: String
    }
  },
  methods: {
    onClick () {
      console.log(1)
    },
    canvas () {
      let context = this.canvasData.myCanvas
      this.canvasData.step++
      context.clearRect(0, 0, this.canvasData.width, this.canvasData.height)
      context.beginPath()
      context.arc(this.canvasData.width / 2, this.canvasData.height / 2, this.canvasData.height / 2, 0, 2 * Math.PI)
      context.setFillStyle(this.canvasData.bunColor)
      context.fill()
      // context.draw()
      let angle = (this.canvasData.step + 10) * Math.PI / 180
      let deltaHeight = Math.sin(angle) * 10
      let deltaHeightRight = Math.cos(angle) * 10
      context.beginPath()
      context.moveTo(0, this.canvasData.height / 2)
      context.bezierCurveTo(this.canvasData.width / 2, this.canvasData.height / 2 + deltaHeight, this.canvasData.width / 2, this.canvasData.height / 2 + deltaHeightRight, this.canvasData.width, this.canvasData.height / 2)
      context.arc(this.canvasData.width / 2, this.canvasData.height / 2, this.canvasData.height / 2, 0, Math.PI)
      context.setStrokeStyle(this.canvasData.path)
      context.stroke()
      context.setFillStyle(this.canvasData.path)
      context.fill()
      context.setFontSize(15)
      context.setFillStyle(this.canvasData.textColor)
      context.fillText(this.canvasData.text, 10, 30)
      context.setFontSize(15)
      context.setFillStyle(this.canvasData.textColor)
      context.fillText(moment().format('HH:mm:ss'), 10, 60)
      context.draw()
      // let myCanvas = this.canvasData.myCanvas
      // myCanvas.drawImage(context, 0, 0, this.canvasData.width, this.canvasData.height)
      // myCanvas.draw()
      setTimeout(this.canvas, 16.6666)
    }
  },
  async created () {
    // let res = await this.$http({ url: '/findNow', data: { time: this.time }, method: 'POST' })
    // console.log(res)
  },
  onReady () {
    this.canvas()
  }
}
</script>

<style lang="less" scoped>

</style>
