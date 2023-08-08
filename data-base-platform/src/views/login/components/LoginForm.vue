<template>
  <el-form
    ref="loginFormRef"
    :model="state.ruleForm"
    :rules="loginRules"
    label-position="top"
    :hide-required-asterisk="true"
    style="min-width: 260px"
    @keyup.enter="onSignIn(loginFormRef)"
  >
    <el-form-item class="login-animation1" label="用户名">
      <el-input text v-model="state.ruleForm.username" autocomplete="off"  class="deep_input">
        <!-- <template #prefix>
					<el-icon class="el-input__icon">
						<User />
					</el-icon>
				</template> -->
      </el-input>
    </el-form-item>
    <el-form-item class="login-animation2" label="密码">
      <el-input
        :type="state.isShowPassword ? 'text' : 'password'"
        v-model="state.ruleForm.password"
        autocomplete="off"
        
        class="deep_input"
      >
        
      </el-input>
    </el-form-item>
  </el-form>
  <div class="login-btn">
    
    <el-button
      type="primary"
      class="login-content-submit login_success_btn"
      round
      @click.prevent="onSignIn(loginFormRef)"
      :loading="state.loading.signIn"
    >
      <span>登 录</span>
    </el-button>
    
  </div>
</template>

<script setup lang="ts" name="loginIndex">
import { ref, onMounted, reactive } from "vue";
import { NextLoading } from "@/utils/loading";
import { useRoute, useRouter } from "vue-router";
import { FormInstance } from "element-plus";
import { loginApi } from "@/api/login/index";
// import { getCompanyInformationApi } from "@/api/biz/company";
import { useUserStore } from "@/stores/user";
import { useAuthStore } from "@/stores/auth";
import { Session } from "@/utils/storage";
import { initDynamicRoutes ,routerToFirstPage} from "@/routers/backEnd";
import { JSEncrypt } from "jsencrypt";
import { useDataBase } from '@/stores/dataBase'
const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC7nJdZ9t1X4gpUG86UbcrqsfpzfQercalFcAb1j+HJdUzRwGMQ46MttQ3kgK8sqFXrfq3isL7hox6rA5ZIiC7IMUSRRJXZNQdtG+hS2eBue7xWFJ4G9MUM4zGEmyjDs6W1IqrgQ6quF42XEWzFytp8yoXcmUd1/PuoU9mZsHB37QIDAQAB';//生成的公
const encryptor = new JSEncrypt()
encryptor.setPublicKey(publicKey) // 设置公钥

// 定义变量内容
const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const authStore = useAuthStore();

// 初始化表单
const loginFormRef = ref<FormInstance>();

// 表单文本
const state = reactive({
  isShowPassword: false,
  ruleForm: {
    username: "",
    password: "",
    type: 1,
    // code: '',
    // captchaId: '',
  },

  loading: {
    signIn: false,
  },
});

// 登录按钮
const signInShow = ref(false);
const getInputVal = () => {
  if (state.ruleForm.username.length >= 1 && state.ruleForm.password.length >= 1) {
    signInShow.value = true;
  } else {
    signInShow.value = false;
  }
};

// 表单校验
const validateUserName = (rule: any, value: string, callback: any) => {
  if (value.trim() === "") {
    return callback(new Error("请输入用户名"));
  } else {
    callback();
  }
};

const validatePassword = (rule: any, value: string, callback: any) => {
  if (value.trim() === "") {
    return callback(new Error("请输入密码"));
  } else {
    callback();
  }
};
// const validateCode = (rule: any, value: string, callback: any) => {
// 	if (value.trim() === '') {
// 		return callback(new Error('验证码不能为空'));
// 	} else {
// 		callback();
// 	}
// };
const loginRules = reactive({
  username: [{ required: true, validator: validateUserName, message: "请输入用户名", trigger: "change" }],
  password: [{ validator: validatePassword, message: "请输入密码", trigger: "change" }],
  // code: [{ required: true, validator: validateCode, message: '请输入验证码', trigger: 'blur' }],
});

// 登录
const onSignIn = (formEl: FormInstance | undefined) => {
  // debugger
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      // 0. 清空缓存
      userStore.$reset();
      let temp = JSON.parse(JSON.stringify(state.ruleForm));
      
      temp.password = encryptor.encrypt(temp.password);
      
       loginApi({ ...temp }).then(async (res:any) => {
        
        // 1. 存储用户信息
        Session.set("token", res.data.token);
        userStore.setToken(res.data.token);
        // debugger
        userStore.setUserInfo(res.data.userInfoVo);
        userStore.setRoleInfo(res.data.userInfoVo?.sysRoleList);
        await initDynamicRoutes();
        // 2.添加动态路由
        //3.获取权限
        // await authStore.getAuthButtonList();
        // routerToFirstPage();
        
        let dataBaseStore = useDataBase();
        if(dataBaseStore.dataBaseList.length===0){
          router.push('/sysManagement/backgroundAccountManagement/index')
        }else{
          let dataBase = dataBaseStore.dataBaseList[0]
          router.push(`/dataManagement/${dataBase.name}`)
        }
      });

      // getCompanyInformationApi({}).then((res: any) => {
      //   // debugger
      //   if (res.code === 200) {
      //     userStore.setUserCompanyId(res.data.id);
      //     userStore.setCompanyInfo(res.data);

          
      //     // // 5.跳转页面，如果没有 redirect 跳转到默认页，如果有就携带参数跳转到 redirect
      //     // if (!route.query?.redirect) router.push("/sysManagement");
      //     // else if (route.query?.redirect === "/sysManagement/backgroundAccountManagement") router.push({ name: "Sys" });
      //     // else router.push({ path: route.query?.redirect as string, query: JSON.parse(route.query?.params as string) });
      //   }
      // });
    } else {
      return false;
    }
  });
};

// 页面加载时
onMounted(() => {
  // NextLoading.done();
  // // 监听 enter 按键事件登录
  // document.onkeydown = (e: any) => {
  //   e = window.event || e;

  //   if (e.code === "Enter" || e.code === "enter" || e.code === "NumpadEnter") {
  //     onSignIn(loginFormRef.value);
  //   }
  // };
});
</script>

<style lang="scss" scoped>
@import "../index";
</style>
