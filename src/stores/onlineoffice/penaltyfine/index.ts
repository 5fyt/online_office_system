import { defineStore } from 'pinia'
import {
  getTypeList,
  addData,
  updateData,
  deleteData,
  getTableList
} from '@/api/onlineoffice/penaltyfine/index'
import { ElMessage } from 'element-plus'
interface StoreType {
  total: number
  tableList: any[]
  penaltyType: any[]
}
const usePenaltyStore = defineStore('penalty', {
  state: (): StoreType => ({
    total: 0,
    tableList: [],
    penaltyType: []
  }),
  actions: {
    //获取罚款类型列表
    getPenaltyType() {
      let that = this
      getTypeList(function (res: any) {
        that.penaltyType = res.results
      })
    },
    getDataList(pageName: string, data: any) {
      let that = this
      getTableList(pageName, data, function (res: any) {
        const { total } = res
        that.total = total
        that.tableList = res.results
      })
    },
    //添加
    addDatas(pageName: string, data: any) {
      addData(pageName, data, function () {})
    },
    //修改
    updateDatas(pageName: string, data: any) {
      updateData(pageName, data, function () {})
    },
    //删除
    deleteDatas(pageName: string, data: number[]) {
      deleteData(pageName, data, function (res: any) {
        if (res.code === 200) {
          ElMessage({
            message: '删除成功',
            type: 'success'
          })
        }
      })
    }
  }
})
export default usePenaltyStore
