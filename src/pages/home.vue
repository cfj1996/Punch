<template>
  <div class="app">
    <calendar @modeData="modeDate" stayus="current"/>
    <now :time="date"></now>
  </div>
</template>

<script>
import Calendar from '@/components/calendar'
import Now from '../components/content/now'

export default {
  components: {
    Calendar,
    Now
  },
  data () {
    return {
      date: new Date().getTime()
    }
  },
  methods: {
    modeDate (time) {
      this.date = time
    }
  },
  created () {
    console.log(11111111111)
    this.$http({ url: '/home' }).then((res) => {
      console.log(res)
    })
  }
}
</script>

<style lang="less" scoped>
  .content {
    margin-top: 50px;
    min-height: 200px;
    width: 100%;
    border: 1px solid red;
  }
</style>
