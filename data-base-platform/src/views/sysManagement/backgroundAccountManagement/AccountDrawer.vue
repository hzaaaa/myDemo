<template>
  <el-drawer
    v-model="drawerVisible"
    :title="`${drawerProps.title}账号`"
    :close-on-click-modal="false"
    @open="getRoleSelector"
    @close="closeResetDrawer"
  >
    <el-form ref="accountFormRef" :model="drawerProps.row" :rules="accountFormRules" label-width="90px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="drawerProps.row!.username" place="请输入5-20位数字或字母"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="nickName">
        <el-input v-model="drawerProps.row!.nickName"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="phone">
        <el-input v-model="drawerProps.row!.phone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="drawerProps.row!.email" place="请输入企业邮箱"></el-input>
      </el-form-item>
      <div class="edit-forbidden" v-if="!drawerProps.isEdit">
        <el-form-item label="角色" prop="roleId">
					<el-select v-model="drawerProps.row!.roleId" style="width: 100%;"  >
						<el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id" />
					</el-select>
				</el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="drawerProps.row!.password" placeholder="不少于6位，需包含数字和字母"></el-input>
        </el-form-item>
        <el-form-item label="启用状态" prop="enabled">
          <el-radio-group v-model="drawerProps.row!.enabled">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>

      <el-form-item label="备注">
        <el-input v-model="drawerProps.row!.remark" type="textarea" :rows="4" maxlength="500" show-word-limit></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button type="primary" @click="submit(accountFormRef)">提交</el-button>
      <!-- <el-button @click="check">check</el-button> -->
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { FormInstance, FormRules } from "element-plus";

import { validateUsername, validateNickName, validateMobile, validateEmail, validatePwd } from "@/utils/validator";
import { ElMessage } from "element-plus";
import { getRoleListApi as getRoleSelectorApi } from "@/api/system/role";
interface DrawerProps {
  title: string;
  isEdit: boolean;
  row: any;
  api?: (params: any) => Promise<any>;
  organizationId?: number;
}
const drawerVisible = ref(false);
const drawerProps = ref<any>({
  // isView: false,
  title: "",
  isEdit: false,
  row: {},
  
});

const acceptParams = (params: DrawerProps) => {
  drawerProps.value = params;
  if (drawerProps.value.row.enabled == undefined) {
    drawerProps.value.row.enabled = 1;
  }
  drawerVisible.value = true;
};

const accountFormRef = ref<FormInstance>();

const accountFormRules = reactive<FormRules>({
  nickName: [{ validator: validateNickName, trigger: "blur" }],
  username: [{ required: true, validator: validateUsername, trigger: "blur" }],
  phone: [{ validator: validateMobile, trigger: "blur" }],
  email: [{ validator: validateEmail, trigger: "blur" }],
  roleId: [{ required: true, message: "请选择角色！", trigger: "blur" }],
  password: [{ required: true, validator: validatePwd, trigger: "blur" }],
  enabled: [{ required: true, message: "请选择启用状态！", trigger: "change" }],
});

const roleList = ref<any>([]);
  const getRoleSelector = async () => {
	if (!drawerProps.value.isEdit) {
		try {
			const { data } = await getRoleSelectorApi({});
      // debugger
			roleList.value = data.list;
		} catch (err) {
			console.log(err);
		}
	}
};
const buttonLoading = ref(false);
const submit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  formEl.validate(async (valid) => {
    if (!valid) {
      ElMessage({
        type: "error",
        message: "请填入必要的信息！",
      });
      return;
    }

    buttonLoading.value = true;
    try {
      if (!drawerProps.value.isEdit) {
        // let params: any = {
        //   username: drawerProps.value.row.username,
        //   nickName: drawerProps.value.row.nickName,
        //   phone: drawerProps.value.row.phone,
        //   email: drawerProps.value.row.email,
        //   roleId: drawerProps.value.row.roleId,
        //   roleIdList:[drawerProps.value.row.roleId],
        //   password: drawerProps.value.row.password,
        //   enabled: drawerProps.value.row.enabled,
        //   remark: drawerProps.value.row.remark,
          
        // };
        // if(drawerProps.value.row.organizationId) drawerProps.value.row["organizationId"] = drawerProps.value.organizationId;
        
        let params ={
          ...drawerProps.value.row
        } 
        params.roleIdList = [params.roleId];
        delete params.roleId;
        await drawerProps.value.api!(params);
        ElMessage.success("创建成功");
        emit("refreshData");
        drawerVisible.value = false;
      } else {
        let params = {
          id: drawerProps.value.row.id,
          username: drawerProps.value.row.username,
          nickName: drawerProps.value.row.nickName,
          phone: drawerProps.value.row.phone,
          email: drawerProps.value.row.email,
          remark: drawerProps.value.row.remark,
        };
        await drawerProps.value.api!(params);
        ElMessage.success("修改成功");
        emit("refreshData");
        drawerVisible.value = false;
      }
    } catch (err) {
      console.log(err);
      // ElNotification({
      //   title: "评估失败！",
      //   message: "评估失败！",
      //   type: "error",
      // });
      // ElMessage.error("错误");
      // getToken();
    } finally {
      buttonLoading.value = false;
    }
  });
};

const closeResetDrawer = () => {
  accountFormRef.value?.resetFields();
  accountFormRef.value?.clearValidate();
};

const check = () => {
  console.log(drawerProps.value.row);
};
const emit = defineEmits(["refreshData"]);
defineExpose({
  acceptParams,
});
</script>

<style lang="scss" scoped>
.el-drawer {
  .el-drawer__footer {
    .el-button {
      width: 70px;
      height: 32px;
    }
  }
}
</style>
