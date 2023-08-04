<template>
  <div class="system-menu-container layout-pd">
    <el-card shadow="hover">
      <div class="system-menu-search mb8">
        <el-form :model="queryForm">
          <el-row>
            <el-form-item label="角色名称">
              <el-input v-model="queryForm.roleName" clearable size="default" placeholder=" " style="max-width: 180px">
              </el-input>
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
        新建角色
      </el-button>
      <el-table :data="tableDataList" stripe border v-loading="tableLoading" >
        <el-table-column prop="roleName" label="角色名称" />
        <el-table-column prop="description" label="备注" >
          <template #default="scope">
            {{scope.row.description?scope.row.description:'--'  }}
          </template>
        </el-table-column>
        <el-table-column prop="lastUpdate" label="最近修改记录" />
        <el-table-column label="操作" width="230" header-align="center" align="center">
          <template #default="scope">
            <div
              v-if="scope.row.roleName === '超级管理员'"
              :disabled="scope.row.roleName === '超级管理员'"
              class="authority_text"
            >
              拥有最高权限，不允许修改
            </div>
            <el-button v-else size="small" text type="primary" @click="onEditDrawer(scope.row)">编辑</el-button>
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

      
      <editDialog ref="drawer" :employeeRow="employeeRow" @confirmFunc="subData" />
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, reactive, ref, onMounted } from "vue";
import type { ElTable } from "element-plus";
import { Search, Plus } from "@element-plus/icons-vue";
import { getRoleListApi } from "@/api/system/role";
import { useUserStore } from "@/stores/user";
import useListPageHook from "@/hooks/listPage";

// 定义变量内容
const userStore = useUserStore();


const editDialog = defineAsyncComponent(() => import("@/views/sysManagement/rolePermissionManagement/editDialog.vue"));

// 状态
const queryForm = ref({
  roleName: "",
  companyId: userStore.companyId,
});

const beanInfo = {
  roleId: null,
  roleName: "",
  description: "",
  menuIdList: [], // "menuIdList": [40, 41, 42]
  companyId: userStore.companyId,
};

let {
  tableLoading,
  pageParams,
  tableDataList,
  maxHeight,
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
  getRoleListApi,

  beanInfo,
  queryForm
);
</script>

<style scoped>
.authority_text {
  color: #999;
}
</style>
