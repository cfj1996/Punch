<template>
  <div class="app">
    <!--<calendar :startDate="prev"/>-->
    <calendar stayus="current"/>
    <!--<calendar :startDate="next" stayus="next"/>-->
  </div>
</template>

<script>
import Calendar from '@/components/calendar'

export default {
  components: {
    Calendar
  },
  data () {
    return {
      prev: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
      next: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
      t: 1,
      color: '#007d37'
    }
  },
  beforeCreate () {
    console.log('Page [hello] Vue beforeCreate')
  },
  created () {
    console.log('Page [hello] Vue created')
    var appInstance = getApp()
    console.log(appInstance.globalData) // I am global data
  },
  beforeMount () {
    console.log('Page [hello] Vue beforeMount')
  },
  mounted () {
    console.log('Page [hello] Vue mounted')
  },
  onLoad (options) {
    // Do some initialize when page load.
    console.log('Page [hello] onLoad')
  },
  onReady () {
    // Do something when page ready.
    console.log('Page [hello] onReady')
  },
  onShow () {
    // Do something when page show.
    console.log('Page [hello] onShow')
  },
  onHide () {
    // Do something when page hide.
    console.log('Page [hello] onHide')
  },
  onUnload () {
    // Do something when page close.
    console.log('Page [hello] onUnload')
  },
  /**
   * for other event handlers, please check https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page.html
   */
  methods: {
    changeStat () {
      this.t++
      this.color = '#' + Math.floor(Math.random() * 0xffffff).toString(16)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
