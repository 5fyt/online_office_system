<template>
  <div class="table">
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      cell-style="padding: 4px 0"
      style="width: 100%"
    >
      <el-table-column
        type="selection"
        :selectable="selectable"
        header-align="center"
        align="center"
        width="50"
      />
      <el-table-column
        width="40px"
        prop="reason"
        header-align="center"
        align="center"
        type="expand"
      >
        <template #default="scope"> 罚款原因：{{ scope.row.reason }} </template>
      </el-table-column>
      <el-table-column type="index" header-align="center" align="center" width="100" label="序号">
        <template #default="scope">
          <span>{{ (pageIndex - 1) * pageSize + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="type" header-align="center" align="center" label="罚款类型" />
      <el-table-column prop="name" header-align="center" align="center" label="当事人" />
      <el-table-column prop="deptName" header-align="center" align="center" label="所属部门" />
      <el-table-column header-align="center" align="center" label="罚款金额">
        <template #default="scope">
          <span>{{ scope.row.amount }}元</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" header-align="center" align="center" label="状态" />
      <el-table-column prop="createTime" header-align="center" align="center" label="日期时间" />
      <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
        <template #default="scope">
          <el-button
            type="text"

            :disabled="!(isAuth(['ROOT', 'AMECT:UPDATE']) && scope.row.status != '已缴纳')"
            @click="updateHandle(scope.row.id)"
          >
            修改
          </el-button>
          <el-button
            type="text"

            :disabled="!(isAuth(['ROOT', 'AMECT:DELETE']) && scope.row.status != '已缴纳')"
            @click="deleteHandle(scope.row.id)"
          >
            删除
          </el-button>
          <el-button
            type="text"

            :disabled="!(scope.row.mine == 'true' && scope.row.status == '未缴纳')"
            @click="payHandle(scope.row.id)"
          >
            交款
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50]"
      :page-size="pageSize"
      :total="totalCount"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
  </div>
</template>
