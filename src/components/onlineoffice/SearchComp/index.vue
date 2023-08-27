<template>
  <div class="search">
    <el-form :inline="true" :model="searchForm" :rules="ruleData" ref="formRef">
      <template v-for="(item, index) in searchConfig.searchList" :key="index">
        <el-form-item :prop="item.prop">
          <template v-if="item.type === 'input'">
            <el-input
              v-model="searchForm[item.prop]"
              :placeholder="item.placeholder"
              :class="item.class"
              clearable
            />
          </template>
          <template v-if="item.type === 'datepick'">
            <el-date-picker
              v-model="searchForm[item.prop]"
              :type="item.datetype"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </template>
          <template v-if="item.type === 'selected' && item.customOption">
            <el-select
              v-model="searchForm[item.prop]"
              class="input"
              :placeholder="item.placeholder"
              clearable
            >
              <template v-if="item.prop === 'department'">
                <el-option
                  v-for="one in options.departmentList"
                  :label="one.deptName"
                  :value="one.id"
                />
              </template>
              <template v-if="item.prop === 'type'">
                <el-option v-for="one in options.penaltyType" :label="one.name" :value="one.id" />
              </template>
            </el-select>
          </template>
          <template v-if="item.type === 'selected' && !item.customOption">
            <el-select
              v-model="searchForm[item.prop]"
              class="input"
              :placeholder="item.placeholder"
              clearable
            >
              <template v-for="(option, index) in item.options" :key="index">
                <el-option :label="option.label" :value="option.value" />
              </template>
            </el-select>
          </template>
        </el-form-item>
      </template>
      <el-form-item>
        <el-button
          type="primary"
          @click="searchHandle()"
          v-if="
            searchConfig.pageName === 'penalty' ||
            searchConfig.pageName === 'penalty/type' ||
            searchConfig.pageName === 'reimburse'
          "
          >查询</el-button
        >
        <el-button
          type="primary"
          @click="addHandle()"
          v-if="
            searchConfig.pageName === 'penalty' ||
            searchConfig.pageName === 'penalty/type' ||
            searchConfig.pageName === 'reimburse'
          "
        >
          新增
        </el-button>

        <el-button
          type="danger"
          @click="deleteHandle()"
          v-if="searchConfig.pageName === 'penalty' || searchConfig.pageName === 'penalty/type'"
        >
          批量删除
        </el-button>
        <el-button
          type="warning"
          @click="reportHandle()"
          v-if="searchConfig.pageName === 'penalty'"
        >
          查看报告
        </el-button>
        <el-button
          type="warning"
          @click="searchHandle()"
          v-if="searchConfig.pageName === 'paychart'"
        >
          生成报表
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'
import usePenaltyStore from '@/stores/onlineoffice/penaltyfine/index.ts'
import useUserStore from '@/stores/system/user/index.ts'
import { objTransArrayObj } from '@/utils/translate.ts'
interface IProps {
  searchConfig: {
    pageName: string
    searchList: any[]
  }
}
const penaltyStore = usePenaltyStore()
const userStore = useUserStore()
const { penaltyType } = storeToRefs(penaltyStore)
const props = defineProps<IProps>()
const emits = defineEmits(['searchInfo', 'addNewData', 'deleteData'])
const router = useRouter()
const initForm = {}
const rulesForm = {}
props.searchConfig.searchList.forEach((item) => {
  initForm[item.prop] = ''
})
props.searchConfig.searchList.forEach((item) => {
  rulesForm[item.prop] = item.rules
})
const searchForm = reactive(initForm)
const ruleData = reactive(rulesForm)
const options = reactive({
  penaltyType: [],
  departmentList: []
})
const formRef = ref()
const getTypeList = () => {
  penaltyStore.getPenaltyType()
  options.penaltyType = penaltyType.value
}
//获取部门列表
const getDeptmentList = () => {
  userStore.getDeptList()
  let deptObj = JSON.parse(localStorage.getItem('departList'))
  //封装后端返回的对象数据
  options.departmentList = objTransArrayObj('dept', deptObj)
}
getTypeList()
getDeptmentList()
const searchHandle = () => {
  if (searchForm.date) {
    let searchInfo = {
      startDate: dayjs(searchForm.date[0]).format('YYYY-MM-DD'),
      endDate: dayjs(searchForm.date[1]).format('YYYY-MM-DD')
    }
    let { date, ...dateForm } = searchForm
    emits('searchInfo', { ...dateForm, ...searchInfo })
  } else {
    emits('searchInfo', { ...searchForm })
  }

  formRef.value?.resetFields()
}
const addHandle = () => {
  emits('addNewData')
}
const deleteHandle = () => {
  emits('deleteData')
}
const reportHandle = () => {
  router.push({ name: 'AmectReport' })
}
</script>
