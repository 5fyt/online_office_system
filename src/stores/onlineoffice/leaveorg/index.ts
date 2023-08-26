import { defineStore } from 'pinia'
import { leaveInfo } from '@/api/onlineoffice/leaveorg/index'
interface StateType {
  leaveForm: null
}
const useleaveStore = defineStore('leave', {
  state: (): StateType => ({
    leaveForm: null
  }),
  actions: {
    getLeaveInfo(id: number) {
      let that = this
      leaveInfo(id, function (res: any) {
        console.log(res)
        let { code, message, ...other } = res
        that.leaveForm = other
      })
    }
  }
})
export default useleaveStore
