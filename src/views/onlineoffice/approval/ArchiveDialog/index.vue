<template>
  <el-dialog
    title="执行归档"
    width="500px"
    :close-on-click-modal="false"
    v-model="visible"
    :show-close="false"
  >
    <el-upload
      ref="upload"
      :action="archiveData.action"
      :data="data"
      list-type="picture-card"
      :headers="archiveData.header"
      :before-upload="beforeUploadHandle"
      :on-success="successHandle"
    >
      <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="archiveHandle" :disabled="disabled">{{ btn }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import useApprovalStore from '@/stores/onlineoffice/approval/index.ts'
const approvalStore = useApprovalStore()
const emits = defineEmits(['searchInfo'])
const upload = ref(null)
const data = ref({})
const id = ref(null)
const visible = ref(false)
const disabled = ref(false)
const type = ref('')
const btn = ref('确定')
const baseUrl = 'http://localhost:9002'
const archiveData = reactive({
  action: `${baseUrl}/approval/upload`,
  header: {
    token: localStorage.getItem('token')
  },
  paths: []
})
const show = (value) => {
  if (value) {
    type.value = value.type
    id.value = value.id
  }
  visible.value = true
  disabled.value = false
  btn.value = '执行归档'
  archiveData.paths = []
  upload.value?.clearFiles()
}
const beforeUploadHandle = (rawFile) => {
  data.value['file'] = rawFile
  data.value['type'] = type.value
  data.value['id'] = id.value
  if (rawFile.type == 'image/gif' || rawFile.type == 'image/webp') {
    ElMessage.error('不支持该图片文件格式')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('图片文件不能超过2M')
    return false
  }
  return true
}
const successHandle = (response) => {
  const { path, code } = response
  if (code == 200) {
    archiveData.paths.push(path)
    console.log(archiveData.paths)
  } else {
    ElMessage.error('图片上传失败')
  }
}

const cancel = () => {
  visible.value = false
  upload.value?.clearFiles()
}
const archiveHandle = () => {
  disabled.value = true
  btn.value = '正在归档'
  if (archiveData.paths.length === 0) {
    ElMessage({
      message: '未上传照片',
      type: 'error'
    })
    return
  }
  let data = {
    id: id.value,
    paths: archiveData.paths,
    type: type.value
  }
  approvalStore.archiveImage(data)
  emits('searchInfo')
  visible.value = false
}
defineExpose({ show })
</script>
