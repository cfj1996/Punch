<template>
  <div class="calendar">
    <date-head @prev="prevView" @next="nextView" :centerHeader="true" :indicator="shownIndicator"/>

    <div class="calendar__main">
      <!--<div class="calendar__today" @click="goToday">-->
        <!--今天-->
      <!--</div>-->
      <div class="calendar__date">
        <!-- 星期 -->
        <div class="calendar__weekdays">
          <div v-for="(weekDay, key) in weekDays" class="calendar__weekday" :key="key">{{weekDay}}</div>
        </div>
        <!-- 日期 -->
        <div class="date-view" @touchstart="touchStart" @touchend="touchEnd">
          <div class="slide-view" :style="slide">
            <div class="calendar__days"  v-for="(view, key1) in viewSlide" :style="{left: view.left}" :key="key1">
              <div class="calendar__day" v-for="(day, key) in view.data" :key="key"
                   :class="{'calendar__day_now': checkToday(day), 'calendar__day_selected': checkSelected(day), 'calendar__day_othermonth': checkOtherMonth(day), 'calendar__day_decorate': checkDecorate(day)}"
                   @click="select(day)">
                <span>{{day.getDate()}}<i class="sub" v-if="checkSub(day)" :style="{color: checkSub(day).color}">{{checkSub(day).content}}</i></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
  .calendar {
    font-size: 14px;
    background: #fff;

  & .calendar__header {
      position: relative;
      padding: 25px 0;
    }
  & .calendar__action {
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: absolute;
      height: 100%;
      top: 0;
      right: 10px;
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
  & .calendar__main {
    position: relative;
    }
  & .calendar__today {
      position: absolute;
      width: 20px;
      padding: 4px 0;
      border-radius: 10px;
      align-self: flex-start;
      background: #31b29c;
      font-size: 11px;
      text-align: center;
      color: #fff;
      z-index: 9999;
    }
  & .calendar__date {
      width: 100%;
      position: relative;
    }
  & .calendar__weekdays {
      margin: 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      font-size: 11px;
      color: #1e2329;
  & .calendar__weekday {
      width: 14.2%;
      flex: 1 0 auto;
      text-align: center;
    }
  }
    & .date-view{
      width: 100%;
      overflow: hidden;
      position: relative;
      .slide-view{
        transition: transform .5s ;
        display: flex;
        height: 180px;
        position: relative;
      }

    }
  & .calendar__days{
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
  & .calendar__day {
      position: relative;
      flex: 0 0 auto;
      display: inline-block;
      width: 14.2%;
      margin: 3px 0;
      text-align: center;
      font-size: 12px;
      color: #000;
  & .sub {
      font-style: inherit;
      font-size: 10px;
      line-height: 14px;
      position: absolute;
      top: -5px;
      left: 20px;
      text-align: center;
      width: 14px;
      height: 14px;
      background: #fff;
      border-radius: 14px;
    }
  & span {
      position: relative;
      display: inline-block;
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
    }
  &.calendar__day_now {
  & span {
      border-radius: 50%;
      background: #f5a781;
      color: #fff !important;
    }
  }
  &.calendar__day_selected {
  & span {
      border-radius: 50%;
      background: #eb4f04;
      color: #fff !important;
    }
  }
  &.calendar__day_othermonth {
  & span {
      border-radius: 50%;
      color: #ccc;
    }
  }
  &.calendar__day_decorate {
     position: relative;

  &:after {
     content: '';
     position: absolute;
     bottom: 2px;
     left: 0;
     right: 0;
     margin: auto;
     width: 4px;
     height: 4px;
     border-radius: 50%;
     background: #eb4f04;
   }
  }
  }
  }
  }
</style>

<script>
import DateHead from './date_title'
const I18N = {
  'zh-cn': ['日', '一', '二', '三', '四', '五', '六'],
  'en': ['SUN', 'MON', 'TUN', 'WED', 'THU', 'FRI', 'SAT']
}
export default {
  components: {
    DateHead
  },
  data () {
    return {
      viewSlide: [],
      Subscript: [0],
      index: 0,
      left: 0,
      startX: null
    }
  },
  props: {
    currentView: {
      type: Object,
      twoWay: true,
      'default' () {
        return {}
      }
    },
    decorate: {
      type: Object,
      'default' () {
        return {}
      }
    },
    sub: {
      type: Object,
      'default' () {
        return {}
      }
    },
    i18n: {
      type: String,
      'default': 'zh-cn'
    },
    indicator: {
      type: Object,
      'default' () {
        return {}
      }
    },
    selected: {
      type: Date,
      twoWay: true,
      'default' () {
        return new Date()
      }
    },
    startMonday: {
      type: Boolean,
      'default': false
    },
    startDate: {
      type: Date,
      twoWay: true,
      'default' () {
        return new Date()
      }
    },
    view: {
      type: String,
      'default': 'month'
    },
    centerHeader: {
      type: Boolean,
      'default': true
    }
  },
  computed: {
    shownIndicator () {
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
    },
    days () {
      let days = []
      let dayslength
      let startDay
      let leftPadding
      let startDate
      if (this.view === 'month') {
        dayslength = 35
        startDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth())
        startDay = startDate.getDay()
      } else {
        dayslength = 7
        startDate = this.startDate
        startDay = startDate.getDay()
      }
      if (this.startMonday) {
        leftPadding = startDay ? startDay - 1 : 6
      } else {
        leftPadding = startDay
      }

      Array.from({ length: leftPadding }, (v, k) => -(k + 1)).reverse().forEach((minus) => {
        days.push(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + minus))
      })
      days.push(startDate)
      Array.from({ length: dayslength - days.length }, (v, k) => k + 1).forEach((plus) => {
        days.push(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + plus))
      })
      return days
    },
    weekDays () {
      let weekDayNames = JSON.parse(JSON.stringify(I18N[this.i18n]))
      if (this.startMonday) {
        let sunday = weekDayNames.shift()
        weekDayNames.push(sunday)
      }
      return weekDayNames
    },
    slide () {
      return {
        width: '100%',
        transform: `translateX(${-this.index * 100}% )`
      }
    }
  },
  methods: {
    checkToday (day) {
      let now = new Date()
      return !!(
        day.getFullYear() === now.getFullYear() &&
        day.getMonth() === now.getMonth() &&
        day.getDate() === now.getDate()
      )
    },
    checkSelected (day) {
      return !!(
        day.getFullYear() === this.selected.getFullYear() &&
        day.getMonth() === this.selected.getMonth() &&
        day.getDate() === this.selected.getDate()
      )
    },
    checkOtherMonth (day) {
      return day.getMonth() !== this.startDate.getMonth()
    },
    checkDecorate (day) {
      let dateFormat = day.getFullYear() + '-' + ('0' + (day.getMonth() + 1)).slice(-2) + '-' + ('0' + (day.getDate())).slice(-2)
      return !!this.decorate[dateFormat]
    },
    checkSub (day) {
      let dateFormat = day.getFullYear() + '-' + ('0' + (day.getMonth() + 1)).slice(-2) + '-' + ('0' + (day.getDate())).slice(-2)
      return this.sub[dateFormat]
    },
    prevView () {
      if (this.view === 'month') {
        this.startDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth() - 1, this.startDate.getDate())
      } else {
        this.startDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate() - 7)
      }
      let tempArr = [...this.days]
      this.viewSlide.unshift({ data: tempArr, left: (this.index - 1) * 100 + '%' })
      if (this.viewSlide.length > 3) {
        this.viewSlide.pop()
      }
      this.index--
      // this.zji = 0
      if (!this.Subscript.includes(this.index)) {
        this.Subscript.unshift(this.index)
      }
      console.log(this.viewSlide)
    },
    nextView () {
      if (this.view === 'month') {
        this.startDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth() + 1, this.startDate.getDate())
      } else {
        this.startDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate() + 7)
      }
      let tempArr = [...this.days]
      this.viewSlide.push({ data: tempArr, left: (this.index + 1) * 100 + '%' })
      if (this.viewSlide.length > 3) {
        this.viewSlide.shift()
      }
      this.index++
      if (!this.Subscript.includes(this.index)) {
        this.Subscript.push(this.index)
      }
    },
    select (day) {
      this.selected = day
      this.$emit('modeData', new Date(day).getTime())
      console.log()
    },
    goToday () {
      this.startDate = new Date()
      this.selected = new Date()
      this.index = 0
    },
    touchStart (e) {
      this.startX = e.changedTouches[0].clientX
    },
    touchEnd (e) {
      if (e.changedTouches[0].clientX - this.startX > 100) {
        this.prevView()
      } else if (this.startX - e.changedTouches[0].clientX > 100) {
        this.nextView()
      }
    }
  },
  mounted () {
    let tempArr = [...this.days]
    this.viewSlide.push({ data: tempArr, left: this.index * 100 + '%' })
  }
}
</script>
