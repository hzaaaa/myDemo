<template>
  <div class="system-menu-container layout-pd">
    <el-card shadow="hover">
      <div class="system-menu-search mb8">
        <el-form :model="queryForm">
          <el-row>
            <el-form-item label="状态">
              <el-select v-model="queryForm.enabled" clearable placeholder=" " size="default">
                <el-option label="启用中" :value="1"></el-option>
                <el-option label="已停用" :value="0"></el-option>
              </el-select>
            </el-form-item>

            <el-button size="default" type="primary" class="ml12" v-throttle="searchByQueryForm" >
              
              查询
            </el-button>
          </el-row>
        </el-form>
      </div>
      <el-button size="default" type="warning" class="mb12" @click="onAddDrawer('add')" >
        <el-icon>
          <Plus />
        </el-icon>
        添加账号
      </el-button>
      <el-table :data="tableDataList" stripe border v-loading="tableLoading" >
        <el-table-column prop="username" label="用户账号" />
        <el-table-column prop="nickName" label="姓名" />
        <el-table-column prop="deptName" label="部门" />
        <el-table-column prop="roleName" label="角色" />
        <el-table-column prop="phone" label="手机号" >
          <template #default="scope">
            {{scope.row.phone?scope.row.phone:'--'  }}
          </template>
        </el-table-column>
        <el-table-column prop="email" label="邮箱" >
          <template #default="scope">
            {{scope.row.email?scope.row.email:'--'  }}
          </template>
        </el-table-column>
        <el-table-column prop="enabled" label="状态">
          <!-- <template #default="scope">
            <el-tag type="success" v-if="scope.row.enabled === 1">启用中</el-tag>
            <el-tag type="warning" v-else>已停用</el-tag>
          </template> -->
          <template #default="scope">
            <div class="flex-align-center" v-if="scope.row.enabled === 1">
              <div class="status-point-green"></div>
              <div >启用中</div>
            </div>
            <div class="flex-align-center" v-else>
              <div class="status-point-red"></div>
              <div >已停用</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" />
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

    <!-- <AddOrEditDrawer ref="drawer" :employeeRow="employeeRow" @confirmFunc="subData" /> -->
    <editDialog ref="drawer" :employeeRow="employeeRow" @confirmFunc="subData" />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, reactive, ref, onMounted } from "vue";
import { ElTable } from "element-plus";
// import type { FormInstance, ElDrawer, ElTable, ElMessage, ElMessageBox } from 'element-plus';
import { RouteRecordRaw } from "vue-router";
import { Search, Plus } from "@element-plus/icons-vue";
import { getUserListApi } from "@/api/system/backgroundAccount";
import { useUserStore } from "@/stores/user";


import editDialog from "@/views/sysManagement/backgroundAccountManagement/editDialog.vue";
import useListPageHook from "@/hooks/listPage";

// 初始变量
const userStore = useUserStore();

// 引用弹窗组件

// const drawer = ref<any>(null);
// const employeeRow = ref<object>([]);

//#region 分页查询相关
// 状态
const queryForm = ref({
  enabled: 1,
  companyId: userStore.companyId,
});

const beanInfo = {
  userId: null,
  username: "",
  nickName: "",
  deptId: null,
  deptName: "",
  roleId: null,
  roleName: "",
  phone: "",
  email: "",
  newPwd: "",
  enabled: 1, //0-未启用; 1-已启用
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
  getUserListApi,

  beanInfo,
  queryForm
);
//#endregion
</script>
