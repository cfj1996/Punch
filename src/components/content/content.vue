<style scoped lang="less">
.content{
  margin: 10px;
  border: 1px solid #a4a4a4;
  ul{
    li{
      div{
        flex: 1;
        padding: 0 10px;
        font-size: 14px;
      }
      &:nth-child(1){
        border: none;
      }
      padding: 8px 0;
      border-top: 1px solid #a4a4a4;
      display: flex;
      .th{
        border-right: 1px solid #a4a4a4;
      }
      .td{
        text-align: center;
        color: #31b29c;
      }
    }
    .lr{
      min-height: 160px;
      font-size: 12px;
      padding-top: 3px;
      .text{
        flex: 1;
        span{
          font-size: 16px;
          font-weight: bold;
          padding-left: 30px;
          margin-right: 10px;
        }
      }
      .img-ku{
        flex: 0 0 25%;
        background: no-repeat center;
        background-size: contain;
      }
    }
  }
}
</style>
<template>
  <div class="content">
    <ul>
      <li>
        <div class="th">上班时间</div>
        <div class="td">{{ goTime }}</div>
      </li>
      <li>
        <div class="th">下班时间</div>
        <div class="td">{{ fromTime }}</div>
      </li>
      <li class="lr">
        <div class="text">
          <span>说明:</span>深刻的阿三打撒看到你撒阿斯达卡山看到你撒阿斯达卡山看到你撒阿斯达卡山看到你撒阿斯达卡山看到你撒阿斯达卡山
        </div>
        <div v-if="img" class="img-ku" :style="{backgroundImage: `url(${img})`}"></div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'content',
  data () {
    return {
      img: 'https://www.pixelstalk.net/wp-content/uploads/2016/06/Free-1080-x-1920-HD-Wallpapers-Download.jpg',
      goTime: 'aa',
      fromTime: 'bb'
    }
  },
  props: {
    date: String
  }
}
</script>
