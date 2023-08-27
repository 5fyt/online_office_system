import { defineStore } from 'pinia'
import {
  approvalList,
  approvalInfo,
  approvalFn,
  leaveInfo,
  reimInfo,
  archiveFn
} from '@/api/onlineoffice/approval/index'
import { ElMessage } from 'element-plus'
interface StateType {
  total: number
  tableList: any[]
  approvalInfo: null
  reimInfo: null
  leaveInfo: null
  leaveForm: null | string
  reimForm: null | string
}
const useApprovalStore = defineStore('approval', {
  state: (): StateType => ({
    total: 0,
    tableList: [],
    approvalInfo: null,
    reimInfo: null,
    leaveInfo: null,
    leaveForm: localStorage.getItem('leave') || null,
    reimForm: localStorage.getItem('reim') || null
  }),
  actions: {
    getApprovalList(data: any) {
      let that = this
      approvalList(data, function (res: any) {
        const { total, results } = res
        that.total = total
        that.tableList = results
      })
    },
    //归档
    archiveImage(data: any) {
      archiveFn(data, function () {
        ElMessage({
          message: '归档成功',
          type: 'success'
        })
      })
    },
    getLeaveForm(value: any) {
      this.leaveForm = value
      localStorage.setItem('leave', JSON.stringify(this.leaveForm))
    },
    getReimForm(value: any) {
      this.reimForm = value
      localStorage.setItem('reim', JSON.stringify(this.reimForm))
    },
    getApprovalInfo(id: string, row: any) {
      let that = this
      if (row.type === '会议审批') {
        approvalInfo(id, function (res: any) {
          let { code, message, ...other } = res
          that.approvalInfo = other
        })
      } else if (row.type === '员工请假') {
        leaveInfo(id, function (res: any) {
          let { code, message, ...other } = res
          that.leaveInfo = other
        })
      } else {
        reimInfo(id, function (res: any) {
          let { code, message, ...other } = res
          that.reimInfo = other
        })
      }
    },
    approval(data: any) {
      approvalFn(data, function () {})
    }
  }
})
export default useApprovalStore
