// import { login, updatePassword } from '@/api/background/login'
import { login, updatePassword } from '@/api/login'
import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import router from '@/router'
interface LoginType {
  token: string
  permissions: any[]
}
const useLoginStore = defineStore('login', {
  state: (): LoginType => ({
    token: localStorage.getItem('token') || '',
    permissions: []
  }),
  actions: {
    loginAction(data: any) {
      let that = this
      login(data, function (res: any) {
        const { token, permissions, code } = res
        if (code === 200) {
          that.token = token
          that.permissions = permissions
          localStorage.setItem('token', that.token)
          localStorage.setItem('permission', JSON.stringify(that.permissions))
          ElMessage({
            message: '登入成功',
            type: 'success',
            duration: 1000
          })
          router.push({ name: 'MisHome' })
        } else {
          ElMessage({
            message: '登入失败',
            type: 'error'
          })
        }
        console.log(res)
      })
    },
    //修改密码
    updatePasswordAction(data: any) {
      updatePassword(data, function (res: any) {
        ElMessage({
          message: '密码修改成功',
          duration: 2000
        })
      })
    },
    //退出登入
    loginOutAction() {
      this.token = ''
      this.permissions = []
      localStorage.setItem('token', '')
    }
  }
})
export default useLoginStore
