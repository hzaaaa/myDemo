<template>
  <div>
    <!-- :before-close="handleClose" -->
    <el-dialog
      v-model="showDrawer"
      :close-on-click-modal="false"
      :title="(userStore.behaviorGet === 'add' ? '添加' : '编辑') + '部门'"
      width="434px"
      @close="isClose"
    >
      <el-form ref="queryFormRef" :model="props.employeeRow" :label-width="82" :rules="rules">
        <el-row>
            <el-col :span="24">
              <el-form-item label="部门名称" prop="deptName">
                <el-input
                  v-model="props.employeeRow.deptName"
                  autocomplete="off"
                  maxlength="20"
                  placeholder="请输入部门名称"
                  clearable
                  style="width: 450px"
                  size="default"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="部门负责人" prop="deptLeaderId">
                <el-select
                  v-model="props.employeeRow.deptLeaderId"
                  clearable
                  placeholder="请选择部门负责人"
                  size="default"
                  style="width: 450px"
                >
                  <el-option v-for="item in deptNameList" :key="item.userId" :label="item.nickName" :value="item.userId">
                    <!-- <span style="float: left">{{ item.username }}</span> -->
                    <!-- <span style="float: right; color: var(--el-text-color-secondary); font-size: 13px">{{ item.deptName }}</span> -->
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="启用状态" prop="deleted">
                <el-radio-group v-model="props.employeeRow.deleted" class="ml-4">
                  <el-radio :label="0" size="large">启用</el-radio>
                  <el-radio :label="1" size="large">停用</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
      </el-form>
      <template #footer>
        <div class="drawer_footer">
          <el-button @click="isClose">取消</el-button>
          <el-button type="primary" :loading="loading" v-throttle="() => onSave(queryFormRef)">{{
            loading ? "保存中 ..." : "确定"
          }}</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineEmits, defineExpose, reactive, onMounted, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import { ElDrawer, ElMessage, ElMessageBox } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import { Close } from "@element-plus/icons-vue";
import { getDeptDetailsApi, postDeptUpdateApi } from "../../../api/system/dept";
import { getUserSelectorsApi } from "../../../api/system/backgroundAccount";
import { useUserStore } from "@/stores/user";
import useDrawerhook from "@/hooks/drawerhook";

const userStore = useUserStore();

const props = defineProps({
  employeeRow: {
    type: Object,
    default: {},
    
  },
});

// 部门名称
const checkDepartment = (rule: any, value: any, callback: any) => {
  if (value.trim() === "") {
    callback(new Error("部门名称不可为空哦"));
  }
  callback();
};

// 部门负责人 数组
const deptNameList = ref<any>([]);

// 部门负责人下拉
getUserSelectorsApi({  companyId: userStore.companyId }).then((response) => {
  deptNameList.value = response.data.filter((item: any) => {
    return item.enabled === 1;
    // return true
  });
});


//校验的规则
const rules = reactive<FormRules>({
  deptName: [{ validator: checkDepartment, trigger: "blur",required:true }],
});

// 保存
const onSave = async (formEl: FormInstance | undefined) => {
  // 添加部门
  if (userStore.behavior !== "modify") {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
      if (valid) {
        let queyTempt = { ...props.employeeRow };
        postDeptUpdateApi(queyTempt).then((response) => {
          if (response.code === 200) {
            ElMessage.success("创建成功");
            showDrawer.value = false;
            loading.value = false;
            emit("confirmFunc");
          }
        });
      } else {
        console.log("error", fields);
      }
    });
  } else {
    // 修改部门
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
      if (valid) {
        let queyTempt = { ...props.employeeRow };
        postDeptUpdateApi(queyTempt).then((response) => {
          if (response.code === 200) {
            ElMessage.success("修改成功");
            showDrawer.value = false;
            loading.value = false;
            emit("confirmFunc");
          }
        });
      } else {
        console.log("error", fields);
      }
    });
  }
};

const validFormInfoList = <any>[];
const transRules = <any>[];
let { handleClose, showDrawer, timer, loading, queryFormRef, isOpen, isClose } = useDrawerhook(
  props,
  () => {},
  validFormInfoList,
  transRules
);
const emit = defineEmits(["confirmFunc"]);

// 将数据暴露出来,这样其他页面就能访问了
defineExpose({
  isOpen,
  isClose,
});
</script>
<style lang="scss" scoped></style>
