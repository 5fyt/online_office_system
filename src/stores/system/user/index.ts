import { defineStore } from 'pinia'
import {
  getDepartmentList,
  getUserTableList,
  getRoleList,
  addUser,
  updateUser,
  deleteUser,
  leaveUser,
  getRolePermission
} from '@/api/system/user/index'
interface userType {
  departLists: Object
  roleLists: any[]
  pages: number
  total: number
  users: any[]
  permissions:any[]
}
const useUserStore = defineStore('user', {
  state: (): userType => ({
    departLists: {}, //部门列表
    roleLists: [], //角色列表
    pages: 0,
    total: 0,
    users: [],
    permissions:[]
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
    //获取角色所有权限
    getRolePermissions(){
      let that = this
      getRolePermission(function(res:any){
        that.permissions=res.permissions
        localStorage.setItem('rolePermissions',JSON.stringify(that.permissions))
      })
    },
    //分页搜索用户数据
    getDeptTableList(pageName:string,data: any) {
      let that = this
      getUserTableList(pageName,data, function (res: any) {

        const { pages, total} = res
        that.pages = pages
        that.total = total
        if(res.hasOwnProperty('users')){
          that.users = res.users
        }else if(res.hasOwnProperty('departments')){
          that.users = res.departments
        }else{
          that.users=res.roles
        }

      })
    },
    //添加用户、部门、角色
    addUsers(pageName:string,data: any) {
      addUser(pageName,data, function () {})
    },
    //修改用户、部门、角色
    updateUsers(pageName:string,data: any) {
      updateUser(pageName,data, function () {})
    },
    //删除用户、部门、角色
    deleteUsers(pageName:string,data: number[]) {
      deleteUser(pageName,data, function (res: any) {
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
