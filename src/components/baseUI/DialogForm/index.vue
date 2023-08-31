<template>
  <div class="dialog">
    <el-dialog
      v-model="dialogVisible"
      :title="id ? dialogConfig.header.editTitle : dialogConfig.header.addTitle"
      :width="dialogConfig.width"
    >
      <el-form
        ref="dialogRef"
        :model="dialogForm"
        :rules="dialogRules"
        status-icon
        label-width="80px"
      >
        <template v-for="(item, index) in dialogConfig.dialogList" :key="index">
          <el-form-item :label="item.label" :prop="item.prop">
            <template v-if="item.type === 'input'">
              <el-input v-model="dialogForm[item.prop]" clearable :style="{ width: item.width }" />
              <span class="note">{{ item.description }}</span>
            </template>
            <template v-if="item.type === 'selected'">
              <el-select v-model="dialogForm[item.prop]" clearable>
                <template v-for="(option, index) in item.options" :key="index">
                  <el-option :label="option.label" :value="option.value" />
                </template>
              </el-select>
            </template>

            <template v-if="item.type === 'date'">
              <el-date-picker
                v-model="dialogForm.hireDate"
                type="date"
                :laceholder="item.placeholder"
                :editable="false"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
              />
            </template>
            <!-- 穿梭框只有角色才有 -->
            <template v-if="item.type === 'transfer'">
              <el-transfer
                v-model="dialogForm[item.prop]"
                :data="transferData.permissionList"
                filterable
                :titles="item.titles"
                :filter-placeholder="item.placeholder"
              ></el-transfer>
            </template>
            <template v-if="item.type === 'other'">
              <el-select
                v-model="dialogForm[item.prop]"
                :placeholder="item.placeholder"
                class="dialog-input"
                clearable
              >
                <template v-if="item.prop === 'role'">
                  <el-option
                    v-for="(role, index) in dialogList.roleList"
                    :key="index"
                    :label="role.roleName"
                    :value="role.roleName"
                  />
                </template>
                <template v-if="item.prop === 'department'">
                  <el-option
                    v-for="(dept, index) in dialogList.deptList"
                    :key="index"
                    :label="dept.deptName"
                    :value="dept.deptName"
                  />
                </template>
              </el-select>
            </template>
          </el-form-item>
        </template>
        <!-- 密码框只有用户新增才有 -->
        <template v-if="!id && dialogConfig.pageName === 'user'">
          <el-form-item label="密码" prop="password">
            <el-input v-model="dialogForm.password" clearable show-password />
          </el-form-item>
        </template>
        <!-- 会议室的修改的状态 -->
        <template v-if="id && dialogConfig.pageName === 'meeting-room'">
          <el-form-item label="状态">
            <el-select v-model="dialogForm.status" clearable>
              <el-option label="可使用" :value="1" />
              <el-option label="已停用" :value="2" />
            </el-select>
          </el-form-item>
        </template>
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
import useUserStore from '@/stores/system/user/index.ts'
import { storeToRefs } from 'pinia'
const userStore = useUserStore()
const dialogRef = ref<FormInstance>()
const emit = defineEmits(['add'])
const props = defineProps({
  dialogConfig: {
    required: true
  }
})
const dialogVisible = ref(false)
const id = ref('')

interface DialogListType {
  roleList: any[]
  deptList: any[]
}
//下拉框的数据绑定
const dialogList = reactive<DialogListType>({
  roleList: [],
  deptList: []
})
//穿梭框数据绑定
const transferData = reactive({
  permissions: [],
  permissionList: []
})
//根据dialogCofig.dialogList 里面配置的prop来动态绑定值
let initForm = {}
for (let item of props.dialogConfig.dialogList) {
  initForm[item.prop] = item.prop === 'permissions' ? [] : ''
}
const dialogForm = reactive(initForm)

//根据配置的dialog里面的rule来实现双向绑定
const initRule = {}
const otherRule = {
  password: [
    { required: true, message: '密码不能为空' },
    { pattern: '^[a-zA-Z0-9]{6,20}$', message: '密码格式错误' }
  ]
}
for (let item of props.dialogConfig.dialogList) {
  initRule[item.prop] = item.rules
}
const dialogRules = reactive({ ...initRule, ...otherRule })

//展示部门和角色列表
const showList = () => {
  userStore.getDeptList()
  let roleObj = JSON.parse(localStorage.getItem('roleList'))
  let departObj = JSON.parse(localStorage.getItem('departList'))
  dialogList.roleList = objTransArrayObj('role', roleObj)
  dialogList.deptList = objTransArrayObj('dept', departObj)
}
//获取角色列表
const showPermissionList = () => {
  userStore.getRolePermissions()
  let permissions = JSON.parse(localStorage.getItem('rolePermissions'))
  transferData.permissionList = objTransArrayObj('permission', permissions)
}
//回显数据点击修改，点击添加置空
const showVisible = (data) => {
  dialogRef.value?.clearValidate()
  dialogVisible.value = true
  id.value = data?.id
  if (data?.id) {
    let { id, ...obj } = data
    for (let key in obj) {
      dialogForm[key] = obj[key]
    }
  } else {
    //修改后，再点击添加要将数据置空,这里permissions也要变成[]
    for (let key in dialogForm) {
      dialogForm[key] = key === 'permissions' ? [] : ''
    }
  }
}

const cancelBtn = () => {
  dialogVisible.value = false
}

//确定后添加用户
const confirmBtn = () => {
  if (!id.value) {
    let data = {
      ...dialogForm
    }

    userStore.addUsers(props.dialogConfig.pageName, data)
    emit('add', dialogForm)
  } else {
    if (props.dialogConfig.pageName === 'role') {
      const { permissionCount, staffCount, systemic, ...otherInfo } = dialogForm
      let data = {
        id: id.value,
        ...otherInfo
      }
      userStore.updateUsers(props.dialogConfig.pageName, data)
    } else {
      let data = {
        id: id.value,
        ...dialogForm
      }
      userStore.updateUsers(props.dialogConfig.pageName, data)
    }

    emit('add', dialogForm)
  }
  dialogVisible.value = false
  dialogRef.value?.resetFields()
}
showList()
showPermissionList()
defineExpose({ showVisible })
</script>
<style>
.dialog-input {
  width: 100% !important;
}
</style>
