<template>
  <el-dialog
    :title="!uid ? dialogConfig.header.addTitle : dialogConfig.header.editTitle"
    :close-on-click-modal="false"
    v-model="visible"
    width="720px"
  >
    <el-form
      :model="dialogForm"
      ref="formRef"
      :rules="ruleData"
      :label-width="dialogConfig.labelWidth"
    >
      <template v-for="(item, index) in dialogConfig.dialogList" :key="index">
        <el-form-item
          :label="item.label"
          :prop="item.prop"
          v-if="item.type === 'transfer' ? false : true"
        >
          <template v-if="item.type === 'input'">
            <el-input
              v-model="dialogForm[item.prop]"
              :style="{ width: item.width }"
              :placeholder="item.placeholder"
              clearable
            />
            <span class="desc">{{ item.desc }}</span>
          </template>
          <template v-if="item.type === 'select'">
            <el-select
              v-model="dialogForm[item.prop]"
              class="input"
              :style="{ width: item.width }"
              :placeholder="item.placeholder"
              clearable
            >
              <template v-if="item.customOption">
                <el-option v-for="one in options.penaltyType" :label="one.name" :value="one.id" />
              </template>
              <template v-else>
                <template v-for="(one, index) in item.options" :key="index">
                  <el-option :label="one.label" :value="one.id" />
                </template>
              </template>
            </el-select>
            <span class="desc">{{ item.desc }}</span>
          </template>

          <template v-if="item.type === 'textarea'">
            <el-input
              type="textarea"
              :rows="2"
              :placeholder="item.placeholder"
              v-model="dialogForm[item.prop]"
              resize="none"
              :maxlength="item.maxLength"
              show-word-limit
              clearable
            />
          </template>
        </el-form-item>

        <template v-if="item.type === 'transfer'">
          <el-form-item :label="item.label" :prop="item.prop" v-if="uid == 0">
            <el-transfer
              v-model="dialogForm[item.prop]"
              :data="options.users"
              :titles="item.titles"
              filterable
              :filter-placeholder="item.placeholder"
            />
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
  initForm[item.prop] = item.prop === 'members' ? [] : ''
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
const uid = ref(0)
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
const show = (row) => {
  uid.value = row?.id
  if (row?.id) {
    let { type, reason, money } = row
    let arr = options.penaltyType.filter((item) => item.name === type)
    if (arr.length > 0) {
      dialogForm.type = arr[0].id
    }
    dialogForm.reason = reason
    dialogForm.money = money
  } else {
    for (let key in dialogForm) {
      dialogForm[key] = key === 'members' ? [] : ''
      uid.value = 0
    }
  }
  visible.value = true
}
const submit = () => {
  if (uid.value) {
    let { members, ...info } = dialogForm
    let data = {
      id: uid.value,
      ...info
    }
    penaltyStore.updateDatas(props.dialogConfig.pageName, data)
  } else {
    let data = { ...dialogForm }
    penaltyStore.addDatas(props.dialogConfig.pageName, data)
  }
  visible.value = false
  emits('confirm')
  formRef.value?.clearValidate()
}

defineExpose({ show, submit })
</script>
