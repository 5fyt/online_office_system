<template>
  <el-dialog
    :title="!uid ? dialogConfig.header.addTitle : dialogConfig.header.editTitle"
    :close-on-click-modal="false"
    v-model="visible"
    width="692px"
  >
    <el-form
      :model="dialogForm"
      ref="formRef"
      :rules="ruleData"
      :label-width="dialogConfig.labelWidth"
    >
      <template v-for="(item, index) in dialogConfig.dialogList" :key="index">
        <el-form-item :label="item.label" :prop="item.prop">
          <template v-if="item.type === 'input'">
            <el-input
              v-model="dialogForm[item.prop]"
              style="width: 40%"
              :placeholder="item.placeholder"
              clearable
            />
          </template>
          <template v-if="item.type === 'select'">
            <el-select
              v-model="dialogForm[item.prop]"
              class="input"
              :placeholder="item.placeholder"
              clearable
            >
              <template v-if="customOption">
                <el-option v-for="one in options.penaltyType" :label="one.name" :value="one.id" />
              </template>
              <template v-else>
                <el-option v-for="one in item.options" :label="one.label" :value="one.id" />
              </template>
            </el-select>
          </template>
          <template v-if="item.type === 'tranfer'">
            <el-form-item label="成员" prop="members" v-if="uid == 0">
              <el-transfer
                v-model="dialogForm[item.prop]"
                :data="options.users"
                :titles="item.titles"
                filterable
                :filter-placeholder="item.placeholder"
              />
            </el-form-item>
            -->
          </template>
          <template v-if="item.type === 'textarea'">
            <el-input
              type="textarea"
              :rows="2"
              :placeholder="item.placeholder"
              v-model="dialogForm[item.prop]"
              resize="none"
              :maxlength="maxLength"
              show-word-limit
              clearable
            />
          </template>
        </el-form-item>
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
interface IProps {
  pageName: string
  labelWidth: string
  dialogList: any[]
}
const props = defineProps<IProps>()
const initForm = {}
const rulesForm = {}
props.dialogList.forEach((item) => {
  initForm[item.prop] = item.prop
})
props.dialogList.forEach((item) => {
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
const submit = () => {}
</script>
