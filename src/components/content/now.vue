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
    <canvas style="width: 80px; height: 80px;" canvas-id="firstCanvas"></canvas>
    <div class="daka">
      <div class="msg">{{ msg }}</div>
      <div class="date">{{ date }}</div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'content',
  data () {
    return {
      msg: '上班打卡',
      date: moment().format('HH:mm:ss')
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
  async created () {
    let res = await this.$http({ url: '/findNow', data: { time: this.time }, method: 'POST' })
    console.log(res)
  },
  mounted () {
    let context = wx.createCanvasContext('firstCanvas')
    // context.setStrokeStyle("#00ff00")
    // context.setLineWidth(5)
    // context.rect(0, 0, 200, 200)
    // context.stroke()
    // context.setStrokeStyle("#ff0000")
    // context.setLineWidth(2)
    // context.moveTo(160, 100)
    // context.arc(100, 100, 60, 0, 2 * Math.PI, true)
    // context.moveTo(140, 100)
    // context.arc(100, 100, 40, 0, Math.PI, false)
    // context.moveTo(85, 80)
    // context.arc(80, 80, 5, 0, 2 * Math.PI, true)
    // context.moveTo(125, 80)
    // context.arc(120, 80, 5, 0, 2 * Math.PI, true)
    // context.stroke()
    // context.draw()
    let canvas = {}
    canvas.width = 80
    canvas.height = 80
    // 初始角度为0
    let step = 0
    // 定义三条不同波浪的颜色
    let lines = ['rgba(59, 239, 215, 0.25)']

    function loop () {
      context.clearRect(0, 0, canvas.width, canvas.height)
      step++
      let angle = (step + 45) * Math.PI / 180
      let deltaHeight = Math.sin(angle) * 50
      let deltaHeightRight = Math.cos(angle) * 50
      context.beginPath()
      context.moveTo(0, canvas.height / 2 + deltaHeight)
      context.bezierCurveTo(canvas.width / 2, canvas.height / 2 + deltaHeight - 50, canvas.width / 2, canvas.height / 2 + deltaHeightRight - 50, canvas.width, canvas.height / 2 + deltaHeightRight)
      context.lineTo(canvas.width, canvas.height)
      context.lineTo(0, canvas.height)
      context.lineTo(0, canvas.height / 2 + deltaHeight)
      context.stroke()
      context.setStrokeStyle = '#3befd7'
      context.fill()
      context.draw()
      requestAnimationFrame(function () {
        loop()
      })
    }

    loop()
    setInterval(() => {
      this.date = moment().format('HH:mm:ss')
    }, 1000)
  }
}
</script>

<style lang="less" scoped>

</style>
