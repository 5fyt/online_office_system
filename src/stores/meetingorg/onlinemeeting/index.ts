import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import { addMeeting, deleteMeeting, getDataList } from '@/api/meetingorg/onlinemeeting/index'
const useOnlineStore = defineStore('onlinemeeting', {
  state: () => ({
    total: 0,
    tableList: []
  }),
  actions: {
    getTableList(data: any) {
      let that = this

      getDataList(data, function (res: any) {
        that.total = res.total
        that.tableList = res.meetings
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
    //删除会议
    deleteMeetingAction(id: number) {
      deleteMeeting(id, function (res: any) {
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
export default useOnlineStore
