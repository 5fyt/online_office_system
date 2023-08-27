<template>
  <el-dialog
    title="报销申请"
    :close-on-click-modal="false"
    v-model="visible"
    width="550px"
    :before-close="cancel"
  >
    <el-scrollbar height="470px">
      <el-form :model="dialogForm" ref="formRef" :rules="ruleData" label-width="100px">
        <el-form-item label="报销种类">
          <el-radio-group v-model="dialogForm.type">
            <el-radio-button label="普通报销" />
            <el-radio-button label="差旅报销" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="借款金额" prop="debit">
          <el-input
            v-model="dialogForm.debit"
            placeholder="借款金额"
            style="width: 160px"
            clearable
          />
          <span class="note">请如实填写借款金额</span>
        </el-form-item>
        <div class="project">
          <template v-for="(item, index) in dialogForm.content">
            <h3>【 报销项目 】</h3>
            <i class="icon-delete">
              <el-icon @click="deleteProject(index)"><Delete /></el-icon>
            </i>
            <el-form-item label="项目名称" prop="title">
              <el-input v-model="item.title" style="width: 95%" maxlength="20" clearable />
            </el-form-item>
            <el-form-item label="项目类别" prop="type">
              <el-select v-model="item.type" class="input" clearable>
                <el-option label="办公用品" value="办公用品" />
                <el-option label="招待费" value="招待费" />
                <el-option label="采购费" value="采购费" />
                <el-option label="劳务费" value="劳务费" />
                <el-option label="培训费" value="培训费" />
                <el-option label="维修费" value="维修费" />
                <el-option label="办公费" value="办公费" />
                <el-option label="其他" value="其他" />
              </el-select>
              <span class="note">请选择项目报销的类别</span>
            </el-form-item>
            <el-form-item label="备注信息">
              <el-input
                v-model="item.description"
                type="textarea"
                maxlength="50"
                style="width: 95%"
                resize="none"
                show-word-limit
                clearable
              />
            </el-form-item>
            <el-form-item label="报销金额" prop="money">
              <el-input v-model="item.money" style="width: 160px" clearable />
              <span class="note">认真核对该项目的报销金额</span>
            </el-form-item>
          </template>
        </div>
      </el-form>
    </el-scrollbar>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="danger" @click="addHandle">添加项目</el-button>
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import useReimStore from '@/stores/onlineoffice/reim/index.ts'
const emits = defineEmits(['confirm'])
const reimStore = useReimStore()
const dialogForm = reactive({
  type: '普通报销',
  debit: '',
  content: [
    {
      type: '',
      title: '',
      money: '',
      description: ''
    }
  ]
})
const ruleData = reactive({
  title: [{ required: true, message: '项目名称必填', trigger: 'blur' }],
  type: [{ required: true, message: '项目类别必填', trigger: 'blur' }],
  money: [
    { required: true, message: '报销金额必填', trigger: 'blur' },
    {
      pattern: '(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)',
      message: '金额格式错误'
    }
  ],
  debit: [
    { required: true, message: '借款金额必填', trigger: 'blur' },
    {
      pattern: '(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)',
      message: '报销金额格式错误'
    }
  ]
})
const formRef = ref()
const visible = ref(false)
const show = (row) => {
  visible.value = true
}
const cancel = () => {
  clearForm()
}
const clearForm = () => {
  for (let key in dialogForm) {
    if (key === 'content') {
      dialogForm[key].forEach((item) => {
        for (let key in item) {
          item[key] = ''
        }
      })
    } else {
      dialogForm[key] = key === 'type' ? '普通报销' : ''
    }
  }
  visible.value = false
}
const submit = () => {
  formRef.value?.clearValidate()
  formRef.value?.validate((isOK) => {
    if (isOK) {
      let data = { ...dialogForm }
      reimStore.addReim(data)
      clearForm()
      emits('confirm')
    }
  })
}
const deleteProject = (id) => {
  dialogForm.content = dialogForm.content.splice(id, 1)
  ElMessage({
    message: '删除成功',
    type: 'success'
  })
}
const addHandle = () => {
  if (dialogForm.content.length > 5) {
    ElMessage({
      message: '添加项目不能超过五个',
      type: 'warning'
    })
    return
  } else {
    dialogForm.content.push({ title: '', money: '', type: '', description: '' })
    ElMessage({
      message: '添加成功',
      type: 'success'
    })
  }
}
defineExpose({ show, submit })
</script>
<style scope lang="less">
.note {
  color: #999;
  margin-left: 15px;
}
.project {
  border-top: dashed 1px #e0e0e0;
  position: relative;
}
h3 {
  text-align: center;
  margin: 20px 0;
}
.icon-delete {
  position: absolute;
  right: 20px;
  top: 20px;
  height: 24px;
  width: 24px;
  cursor: pointer;
}
</style>
