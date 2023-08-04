<template>
  <div class="system-menu-container layout-pd">
    <el-card shadow="hover">
      <div class="system-menu-search mb8">
        <el-form :model="queryForm">
          <el-row>
            <el-form-item label="状态">
              <el-select v-model="queryForm.deleted" clearable placeholder=" " size="default">
                <el-option label="启用中" :value="0"></el-option>
                <el-option label="已停用" :value="1"></el-option>
              </el-select>
            </el-form-item>

            <el-button size="default" type="primary" class="ml12" v-throttle="searchByQueryForm">
              
              查询
            </el-button>
          </el-row>
        </el-form>
      </div>
      <el-button size="default" type="warning" class="mb12" @click="onAddDrawer('add')">
        <el-icon>
          <Plus />
        </el-icon>
        添加部门
      </el-button>
      <el-table :data="tableDataList" stripe border v-loading="tableLoading" >
        <el-table-column prop="deptName" label="部门名称" />
        <el-table-column prop="deptLeaderName" label="部门负责人">
          <template #default="scope">
            <div>{{ scope.row["deptLeaderName"] ? scope.row.deptLeaderName:'--' }}</div>
            <!-- <div v-if="scope.row.deptLeaderName == null || undefined || ''">-</div>
						<div v-else>{{ scope.row.deptLeaderName }}</div> -->
          </template>
        </el-table-column>
        <el-table-column prop="deleted" label="状态">
          
          <template #default="scope">
            <div class="flex-align-center" v-if="scope.row.deleted === 0">
              <div class="status-point-green"></div>
              <div >启用中</div>
            </div>
            <div class="flex-align-center" v-else>
              <div class="status-point-red"></div>
              <div >已停用</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip header-align="center" align="center">
          <template #default="scope">
            <el-button size="small" text type="primary" @click="onEditDrawer(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="page_box">
        <el-pagination
          :page-sizes="[20]"
          background
          layout="total,sizes,prev, pager, next,jumper"
          class="msg-pagination-container"
          @size-change="handleSizeChange"
          @current-change="handleCurrentPageChange"
          :current-page="pageParams.pageNum"
          :page-size="pageParams.pageSize"
          :total="pageParams.total"
        />
      </div>
    </el-card>

    
    <editDialog ref="drawer" :employeeRow="employeeRow" @confirmFunc="subData" />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, reactive, ref, onMounted } from "vue";
import { ElTable } from "element-plus";
// import type { FormInstance, ElDrawer, ElTable, ElMessage, ElMessageBox } from 'element-plus';
import { Search, Plus } from "@element-plus/icons-vue";
import { useUserStore } from "@/stores/user";
import { getDeptListApi } from "../../../api/system/dept";
import useListPageHook from "@/hooks/listPage";

// 初始变量
const userStore = useUserStore();

// 引用弹窗组件

const editDialog = defineAsyncComponent(() => import("@/views/sysManagement/departmentManagement/editDialog.vue"));

// 状态
const queryForm = ref({
  deleted: 0,
  companyId: userStore.companyId,
});

const beanInfo = {
  deptId: null,
  deptName: "",
  deptLeaderId: null,
  deleted: 0, //记录是否有效 0-有效; 1-无效
  companyId: userStore.companyId,
};

let {
  tableLoading,
  maxHeight,
  pageParams,
  tableDataList,
  handleCurrentPageChange,
  handleSizeChange,
  resetPageToOne,
  refreshData, //刷新按钮

  drawer,
  employeeRow,
  onAddDrawer,
  onEditDrawer,
  searchByQueryForm,
  subData,
} = useListPageHook(
  getDeptListApi,

  beanInfo,
  queryForm
);
</script>
