import { defineStore } from 'pinia'
import { reimInfo,addReimApi } from '@/api/onlineoffice/reim/index'
interface StateType {
  reimForm: null
}
const useReimStore = defineStore('leave', {
  state: (): StateType => ({
    reimForm: null
  }),
  actions: {
    getReimInfo(id: number) {
      let that = this
      reimInfo(id, function (res: any) {
        let { code, message, ...other } = res
        that.reimForm = other
      })
    },
    addReim(data: any) {
      addReimApi(data, function (res: any) {})
    }
  }
})
export default useReimStore
