<template>
  <div class="common-layout-system">

    <!-- <div class="system-menu-search mb8">
        <el-form :model="queryForm">
          <el-row>
            <el-form-item label="角色名称">
              <el-input v-model="queryForm.name" clearable size="default" placeholder=" " style="max-width: 180px">
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
      </el-button> -->
    <div class="operat-buttons">
      <el-button type="primary" @click="onAddDrawer('add')">新建</el-button>
      <div class="space"></div>
    </div>
    <el-table class="common-table" v-loading="tableLoading" :data="tableDataList" cell-class-name="table-cell"
      header-cell-class-name="header-cell" border>
      <el-table-column prop="name" label="角色名称" />
      <el-table-column prop="description" label="备注">
        <template #default="scope">
          {{ scope.row.description ? scope.row.description : '--' }}
        </template>
      </el-table-column>
      <el-table-column prop="createBy" label="创建人">
        <template #default="scope">
          {{ scope.row.createBy ? scope.row.createBy : '--' }}
        </template>
      </el-table-column>

      <el-table-column prop="updateTime" label="更新时间">
        <template #default="scope">
          {{ scope.row.updateTime ? scope.row.updateTime : '--' }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="230" header-align="center" align="center">
        <template #default="scope">
          <div v-if="scope.row.name === '超级管理员'" :disabled="scope.row.name === '超级管理员'" class="authority_text">
            拥有最高权限，不允许修改
          </div>
          <el-button v-else size="small" text type="primary" @click="onEditDrawer(scope.row)">编辑</el-button>
          <el-button v-if="scope.row.name !== '超级管理员'" size="small" text type="primary" @click="deleteClick(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-block">
      <el-pagination :page-sizes="pageParams.pageSizesList" background layout="total,sizes,prev, pager, next,jumper"
        @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page="pageParams.pageNum"
        :page-size="pageParams.pageSize" :total="pageParams.total" />
    </div>

    <editDialog ref="drawer" :employeeRow="employeeRow" @confirmFunc="subData" />

  </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, reactive, ref, onMounted } from "vue";
import type { ElTable } from "element-plus";
import { Search, Plus } from "@element-plus/icons-vue";
import { getRoleListApi, deleteRoleApi } from "@/api/system/role";

import useListPageHook from "@/hooks/listPage";

import { ElMessage, ElMessageBox } from "element-plus";


const editDialog = defineAsyncComponent(() => import("@/views/sysManagement/rolePermissionManagement/editDialog.vue"));

const deleteClick = async (row: any) => {

  ElMessageBox.confirm("确定删除该角色吗？", `删除角色-${row.name}`, {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    customClass: "delete-message",
    // type: "warning",
  })
    .then(() => {
      let deleteApi = null;
      let api = deleteRoleApi;
      //文件
      deleteApi = api;

      //待续未完
      deleteApi({
        id: row.id,
      }).then(() => {
        console.log("delete success", row);
        ElMessage({
          type: "success",
          message: "删除成功",
        });
        refreshData();
      });
    })
    .catch(() => {

    });
}
const queryFormRaw = {
  name: "",
  enabled: null,
};

const beanInfo = {};

let {
  tableLoading,
  tableMaxHeight,
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

  queryForm,
  doReset,
} = useListPageHook(
  // getCompanyListApi,
  getRoleListApi,

  beanInfo,
  queryFormRaw
);


</script>

<style lang="scss" scoped>
// 表单页面通用布局
.common-layout-system {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-left: 35px;
  padding-right: 28px;
  padding-top: 22px;
  border-radius: 10px;

  // display: flex;
  // height: fit-content;
  height: calc(100% - 20px);
  background: #fff;

  .el-form {
    margin-bottom: 0;

    .wrap {
      flex-wrap: wrap;

      .el-form-item {
        margin-bottom: 0;

        .el-input {
          width: 320px;
        }
      }

      .el-button {
        margin-left: 10px;
        width: 72px;

        &:first-of-type {
          margin-left: 20px;
        }
      }
    }
  }

  .el-select {
    width: 100%;
  }

  .search-buttons {
    display: flex;
    flex-direction: row-reverse;
    margin-bottom: 20px;
  }

  .operat-buttons {
    display: flex;
    // margin-top: 26px;
    margin-bottom: 12px;
    background-color: #fff;

    .space {
      flex: 1;
    }
  }

  .pagination-block {
    display: flex;
    flex-direction: row-reverse;
    margin: 29px 0;

    // margin-left: 30px;
    // margin-right: 30px;
  }

  :deep(.el-card__body) {
    padding: 0;
    padding-top: 0;
    padding-bottom: 0;
  }
}
</style>
