<template>
  <nav class="site-navbar" :class="{ 'site-navbar--fold': sidebar.isFold }">
    <div class="site-navbar__header">
      <h1 class="site-navbar__brand">
        <a class="site-navbar__brand-lg">EMOS在线办公系统</a>
        <a class="site-navbar__brand-mini">办公</a>
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
        <div class="info">
          <div class="avatar-container">
            <el-avatar shape="circle" :size="25" :src="user.photo" :icon="UserFilled"></el-avatar>
          </div>
          <el-dropdown>
            <span class="el-dropdown-link">
              <span class="name">{{ user.name }}</span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="editPassword">修改密码</el-dropdown-item>
                <el-dropdown-item @click="updateAvatar">更换头像</el-dropdown-item>
                <el-dropdown-item @click="loginOut">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
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
  <el-dialog title="上传图片" align-center v-model="user.updateAvatarVisible" width="25%">
    <el-upload
      class="avatar-uploader"
      :action="uploadAvatar.action"
      :headers="uploadAvatar.headers"
      :data="data"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="user.updateAvatarVisible = false">取消</el-button>
        <el-button type="primary" @click="Submit">上传</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import SvgIcon from '@/components/SvgIcon/index.vue'
import { UserFilled, Plus } from '@element-plus/icons-vue'
import type { FormInstance, UploadProps } from 'element-plus'
import useLoginStore from '@/stores/login/index.ts'
import { reactive, ref, nextTick } from 'vue'
import { ElMessage } from 'element-plus'

import router from '@/router/index.ts'
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
const uploadAvatar = reactive({
  action: 'http://localhost:9002/user/upload-photo',
  headers: {
    token: localStorage.getItem('token')
  }
})
const data = ref({})
//退出登入表单信息
const loginOutForm = reactive<loginOut>({
  oldPassword: '',
  newPassword: '',
  comfirmPassword: ''
})
//用户信息常量
const user = reactive({
  name: '',
  photo: localStorage.getItem('photo') || '',
  //是否显示修改登陆密码的弹窗
  updatePasswordVisible: false,
  updateAvatarVisible:false
})
const imageUrl = ref('')
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

const load = () => {
  user.name = localStorage.getItem('name')
  user.photo = localStorage.getItem('photo')
}
load()
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
const updateAvatar = () => {
  user.updateAvatarVisible = true
}
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)

  localStorage.setItem('photo', response.url)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // const formData = new FormData()
  // formData.append('file', rawFile)
  // data.value = formData
  data.value['file'] = rawFile
  console.log('1')
  if (rawFile.type == 'image/gif' || rawFile.type == 'image/webp') {
    ElMessage.error('不支持该图片文件格式')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('图片文件不能超过2M')
    return false
  }
  return true
}
const Submit = () => {
  ElMessage.success('图片上传成功')
  user.photo = localStorage.getItem('photo')
  user.updateAvatarVisible = false
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
  padding-right: 34px;
}
.info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.name {
  margin-top: 3px;
  margin-left: 8px;
  text-align: center;
}
.avatar-uploader .el-upload {
  margin-left: 100px;
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar {
  width: 150px;
  height: 150px;
}
</style>
