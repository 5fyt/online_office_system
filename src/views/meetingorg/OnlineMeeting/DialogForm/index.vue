<template>
  <div class="dialogForm">
    <el-dialog v-model="visible" title="会议申请" width="692px" :close-on-click-modal="false">
      <el-form :model="dialogForm" :rules="rules" label-width="60px" ref="form">
        <el-form-item label="主题" prop="title">
          <el-input v-model="dialogForm.title" width="100%" clearable />
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input
            v-model="dialogForm.content"
            width="100%"
            clearable
            :row="2"
            maxlength="200"
            placeholder="请输入内容"
            resize="none"
          />
        </el-form-item>
        <el-form-item label="日期" prop="date">
          <el-date-picker
            v-model="dialogForm.date"
            type="date"
            placeholder="选择日期"
            style="width: 34.5%"
            :disabledDate="disabledDate"
            clearable="clearable"
          ></el-date-picker>
          <span class="note">会议日期只能是当前或者未来的日期，不能是以往的日期</span>
        </el-form-item>
        <el-form-item label="时间">
          <el-row :span="11">
            <el-time-select
              v-model="dialogForm.start"
              class="mr-4"
              placeholder="起始时间"
              start="08:30"
              step="00:30"
              end="18:30"
              style="width: 96%"
              clearable
            />
          </el-row>
          <el-row :span="2" class="black"></el-row>
          <el-row :span="11">
            <el-time-select
              v-model="dialogForm.end"
              style="width: 96%"
              placeholder="结束时间"
              start="08:30"
              step="00:30"
              end="18:30"
              clearable
            />
          </el-row>
          <span class="note">注意会议时间范围</span>
        </el-form-item>

        <el-form-item label="成员" prop="participants">
          <el-transfer
            v-model="dialogForm.participants"
            :data="options.members"
            :titles="['员工', '参会人']"
            filterable
            filter-placeholder="请输入姓名"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="visible = false">取消</el-button>
          <el-button type="primary" @click="confirmBtn">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import dayjs from 'dayjs'
import useOfflineStore from '@/stores/meetingorg/offlinemeeting/index.ts'
const emits = defineEmits(['confirm'])
const offlineStore = useOfflineStore()
const { memberNames } = storeToRefs(offlineStore)
const visible = ref<boolean>(false)
const form = ref()
const options = reactive({
  members: []
})
const dialogForm = reactive({
  title: '',
  date: '',
  content: '',
  start: '',
  end: '',

  participants: []
})

const rules = reactive({
  title: [
    { required: true, pattern: '^[a-zA-Z0-9\u4e00-\u9fa5]{2,30}$', message: '会议主题格式错误' }
  ],
  content: [{ required: true, message: '会议内容为必填' }],
  date: [{ required: true, message: '日期为必填' }],
  start: [{ required: true, message: '起始时间为必填' }],
  end: [{ required: true, message: '结束时间为必填' }],
  room: [{ required: true, message: '选择一个会议室' }],
  participants: [
    { required: true, trigger: 'blur', message: '必须设置参会人' },
    { required: false, trigger: 'change', message: '必须设置参会人' }
  ]
})

const roomName = () => {
  offlineStore.getMemberNames()
  options.members = memberNames.value
}
roomName()

const disabledDate = (time: Date) => {
  let timeHour = new Date()
  timeHour.setHours(0, 0, 0, 0)
  return time.getTime() < timeHour.getTime()
}

//添加会议
const confirmBtn = () => {
  let data = {
    date: dayjs(dialogForm.date).format('YYYY-MM-DD'),
    type: '线上会议'
  }
  offlineStore.addMeetings({ ...dialogForm, ...data })
  visible.value = false
  form.value?.resetFields()
  dialogForm.start = ''
  dialogForm.end = ''
  emits('confirm')
}
const show = () => {
  visible.value = true
}

defineExpose({ show })
</script>
