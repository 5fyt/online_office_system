<template>
  <div>
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
          <template v-for="(meeting, index) in meetingDetail.meetings" :key="index">
            <div
              class="meeting"
              v-if="dayjs(meeting.date).format('MM/DD(ddd)') === day && meeting.start === time"
              :style="{
                height: meeting.segment * 31 + 'px',
                lineHeight: meeting.segment * 31 + 'px'
              }"
              @click="infoHandler(meeting.id)"
            >
              <SvgIcon
                name="close"
                class="icon-svg-close"
                @click.stop="deleteHandle(meeting.id)"
                v-if="meeting.canDelete"
              />
              {{ meeting.title }}
            </div>
          </template>
        </div>
      </div>
    </div>
    <MeetingInfo ref="meetingRef"></MeetingInfo>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import dayjs from 'dayjs'
import initTime from '@/global/constants/offlinemeeting/index.ts'
import useOfflineStore from '@/stores/meetingorg/offlinemeeting/index.ts'
import { transTime } from '@/utils/translate.ts'
import MeetingInfo from '../MeetingInfo/index.vue'
import SearchForm from '../SearchForm/index.vue'
interface IProps {
  queryInfo: {
    room: string
    type: string
    date?: string
  }
}
const props = defineProps<IProps>()
const meetingRef = ref()
const show = ref(true)
const initTimes = reactive(initTime)
const offlineStore = useOfflineStore()
const { calandarMeetings } = storeToRefs(offlineStore)
//根据日期选择器，选择哪天的日期，将后面六天的日期一次获取渲染到头部
const calendarDays = reactive({
  days: []
})
//会议生成详情单 模拟数据
const meetingDetail = reactive({
  meetings: []
})
const loadCalendarData = () => {
  if (props.queryInfo?.date) {
    console.log(props.queryInfo.date)
    offlineStore.getOfflineCalendar({ ...props.queryInfo })
    // calendarDays.days = transTime(calandarMeetings.value)
    calendarDays.days = transTime(props.queryInfo.date)
    meetingDetail.meetings = calandarMeetings.value
  } else {
    let data = {
      date: dayjs().format('YYYY-MM-DD')
    }
    offlineStore.getOfflineCalendar({ ...props.queryInfo, ...data })
    // calendarDays.days = transTime(calandarMeetings.value)
    calendarDays.days = transTime(props.queryInfo.date)
    meetingDetail.meetings = calandarMeetings.value
    console.log('meetings',meetingDetail.meetings)
  }
}

//申请会议
const apply = () => {
  dialogRef.value?.show()
}
//点击会议弹出会议的详细信息
const infoHandler = (value) => {
  meetingRef.value?.show()
  meetingRef.value?.showInfo(value)
}
//删除会议
const deleteHandle = (id) => {
  offlineStore.deleteMeeting(id)
  loadCalendarData()
}
defineExpose({ loadCalendarData })
</script>
<style lang="less">
@import url('./index.less');
</style>
