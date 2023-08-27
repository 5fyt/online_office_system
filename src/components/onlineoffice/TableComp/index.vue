<template>
  <div class="table">
    <el-table
      ref="tableRef"
      :data="tableData.dataList"
      style="width: 100%"
      border
      @selection-change="handleSelectionChange"
      @expand-change="expandChange"
    >
      <template v-for="(item, index) in contentConfig.contentList" :key="index">
        <template v-if="item.type === 'selection'">
          <el-table-column type="selection" width="50" :selectable="selectable" />
        </template>
        <template v-if="item.type === 'index'">
          <el-table-column
            :type="item.type"
            :label="item.label"
            :width="item.width"
            header-align="center"
            align="center"
          >
            <template #default="scope">
              <span>{{ (tableData.pageIndex - 1) * tableData.pageSize + scope.$index + 1 }}</span>
              <!-- 获得index scope.$index -->
            </template>
          </el-table-column>
        </template>
        <template v-if="item.type === 'expand'">
          <el-table-column
            :width="item.width"
            :prop="item.prop"
            header-align="center"
            align="center"
            type="expand"
          >
            <template #default="scope">
              <div class="desc">{{ item.desc }}{{ scope.row[item.prop] }}</div>
            </template>
          </el-table-column>
        </template>
        <template v-if="item.type === 'expandCustom'">
          <el-table-column :width="item.width" header-align="center" align="center" type="expand">
            <template #default="scope">
              <slot :name="item.slotName" v-bind="scope"></slot>
            </template>
          </el-table-column>
        </template>
        <template v-if="item.type === 'custom'">
          <el-table-column
            :prop="item.prop"
            :label="item.label"
            header-align="center"
            align="center"
            :min-width="item.minWidth"
          >
            <template #default="scope">
              <slot :name="item.slotName" v-bind="scope" :prop="item.prop"></slot>
            </template>
          </el-table-column>
        </template>
        <template v-if="item.type === 'handler'">
          <el-table-column
            :label="item.label"
            header-align="center"
            align="center"
            :min-width="item.minWidth"
          >
            <template #default="scope">
              <el-button type="primary" text @click="editHandle(scope.row)" v-if="!item.buttonShow"
                >修改</el-button
              >
              <el-button type="primary" v-if="item.btnShow" text @click="dismissHandle(scope.row)"
                >交款</el-button
              >
              <el-button type="primary" v-if="item.buttonShow" text @click="pdfHandle(scope.row.id)"
                >报销单</el-button
              >
              <el-button
                type="danger"
                text
                @click="deleteHandle(scope.row.id)"
                :disabled="scope.row.canDelete === false || scope.row.status === '已通过'"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </template>
        <template v-if="item.type === 'normal'">
          <el-table-column
            :prop="item.prop"
            :label="item.label"
            header-align="center"
            align="center"
            :min-width="item.minWidth"
          />
        </template>
      </template>
    </el-table>
    <div class="pagination">
      <el-pagination
        v-model:current-page="tableData.pageIndex"
        v-model:page-size="tableData.pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.totalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'

import usePenaltyStore from '@/stores/onlineoffice/penaltyfine/index.ts'
interface IProps {
  contentConfig: {
    pageName: string
    contentList: any
  }
}
interface tableType {
  dataList: any[]
  pageIndex: number
  pageSize: number
  totalCount: number
}
const props = defineProps<IProps>()
const emits = defineEmits(['edit', 'show', 'expand'])
const penaltyStore = usePenaltyStore()
const { total, tableList } = storeToRefs(penaltyStore)
//用户表格里的数据
const tableData = reactive<tableType>({
  dataList: [],
  pageIndex: 1, //当前页
  pageSize: 10,
  totalCount: 0
})
const deleteId = ref<number[]>([])
const loadList = (searchForm) => {
  let data = {
    page: tableData.pageIndex,
    size: tableData.pageSize
  }
  if (searchForm) {
    data = { ...data, ...searchForm }
  }
  penaltyStore.getDataList(props.contentConfig.pageName, data)
  tableData.totalCount = total.value
  tableData.dataList = tableList.value
}
loadList()
const editHandle = (row) => {
  emits('edit', row)
}
const handleSelectionChange = (value) => {
  deleteId.value = value
}
const expandChange = (row) => {
  emits('expand', row)
}
//交款，以后再写
const dismissHandle = () => {}
const pdfHandle = (id) => {
  emits('show', id)
}
const deleteHandle = (id) => {
  //拿到一条或者多条id标识
  let ids = id ? [id] : deleteId.value.map((item) => item.id)
  if (!ids.length) {
    ElMessage({
      message: '未选中需要删除的用户',
      type: 'warning'
    })
  } else {
    ElMessageBox.confirm('确定要删除选中记录', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        let data = {
          ids: ids
        }
        penaltyStore.deleteDatas(props.contentConfig.pageName, data)
        loadList()
      })
      .catch(() => {
        ElMessage({
          type: 'error',
          message: '取消删除'
        })
      })
  }
}
const selectable = (row, index) => {
  if (row?.canDelete === false) {
    return false
  }
}

//当前页数发生变化时
const handleSizeChange = (value) => {
  tableData.pageSize = value
  loadList()
}
//当前页发生变化时
const handleCurrentChange = (value) => {
  tableData.pageIndex = value
  loadList()
}
defineExpose({ loadList, deleteHandle })
</script>
<style scope lang="less">
.pagination {
  float: right;
}
.desc {
  margin: 15px 80px;
  padding-left: 54px;
}
</style>
