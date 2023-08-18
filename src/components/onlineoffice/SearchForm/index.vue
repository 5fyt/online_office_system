<template>
  <div class="search">
    <el-form :inline="true" :model="searchForm" :rules="ruleData" ref="formRef">
      <template v-for="(item, index) in searchConfig.searchList" :key="index">
        <el-form-item :prop="item.prop">
          <template v-if="item.type === 'input'">
            <el-input
              v-model="searchForm[item.prop]"
              :placeholder="item.placeholder"
              class="input"
              clearable
            />
          </template>
          <template v-if="item.type === 'datepick'">
            <el-date-picker
              v-model="searchForm[item.prop]"
              :type="item.datepick"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </template>
          <template v-if="item.type === 'select'">
            <el-select
              v-model="searchForm[item.prop]"
              class="input"
              :placeholder="item.placeholder"
              clearable
            >
              <template v-if="customOption">
                <el-option
                  v-for="one in options.departmentList"
                  :label="one.deptName"
                  :value="one.id"
                />
              </template>
              <template v-else-if="customOption">
                <el-option
                  v-for="one in options.penalty"
                  :label="one.name"
                  :value="one.id"
                />
              </template>
              <template v-else>
                <el-option v-for="one in item.options" :label="one.label" :value="one.id" />
              </template>
            </el-select>
          </template>
          <template v-if="item.type === 'handle'">
            <el-button type="primary" @click="searchHandle()">查询</el-button>
            <el-button type="primary" v-if="!isAuth(['root', 'amect:insert'])" @click="addHandle()">
              新增
            </el-button>
            <el-button
              type="danger"
              v-if="!isAuth(['root', 'amect:delete'])"
              @click="deleteHandle()"
            >
              批量删除
            </el-button>
            <el-button
              type="warning"
              v-if="!isAuth(['root', 'amect:select']) && searchConfig.pageName === 'penalty'"
              @click="reportHandle()"
            >
              查看报告
            </el-button>
          </template>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
interface IProps {
  pageName: string
  searchList: any[]
}
const props = defineProps<IProps>()
const initForm = {}
const rulesForm = {}
props.searchList.forEach((item) => {
  initForm[item.prop] = item.prop
})
props.searchList.forEach((item) => {
  rulesForm[item.prop] = item.rules
})
const searchForm = reactive(initForm)
const ruleData = reactive(rulesForm)
const options = reactive({
  penaltyType: [],
  departmentList: []
})
const formRef = ref()
</script>
