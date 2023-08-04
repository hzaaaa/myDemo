<template>
  <div>
    <!-- :before-close="handleClose" -->
    <el-dialog
      v-model="showDrawer"
      :close-on-click-modal="false"
      :title="(userStore.behaviorGet === 'add' ? '添加' : '编辑') + '账号'"
      width="434px"
      @close="isClose"
    >
      <el-form ref="queryFormRef" :model="props.employeeRow" :label-width="80" :rules="rules">
        <el-row>
          <el-col :span="24">
            <el-form-item label="用户账号" prop="username">
              <el-input
                :disabled="userStore.behavior === 'modify'"
                v-model="props.employeeRow.username"
                autocomplete="off"
                placeholder="请输入5-20位英文+数字组合的账号"
                clearable
                style="width: 450px"
                size="default"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="姓名" prop="nickName">
              <el-input
                v-model="props.employeeRow.nickName"
                autocomplete="off"
                placeholder="请输入姓名"
                clearable
                style="width: 450px"
                size="default"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="手机号" prop="phone">
              <el-input
                v-model="props.employeeRow.phone"
                autocomplete="off"
                placeholder="请输入用户手机号"
                clearable
                style="width: 450px"
                size="default"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="邮箱号" prop="email">
              <el-input
                v-model="props.employeeRow.email"
                autocomplete="off"
                placeholder="请输入用户邮箱号"
                clearable
                style="width: 450px"
                size="default"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="密码" prop="newPwd" :class="userStore.behavior === 'modify'?'nored':'red'">
              <el-input
                v-model="props.employeeRow.newPwd"
                type="password"
                autocomplete="off"
                placeholder="长度需大于6位数，包含数字、字母"
                show-password
                style="width: 450px"
                size="default"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="部门" prop="deptId">
              <el-select
                v-model="props.employeeRow.deptId"
                clearable
                placeholder="请选择部门"
                size="default"
                style="width: 450px"
              >
                <el-option v-for="item in deptOptions" :key="item.deptId" :label="item.deptName" :value="item.deptId" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="角色" prop="roleId">
              <el-select
                v-model="props.employeeRow.roleId"
                clearable
                placeholder="请选择角色"
                size="default"
                style="width: 450px"
              >
                <el-option v-for="item in roleNameOptions" :key="item.roleId" :label="item.roleName" :value="item.roleId" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="启用状态" prop="enabled">
              <el-radio-group v-model="props.employeeRow.enabled" class="ml-4">
                <el-radio :label="1" size="large">启用</el-radio>
                <el-radio :label="0" size="large">停用</el-radio>
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
<script setup lang="ts">
import { ref, reactive, onMounted, getCurrentInstance } from "vue";
import { ElDrawer, ElMessage, ElMessageBox } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import { Close } from "@element-plus/icons-vue";
import { useUserStore } from "@/stores/user";
import { getDeptSelectorsApi } from "../../../api/system/dept";
import { getRoleSelectorsApi } from "@/api/system/role";
import { getUserDetailsApi, postUserUpdateApi } from "@/api/system/backgroundAccount";
import { toInteger } from "lodash";
import useDrawerhook from "@/hooks/drawerhook";

const userStore = useUserStore();

const props = defineProps({
  employeeRow: {
    type: Object,
    default: {},
    username: "",
    nickName: "",
    phone: "",
    email: "",
    newPwd: "",
    deptName: "",
    roleName: "",
    enabled: 1,
  },
});
//#region 初始化选项
// 页面加载时
onMounted(() => {
  // 部门
  getDeptList(); //编辑时使用
  // 角色
  getRoleList(); //编辑时使用
});

// 部门数组
const deptOptions = ref<any>([]);
// 部门下拉
const getDeptList = () => {
  getDeptSelectorsApi({  companyId: userStore.companyId }).then((response) => {
    if (response.code == 200) {
      // if (toInteger(response.data.deleted) == 1) {
      response.data = response.data || [];
      deptOptions.value = response.data.filter((item: any) => {
        return item.deleted === 0;
      });
      // }
    }
    //
  });
};

// 角色数组
const roleNameOptions = ref<any>([]);
const getRoleList = () => {
  let params = <any>{
    companyId: userStore.companyId,
  };
  getRoleSelectorsApi(params).then((response) => {
    roleNameOptions.value = response.data.filter((item: any) => {
      return item.deleted === 0;
    });
  });
};
//#endregion

//#region 校验
// 用户账号
const checkAccount = (rule: any, value: any, callback: any) => {
  //
  // props
  console.log(props.employeeRow);
  console.log(value);

  if (value.trim() === "") {
    callback(new Error("账号不可为空哦"));
  }
  const regexp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,20}$/;
  if (!regexp.test(value)) {
    callback(new Error("账号必须包含字母和数字，且在5~20位之间"));
  } else {
    callback();
  }
};

// 姓名
const checkName = (rule: any, value: any, callback: any) => {
  //
  if (value.trim() === "") {
    callback(new Error("姓名不可为空哦"));
  }
  if (value.length > 20) {
    callback(new Error("姓名不能超过20位字符"));
  } else {
    callback();
  }
};

// 手机号 /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/;
const checkMobile = (rule: any, value: any, callback: any) => {
  if (value.trim() === "") {
    callback();
  } else {
    const reg = /^1[3456789]\d{9}$/;
    if (!reg.test(value)) {
      callback(new Error("请输入正确的手机号码"));
    } else {
      callback();
    }
  }
};

// 邮箱
const checkEmail = (rule: any, value: any, callback: any) => {
  if (value.trim() === "") {
    callback();
  } else {
    const reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
    if (!reg.test(value)) {
      callback(new Error("请输入正确的邮箱"));
    } else {
      callback();
    }
  }
};

// 密码
const checkPassword = (rule: any, value: any, callback: any) => {
  if (value.trim() === "") {
    if (userStore.behavior !== "modify") {
      callback(new Error("密码不能为空"));
    } else {
      callback();
    }
  } else {
    const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+$/;
    if (!reg.test(value) || value.length <= 6) {
      
      callback(new Error("密码必须包含字母和数字，且大于6位数"));
    } else {
      
      callback();
    }
  }
};

//校验的规则
const rules = reactive<FormRules>({
  username: [
    // { required: true, message: '账号不可为空哦', trigger: 'blur' },
    { validator: checkAccount, trigger: "blur",required: true },
  ],
  nickName: [{ validator: checkName, trigger: "blur" ,required: true}],
  phone: [{ validator: checkMobile, trigger: "blur" }],
  email: [{ validator: checkEmail, trigger: "blur" }],
  newPwd: [{ validator: checkPassword, trigger: "blur" }],
  roleId: [{ required: true, message: "请选择角色", trigger: "blur" }],
  deptId: [{ required: true, message: "请选择部门", trigger: "blur" }],
});
//#endregion
const onSave = async (formEl: FormInstance | undefined) => {
  //
  // 添加用户
  if (userStore.behavior !== "modify") {
    //
    if (!formEl) return;
    //
    await formEl.validate((valid, fields) => {
      if (valid) {
        let queyTempt = { ...props.employeeRow };
        postUserUpdateApi(queyTempt).then((response) => {
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
    // 修改用户
    if (!formEl) return;

    await formEl.validate((valid, fields) => {
      if (valid) {
        let queyTempt = { ...props.employeeRow };
        if(!queyTempt.newPwd){
          delete queyTempt.newPwd;
        }
        postUserUpdateApi(queyTempt).then((response) => {
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
// 子组件有<script setup>	需要defineExpose暴露，方法方可使用
defineExpose({
  isOpen,
  isClose,
});
</script>
<style lang="scss" scoped>
.red{
  :deep(.el-form-item__label::before){
    content: "*";
    color: var(--el-color-danger);
    margin-right: 4px;
  }
}
</style>
