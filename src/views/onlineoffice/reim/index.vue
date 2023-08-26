<template>
  <SearchComp
    :searchConfig="searchConfig"
    @searchInfo="searchInfo"
    @addNewData="addNewData"
  ></SearchComp>
  <TableComp
    :contentConfig="contentConfig"
    ref="tableRef"
    @edit="editHandle"
    @show="show"
    @expand="expand"
  >
    <template #total="scope">
      <span>{{ scope.row[scope.prop] }}元</span>
    </template>
    <template #debit="scope">
      <span>{{ scope.row[scope.prop] }}元</span>
    </template>
    <template #balance="scope">
      <span>{{ scope.row[scope.prop] }}元</span>
    </template>
    <template #reim="scope">
      <div class="reim-table">
        <div class="row">
          <div class="title">序号</div>
          <div class="title">类别</div>
          <div class="title">报销项目</div>
          <div class="title">备注信息</div>
          <div class="title">金额</div>
        </div>
        <div class="row" v-for="(one, index) in reimFormInfo.content">
          <div class="col">{{ index + 1 }}</div>
          <div class="col">{{ one.type }}</div>
          <div class="col">{{ one.title }}</div>
          <div class="col">{{ one.description }}</div>
          <div class="col">￥{{ one.money }}</div>
        </div>
      </div>
    </template>
  </TableComp>
  <DialogComp ref="dialogRef" @confirm="confirm"></DialogComp>
  <ReimForm ref="reimRef"></ReimForm>
</template>
<script setup lang="ts">
import SearchComp from '@/components/onlineoffice/SearchComp/index.vue'
import TableComp from '@/components/onlineoffice/TableComp/index.vue'
import DialogComp from './DialogComp/index.vue'
import ReimForm from './ReimForm/index.vue'
import searchConfig from '../reim/constants/searchConfig.ts'
import contentConfig from '../reim/constants/contentConfig.ts'

import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import useReimStore from '@/stores/onlineoffice/Reim/index.ts'
const tableRef = ref()
const dialogRef = ref()
const reimRef = ref()
const reimFormInfo = ref(null)
const reimStore = useReimStore()
const { reimForm } = storeToRefs(reimStore)
const searchInfo = (searchForm) => {
  tableRef.value?.loadList(searchForm)
}
const expand = (row) => {
  reimStore.getReimInfo(row.id)
  reimFormInfo.value = reimForm.value
}
const addNewData = () => {
  dialogRef.value?.show()
}
const editHandle = (row) => {
  dialogRef.value?.show(row)
}
const confirm = () => {
  tableRef.value?.loadList()
}
const show = (id) => {
  reimRef.value.showPdf(id)
}
const deleteData = () => {
  tableRef.value?.deleteHandle()
}
</script>
<style scope lang="less">
.desc {
  margin-left: 10px;
}
.reim-table {
  display: table;
  border: solid 1px #ebeef5;
  margin:15px;
  border-spacing: 0;
  border-collapse: collapse;
  width: 100%;

  .row {
    display: table-row;
    border: solid 1px #ebeef5 !important;
  }
  .col {
    display: table-cell;
    text-align: center;
    border: solid 1px #ebeef5 !important;
    line-height: 44px;
    font-size: 14px;
  }
  .title {
    .col;
    font-weight: bold;
    color: #909399;
  }
}
</style>
