<template>
  <div class="dialog">
    <el-dialog v-model="dialogVisible" :title="uid ? '修改' : '新增'" width="450px">
      <el-form
        ref="dialogRef"
        :model="dialogForm"
        :rules="dialogRules"
        status-icon
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="dialogForm.username" clearable />
        </el-form-item>
        <template v-if="!uid">
          <el-form-item label="密码" prop="password">
            <el-input v-model="dialogForm.password" clearable show-password />
          </el-form-item>
        </template>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="dialogForm.name" clearable />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="dialogForm.gender" clearable>
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="dialogForm.phone" clearable />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="dialogForm.email" clearable />
        </el-form-item>
        <el-form-item label="入职时间" prop="hireDate">
          <el-date-picker
            v-model="dialogForm.hireDate"
            type="date"
            placeholder="选择日期"
            :editable="false"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="dialogForm.role" placeholder="角色" class="dialog-input" clearable>
            <el-option
              v-for="(role, index) in dialogList.roleList"
              :key="index"
              :label="role.roleName"
              :value="role.roleName"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="部门">
          <el-select
            v-model="dialogForm.department"
            placeholder="部门"
            clearable="clearable"
            class="dialog-input"
          >
            <el-option
              v-for="(dept, index) in dialogList.deptList"
              :key="index"
              :label="dept.deptName"
              :value="dept.deptName"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelBtn">取消</el-button>
          <el-button type="primary" @click="confirmBtn"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { objTransArrayObj } from '@/utils/translate.ts'
import useUserStore from '@/stores/background/user/index.ts'
import { storeToRefs } from 'pinia'
const userStore = useUserStore()
const dialogRef = ref<FormInstance>()
const emit = defineEmits(['add'])

const dialogVisible = ref(false)
const uid = ref('')

interface DialogFormType {
  username: string
  name: string
  password: string
  gender: string
  phone: string
  email: string
  role: string
  dept: string
  hireDate: string
}
interface DialogListType {
  roleList: any[]
  deptList: any[]
}
//dialog form表单 数据绑定
const dialogForm = reactive<DialogFormType>({
  username: '',
  name: '',
  password: '',
  gender: '',
  phone: '',
  email: '',
  role: '',
  department: '',
  hireDate: ''
})
const dialogList = reactive<DialogListType>({
  roleList: [],
  deptList: []
})
const dialogRules = reactive({
  username: [
    { required: true, message: '用户名不能为空' },
    { pattern: '^[a-zA-Z0-9]{3,20}$', message: '用户名格式错误' }
  ],
  password: [
    { required: true, message: '密码不能为空' },
    { pattern: '^[a-zA-Z0-9]{6,20}$', message: '密码格式错误' }
  ],
  name: [
    { required: true, message: '姓名不能为空' },
    { pattern: '^[\u4e00-\u9fa5]{2,10}$', message: '姓名格式错误' }
  ],
  gender: [{ required: true, message: '性别不能为空' }],
  phone: [
    { required: true, message: '电话不能为空' },
    { pattern: '^1[3-9]\\d{9}$', message: '电话格式错误' }
  ],
  email: [
    { required: true, message: '邮箱不能为空' },
    {
      pattern: '^([a-zA-Z]|[0-9])(\\w|\\-)+@[a-zA-Z0-9]+\\.([a-zA-Z]{2,4})$',
      message: '邮箱格式错误'
    }
  ],
  hireDate: [{ required: true, message: '入职日期不能为空' }],
  role: [{ required: true, message: '角色不能为空', trigger: 'blur' }]
})
const showList = () => {
  let roleObj = JSON.parse(localStorage.getItem('roleList'))
  let departObj = JSON.parse(localStorage.getItem('departList'))
  dialogList.roleList = objTransArrayObj('role', roleObj)
  dialogList.deptList = objTransArrayObj('dept', departObj)
}

const showVisible = (data) => {
  dialogVisible.value = true
  uid.value = data?.uid
  if (data?.uid) {
    console.log('data', data)
    let { uid, ...obj } = data
    for (let key in obj) {
      dialogForm[key] = obj[key]
    }
  } else {
    //点击修改后，再点击添加要将数据置空
    for (let key in dialogForm) {
      dialogForm[key] = ''
    }
  }
}
const cancelBtn = () => {
  dialogVisible.value = false
}
//确定后添加用户
const confirmBtn = () => {
  if (!uid.value) {
    let data = {
      ...dialogForm
    }
    userStore.addUsers(data)
    emit('add', dialogForm)
  } else {
    let data = {
      uid: uid.value,
      ...dialogForm
    }
    userStore.updateUsers(data)
    emit('add', dialogForm)
  }
  dialogVisible.value = false
  dialogRef.value?.resetFields()
}
showList()
defineExpose({ showVisible })
</script>
<style>
.dialog-input {
  width: 100% !important;
}
</style>
