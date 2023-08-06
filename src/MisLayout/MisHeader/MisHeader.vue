<template>
  <nav class="site-navbar" :class="{ 'site-navbar--fold': sidebar.isFold }">
    <div class="site-navbar__header">
      <h1 class="site-navbar__brand">
        <a class="site-navbar__brand-lg">EMOS在线办公系统</a>
        <a class="site-navbar__brand-mini">体检</a>
      </h1>
    </div>
    <div class="site-navbar__body" :class="{ 'navbar-container--fold': sidebar.isFold }">
      <div class="site-navbar__menu" @click="handleSwitch">
        <SvgIcon name="zhedie" class="icon-svg" />
      </div>

      <div class="site-navbar__menu site-navbar__menu--right">
        <div class="site-navbar__switch">
          <el-badge value="0">
            <SvgIcon name="duanxin" class="icon-svg duanxin-svg" />
          </el-badge>
        </div>
        <el-dropdown>
          <span class="el-dropdown-link">
            <span class="avatar-container">
              <el-avatar shape="circle" :size="25" :src="user.photo" :icon="UserFilled"></el-avatar>
            </span>
            {{ user.name }}
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="editPassword()">修改密码</el-dropdown-item>
              <el-dropdown-item @click="loginOut">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </nav>
  <el-dialog title="提示" v-model="user.updatePasswordVisible" width="25%">
    <el-form ref="loginOutRef" :model="loginOutForm" status-icon :rules="rules" label-width="80px">
      <el-form-item label="原密码" prop="oldPassword">
        <el-input v-model="loginOutForm.oldPassword" type="password" />
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="loginOutForm.newPassword" type="password" />
      </el-form-item>
      <el-form-item label="确定密码" prop="comfirmPassword">
        <el-input v-model="loginOutForm.comfirmPassword" type="password" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="user.updatePasswordVisible = false">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import SvgIcon from '@/components/SvgIcon/index.vue'
import { UserFilled } from '@element-plus/icons-vue'
import type { FormInstance } from 'element-plus'
import useLoginStore from '@/stores/login/index.ts'
// import { isURL } from '../../utils/validate'
import { reactive, ref, nextTick } from 'vue'

//加载绑定变量
const emit = defineEmits(['closeSwitch'])
const loginStore = useLoginStore()
//左边栏常量
const sidebar = reactive({
  //是否折叠左边栏
  isFold: false,
  sidebarSkin: 'dark'
})
interface loginoutType {
  oldPassword: string
  newPassword: string
  comfirmPassword: string
}

//退出登入表单信息
const loginOutForm = reactive<loginOut>({
  oldPassword: '',
  newPassword: '',
  comfirmPassword: ''
})
//用户信息常量
const user = reactive({
  name: '',
  photo: '',
  //是否显示修改登陆密码的弹窗
  updatePasswordVisible: false
})
const loginOutRef = ref<FormInstance>()
//两次密码是否输入一致
const isSamePassword = (rule: any, value: any, callback: any) => {
  console.log(value)
  if (value !== loginOutForm.newPassword) {
    return callback(new Error('两次密码输入不一致'))
  } else {
    callback()
  }
}
//表单校验
const rules = reactive({
  oldPassword: [
    { required: true, message: '密码为空请输入密码', trigger: 'blur' },
    { pattern: '^[a-zA-Z0-9]{6,20}$', message: '密码格式错误' }
  ],
  newPassword: [
    { required: true, message: '密码为空请输入密码', trigger: 'blur' },
    { pattern: '^[a-zA-Z0-9]{6,20}$', message: '密码格式错误' }
  ],
  comfirmPassword: [
    { required: true, pattern: '^^[a-zA-Z0-9]{6,20}$', message: '密码格式错误' },
    { validator: isSamePassword, trigger: 'blur' }
  ]
})
//控制收放开关
const handleSwitch = () => {
  emit('closeSwitch')
  sidebar.isFold = !sidebar.isFold
}
//退出登入
const loginOut = () => {
  loginStore.loginOutAction()
  router.push({ name: 'Login' })
}
//打开弹出层
const editPassword = () => {
  user.updatePasswordVisible = true
  nextTick(() => {
    loginOutRef.value.resetFields()
  })
}
//修改密码
const submit = () => {
  loginOutRef.value.validate((isOk) => {
    if (isOk) {
      let data = {
        oldPassword: loginOutForm.oldPassword,
        newPassword: loginOutForm.newPassword
      }
      loginStore.updatePasswordAction(data)
      user.updatePasswordVisible = false
    } else {
      ElMessage({
        title: '修改密码失败'
      })
    }
  })
}
</script>

<style lang="scss">
@import url('../../assets/scss/index.scss');
.site-navbar__menu {
  margin: 15px 8px;
  display: flex;
  justify-content: space-between;
}
.site-navbar__switch {
 padding-right:34px;
}
</style>
