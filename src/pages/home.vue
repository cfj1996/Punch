<template>
  <div class="app">
    <calendar @modeData="modeDate" stayus="current"/>
    <now :time="date"></now>
    <my-content :date="getDate"/>
    <button @click="uploadImg">图片上传</button>
    <img v-if="tempFile" :src="tempFile" alt="">
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
      getDate: moment().format('YYYY-MM-DD'),
      tempFile: ''
    }
  },
  methods: {
    modeDate (time) {
      this.date = time
    },
    uploadImg () {
      let _this = this
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success (res) {
          // tempFilePath可以作为img标签的src属性显示图片
          wx.uploadFile({
            url: 'http://127.0.0.1:7001/upload',
            filePath: res.tempFilePaths[0],
            name: 'file',
            success (upload) {
              let a = JSON.parse(upload.data)
              _this.tempFile = a.url
            }
          })
        }
      })
    }
  },
  created () {
    // this.$http({ url: '/home' }).then((res) => {
    //   console.log(res)
    // })
  }
}
</script>
