import { defineStore } from 'pinia'
import {
  getDepartmentList,
  getUserTableList,
  getRoleList,
  addUser,
  updateUser,
  deleteUser,
  leaveUser
} from '@/api/system/user/index'
interface userType {
  departLists: Object
  roleLists: any[]
  pages: number
  total: number
  users: any[]
}
const useUserStore = defineStore('user', {
  state: (): userType => ({
    departLists: {}, //部门列表
    roleLists: [], //角色列表
    pages: 0,
    total: 0,
    users: []
  }),
  actions: {
    //获取部门列表
    getDeptList() {
      let that = this
      getDepartmentList(function (res: any) {
        that.departLists = res.departments
        localStorage.setItem('departList', JSON.stringify(that.departLists))
      })
    },
    //获取角色列表
    getRoleList() {
      let that = this
      getRoleList(function (res: any) {
        that.roleLists = res.roles
        localStorage.setItem('roleList', JSON.stringify(that.roleLists))
      })
    },
    //分页搜索用户数据
    getDeptTableList(data: any) {
      let that = this
      getUserTableList(data, function (res: any) {
        const { pages, total, users } = res
        that.pages = pages
        that.total = total
        that.users = users
      })
    },
    //添加用户
    addUsers(data: any) {
      addUser(data, function () {})
    },
    //修改用户
    updateUsers(data: any) {
      updateUser(data, function () {})
    },
    //删除用户
    deleteUsers(data: string[]) {
      deleteUser(data, function (res: any) {
        if (res.code === 200) {
          ElMessage({
            message: '删除成功',
            type: 'success'
          })
        }
      })
    },
    //离职用户
    leaveUsers(data: string) {
      leaveUser(data, function (res: any) {
        if (res.code === 200) {
          ElMessage({
            message: '离职成功',
            type: 'success'
          })
        }
      })
    }
  }
})
export default useUserStore
