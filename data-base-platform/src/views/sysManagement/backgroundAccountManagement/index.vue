<template>
  <div class="common-layout-system">
    <!-- <el-form v-model="queryForm">
      <el-row>
        <el-col :span="24">
          <div class="wrap" style="display: flex">
            <el-form-item label="用户名：">
              <el-input v-model="queryForm.name" style="width: 320px" clearable></el-input>
            </el-form-item>
            <el-form-item label="状态：">
              <el-select v-model="queryForm.enabled" clearable placeholder="请选择" style="width: 320px">
                <el-option
                  v-for="item in [
                    {
                      label: '启用',
                      value: 1,
                    },
                    {
                      label: '停用',
                      value: 0,
                    },
                  ]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-button type="primary" @click="searchByQueryForm">查询</el-button>
            <el-button @click="doReset">重置</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form> -->

    <div class="operat-buttons">
      <el-button type="primary" @click="openDrawer('新建')">新建</el-button>
      <div class="space"></div>
    </div>

    <el-table class="common-table" v-loading="tableLoading" :data="tableDataList" cell-class-name="table-cell"
      header-cell-class-name="header-cell" border>
      <el-table-column label="用户名" prop="username">
        <template #default="scope">
          {{ scope.row.username ? scope.row.username : '--' }}
        </template>
      </el-table-column>
      <el-table-column label="姓名" prop="nickName">
        <template #default="scope">
          {{ scope.row.nickName ? scope.row.nickName : '--' }}
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="联系方式">
        <template #default="scope">
          {{ scope.row.phone ? scope.row.phone : '--' }}
        </template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱">
        <template #default="scope">
          {{ scope.row.email ? scope.row.email : '--' }}
        </template>
      </el-table-column>
      <el-table-column prop="roleName" label="角色">
        <template #default="scope">
          {{ scope.row.roleName ? scope.row.roleName : '--' }}
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注">
        <template #default="scope">
          {{ scope.row.remark ? scope.row.remark : '--' }}
        </template>
      </el-table-column>
      <!-- <el-table-column prop="enabled" label="状态">
        <template #header>
          <div class="flex-align-center">
            状态
            
          </div>
        </template>
        <template #default="scope">
          <span v-if="scope.row.enabled === 1" style="color: #ff9e2e">{{ "已启用" }}</span>
          <span v-else style="color: #a8abb2">{{ "已停用" }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="操作" width="210px" header-align="center" align="center">
        <template #default="scope">
          <el-button type="primary" link @click="openDrawer('编辑', scope.row)">编辑</el-button>
          <el-button type="primary" link @click="resetPwdInnerAccount(scope.row.id)">重置密码</el-button>

          <!-- <el-button type="primary" link @click="enableInnerAccount(scope.row.id, scope.row.enabled)">{{
            scope.row.enabled ? "停用" : "启用"
          }}</el-button> -->
          <el-button type="primary" link @click="deleteUserClick(scope.row)">{{
            '删除'
          }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-block">
      <el-pagination :page-sizes="pageParams.pageSizesList" background layout="total,sizes,prev, pager, next,jumper"
        @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page="pageParams.pageNum"
        :page-size="pageParams.pageSize" :total="pageParams.total" />
    </div>
    <AccountDrawer ref="drawerRef" @refreshData="refreshData" />
    <ResetPasswordDialog ref="resetPasswordDialogRef" @refreshData="refreshData" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import useListPageHook from "@/hooks/listPage";
import AccountDrawer from "./AccountDrawer.vue";
import ResetPasswordDialog from "./ResetPasswordDialog.vue";

import {
  getUserListApi,
  postUserPasswordResetApi,
  // enableInnerAccountApi,
  deleteUserApi,
  addUserApi,
  updateUserApi,
} from "@/api/system/user";
import { ElMessage, ElMessageBox } from "element-plus";

// 账户新建编辑抽屉
const drawerRef = ref<InstanceType<typeof AccountDrawer> | null>(null);
const openDrawer = (title: string, row: any = {}) => {
  console.log(title, row);
  const params = {
    title,
    isEdit: title === "编辑",
    row: { ...row, deptId: 1, },
    api: title === "新建" ? addUserApi : updateUserApi,

  };
  drawerRef.value?.acceptParams(params);
};
// 重置密码弹窗
const resetPasswordDialogRef = ref<InstanceType<typeof ResetPasswordDialog> | null>(null);
const openResetPasswordDialog = (id: number, pwd: string) => {
  const params = {
    id: id,
    pwd: pwd,


  };
  resetPasswordDialogRef.value?.acceptParams(params);
};

//停用/启用内部用户
// const enableInnerAccount = async (userId: number, enabled: number) => {
//   const params = {
//     userId: userId,
//     enabled: enabled == 0 ? 1 : 0,
//   };
//   // console.log(params);
//   try {
//     await enableInnerAccountApi(params);

//     // setTimeout(() => {
//     refreshData();
//     ElMessage.success("状态更新成功");
//     // }, 2000);
//   } catch (err) {
//     console.log(err);
//     // ElMessage.error("操作失败");
//   }
// };
// 删除用户
const deleteUserClick = async (row: any) => {



  ElMessageBox.confirm("确定删除该用户吗？", `删除用户-${row.username}`, {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    customClass: "delete-message",
    // type: "warning",
  })
    .then(() => {
      let deleteApi = null;
      let api = deleteUserApi;
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
};
// 重置密码
const resetPwdInnerAccount = async (userId: number) => {
  const params = {
    id: userId,
  };

  try {
    const { data } = await postUserPasswordResetApi(params);
    ElMessage.success("重置密码成功");
    openResetPasswordDialog(userId, data as string);
  } catch (err) {
    console.log(err);
  }
};

const changeEnableParam = (value: any) => {
  queryForm.value.enabled = value;
  searchByQueryForm();
  ElMessage.success("列表更新成功");
};

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
  getUserListApi,

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
