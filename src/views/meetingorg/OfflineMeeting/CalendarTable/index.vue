<template>
  <div class="calendar">
    <div class="row">
      <div class="cell">时间</div>
      <div class="cell" v-for="(time, index) in calendarDays.days" :key="index">{{ time }}</div>
    </div>
    <div class="row" v-for="(time, index) in initTime" :key="index">
      <div class="cell-time" v-if="initTime[index + 1] !== undefined">
        {{ time }}~{{ initTime[index + 1] }}
      </div>
      <div class="cell" v-for="(day, index) in calendarDays.days" :key="index">
        <!-- 会议单 -->
        <div
          class="meeting"
          v-if="meetingDetail.meetingObj.hasOwnProperty(`${day}#${time}`)"
          :style="{
            height: meetingDetail.meetingObj[`${day}#${time}`].time * 31 + 'px',
            lineHeight: meetingDetail.meetingObj[`${day}#${time}`].time * 31 + 'px'
          }"
          @click="infoHandler"
        >
          <SvgIcon
            name="close"
            class="icon-svg-close"
            @click.stop="deleteHandle(`${day}#${time}`)"
          />
          {{ meetingDetail.meetingObj[`${day}#${time}`].title }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import initTime from '@/global/constants/offlinemeeting/index.ts'
const initTimes = reactive(initTime)
//根据日期选择器，选择哪天的日期，将后面六天的日期一次获取渲染到头部
const calendarDays = reactive({
  days: [
    '07/26(周一)',
    '07/27(周二)',
    '07/27(周三)',
    '07/28(周四)',
    '07/29(周五)',
    '07/30(周六)',
    '07/31(周日)'
  ]
})
//会议生成详情单 模拟数据
const meetingDetail = reactive({
  meetingObj: {
    '07/26(周一)#09:00': { title: '测试会议1', date: '2021-07-31', start: '09:00', time: 2 },
    '07/27(周三)#15:30': { title: '测试会议2', date: '2021-07-31', start: '15:30', time: 2 }
  }
})
//点击会议弹出会议的详细信息
const infoHandler = () => {}
</script>
<style lang="less">
@import url('./index.less');
</style>
