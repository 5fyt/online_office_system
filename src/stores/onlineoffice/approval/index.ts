import { defineStore } from 'pinia'
import { approvalList, approvalInfo, approvalFn } from '@/api/onlineoffice/approval/index'
interface StateType {
  total: number
  tableList: any[]
  approvalInfo: null
}
const useApprovalStore = defineStore('approval', {
  state: (): StateType => ({
    total: 0,
    tableList: [],
    approvalInfo: null
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
    getApprovalInfo(id: string) {
      let that = this
      approvalInfo(id, function (res: any) {
        let { code, message, ...other } = res
        that.approvalInfo = other
      })
    },
    approval(data: any) {
      approvalFn(data, function () {})
    }
  }
})
export default useApprovalStore
