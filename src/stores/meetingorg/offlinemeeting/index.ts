import {
  getMeetingName,
  getMemberName,
  getofflineList,
  getCalendarList,
  addMeeting,
  meetingInfo,
  meetingdelete
} from '@/api/meetingorg/offlinemeeting'
import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
interface StateType {
  meetingNames: string[]
  memberNames: any[]
  meetings: any[]
  infoDatas: any
  calandarMeetings: any[]
  total: number
  pages: number
}
const useOfflineStore = defineStore('offline', {
  state: (): StateType => ({
    meetingNames: [],
    memberNames: [],
    calandarMeetings: [],

    infoDatas: null,

    meetings: [],
    total: 0,
    pages: 0
  }),
  persist: {
    enabled: true // 开启数据缓存
  },
  actions: {
    //获取会议室名
    getMeetingNames() {
      let that = this
      getMeetingName(function (res: any) {
        that.meetingNames = res.names
        localStorage.setItem('meetingNames', JSON.stringify(that.meetingNames))
      })
    },
    //获取成员名
    getMemberNames() {
      let that = this
      getMemberName(function (res: any) {
        that.memberNames = res.members
      })
    },
    //获取甘特图数据
    getOfflineTableList(data: any) {
      let that = this
      getofflineList(data, function (res: any) {
        const { total, pages, meetings } = res
        that.total = total
        that.pages = pages
        that.meetings = meetings
      })
    },
    //获取周日历数据
    getOfflineCalendar(data: any) {
      let that = this
      getCalendarList(data, function (res: any) {
        const { meetings } = res
        that.calandarMeetings = meetings
      })
    },
    //添加新会议
    addMeetings(data: any) {
      addMeeting(data, function (res: any) {
        if (res.code === 200) {
          ElMessage({
            message: '添加成功',
            type: 'success'
          })
        } else {
          ElMessage({
            message: '添加失败',
            type: 'error'
          })
        }
      })
    },
    showMeetingInfo(id: number) {
      let that = this
      meetingInfo(id, function (res: any) {
        let { code, message, ...data } = res
        localStorage.setItem('info', JSON.stringify(data))
        that.infoDatas = data
      })
    },
    //删除会议
    deleteMeeting(id: number) {
      meetingdelete(id, function (res: any) {
        if (res.code === 200) {
          ElMessage({
            message: '删除成功',
            type: 'success'
          })
        } else {
          ElMessage({
            message: '删除失败',
            type: 'error'
          })
        }
      })
    }
  }
})
export default useOfflineStore
