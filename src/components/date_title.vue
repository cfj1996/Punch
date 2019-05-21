<template>
  <div class="calendar__header">
    <!-- 年份 月份 -->
    <div class="calendar__control" :class="{'calendar__control_center': centerHeader}">
      <div class="calendar__arrow left" @click="proxyPrevView"></div>
      <div class="calendar__indicator">
        <span class="calendar__indicator-title">{{shownIndicator.title}}</span>
        <span class="calendar__indicator-detail">{{shownIndicator.detail}}</span>
      </div>
      <div class="calendar__arrow right" @click="proxyNextView"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'date_title',
  props: {
    centerHeader: {
      type: Boolean,
      'default': true
    },
    indicator: {
      type: Object,
      'default' () {
        return {}
      }
    }
  },
  computed: {
    shownIndicator: {
      get () {
        let indicator = {}
        if (this.indicator.title) {
          indicator.title = this.indicator.title
        } else {
          indicator.title = this.startDate.getFullYear()
        }

        if (this.indicator.detail) {
          indicator.detail = this.indicator.detail
        } else {
          indicator.detail = this.startDate.getMonth() + 1 + '月'
        }
        return indicator
      }
    }
  },
  methods: {
    proxyPrevView () {
      this.$emit('prev')
    },
    proxyNextView () {
      this.$emit('next')
    }
  }
}
</script>

<style scoped lang="less">
  .calendar {
    font-size: 14px;
    background: #fff;

    & .calendar__header {
      position: relative;
      padding: 25px 0;
    }
    & .calendar__control {
      width: 240px;
      padding: 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      color: #1e2329;
      &.calendar__control_center {
        margin: 0 auto;
      }

      & .calendar__indicator {
        display: flex;
        align-items: center;
        justify-content: space-around;
        font-weight: bold;
      }
      & .calendar__indicator-detail {
        color: #31b29c;
        margin-left: 10px;
      }
      & .calendar__arrow {
        width: 44px;
        text-align: center;

        &.right {
          &:after {
            display: inline-block;
            content: '';
            width: 0;
            height: 0;
            border-top: 5px solid transparent;
            border-bottom: 5px solid transparent;
            border-left: 5px solid #c7d2d0;
          }
        }
        &.left {
          &:after {
            display: inline-block;
            content: '';
            width: 0;
            height: 0;
            border-top: 5px solid transparent;
            border-bottom: 5px solid transparent;
            border-right: 5px solid #c7d2d0;
          }
        }
      }
    }
  }
</style>
