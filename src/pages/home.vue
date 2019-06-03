<template>
  <div class="app">
    <calendar @modeData="modeDate" stayus="current"/>
    <now :time="date"></now>
    <my-content :date="getDate"/>
  </div>
</template>

<script>
import moment from 'moment'
import Calendar from '../components/calendar'
import Now from '../components/content/now'
import myContent from '../components/content/content'

export default {
  components: {
    Calendar,
    Now,
    myContent
  },
  data () {
    return {
      date: new Date().getTime(),
      getDate: moment().format('YYYY-MM-DD')
    }
  },
  methods: {
    modeDate (time) {
      this.date = time
    }
  },
  created () {
    this.$http({ url: '/home' }).then((res) => {
      console.log(res)
    })
  }
}
</script>
