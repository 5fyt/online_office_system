<template>
  <el-dialog title="请假申请" :close-on-click-modal="false" v-model="visible" width="450px">
    <el-form
      :model="dialogForm"
      ref="formRef"
      :rules="ruleData"
      :label-width="dialogConfig.labelWidth"
    >
      <template v-for="(item, index) in dialogConfig.dialogList" :key="index">
        <template v-if="item.type !== 'time'">
          <el-form-item :label="item.label" :prop="item.prop">
            <template v-if="item.type === 'textarea'">
              <el-input
                type="textarea"
                :rows="2"
                :placeholder="item.placeholder"
                v-model="dialogForm[item.prop]"
                resize="none"
                :autosize="{ minRows: 4, maxRows: 6 }"
                show-word-limit
                clearable
              />
            </template>
            <template v-if="item.type === 'radio'">
              <el-radio-group v-model="dialogForm[item.prop]">
                <el-radio label="1">病假</el-radio>
                <el-radio label="2">事假</el-radio>
              </el-radio-group>
            </template>
          </el-form-item>
        </template>
        <template v-if="item.type === 'time'">
          <el-form-item :prop="item.prop" :label="item.label">
            <template v-if="item.timeType === 'date'">
              <el-date-picker
                :placeholder="item.placeholder"
                v-model="dialogForm[item.prop]"
                value-format="YYYY-MM-DD"
                type="date"
                style="width: 100%"
                :disabledDate="disabledDate"
                clearable
              ></el-date-picker>
            </template>
            <template v-if="item.timeType === 'timeSelect'">
              <el-time-select
                v-model="dialogForm[item.prop]"
                :start="item.start"
                :step="item.step"
                :end="item.end"
                value-format="HH:mm"
                :placeholder="item.placeholder"
                style="width: 100%"
              ></el-time-select>
            </template>
          </el-form-item>
        </template>
      </template>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import dayjs from 'dayjs'
import useOfflineStore from '@/stores/meetingorg/offlinemeeting/index.ts'
import usePenaltyStore from '@/stores/onlineoffice/penaltyfine/index.ts'
interface IProps {
  dialogConfig: {
    pageName: string
    labelWidth: string
    dialogList: any[]
  }
}
const props = defineProps<IProps>()
const emits = defineEmits(['confirm'])
const penaltyStore = usePenaltyStore()
const offlineStore = useOfflineStore()
const { memberNames } = storeToRefs(offlineStore)
const { penaltyType } = storeToRefs(penaltyStore)
const initForm = {}
const rulesForm = {}
props.dialogConfig.dialogList.forEach((item) => {
  initForm[item.prop] = item.prop === 'type' ? '1' : ''
})
props.dialogConfig.dialogList.forEach((item) => {
  rulesForm[item.prop] = item.rules
})
const dialogForm = reactive(initForm)
const ruleData = reactive(rulesForm)
const options = reactive({
  penaltyType: [],
  users: []
})
const formRef = ref()

const visible = ref(false)
const getTypeList = () => {
  penaltyStore.getPenaltyType()
  options.penaltyType = penaltyType.value
}
const getMembers = () => {
  offlineStore.getMemberNames()
  options.users = memberNames.value
}
getTypeList()
getMembers()
const disabledDate = (date) => {
  return dayjs(date.toLocaleDateString()).isBefore(new Date().toLocaleDateString())
}
const show = (row) => {
  formRef.value?.clearValidate()
  for (let key in dialogForm) {
    dialogForm[key] = key === 'type' ? '1' : ''
  }
  visible.value = true
}

const submit = () => {
  const { reason, type, startDate, endDate, startTime, endTime } = dialogForm
  let data = {
    reason: reason,
    type: type === 1 ? '病假' : '事假',
    start: startDate + ' ' + startTime,
    end: endDate + ' ' + endTime
  }
  penaltyStore.addDatas(props.dialogConfig.pageName, data)
  visible.value = false
  emits('confirm')
  formRef.value?.clearValidate()
}

defineExpose({ show, submit })
</script>
