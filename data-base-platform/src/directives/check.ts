/**
 * v-check
 * 按钮权限指令，无权限时点击 toast 提示无权限
 * 使用：给 Dom 加上 v-check 及数组，数组第一位是回调函数，第二位是需要的权限数组
 * <button v-check="[exportReport, ['report:export']]">导出报表</button>
 */
import { useAuthStore } from "@/stores/auth";
import { ElMessage } from "element-plus";
import type { Directive, DirectiveBinding } from "vue";
import { isFunction } from "@/utils/is";

interface ElType extends HTMLElement {
  __handleClick__: () => any;
}
const check: Directive = {
  mounted(el: ElType, binding: DirectiveBinding) {
    const { value } = binding;
    if (value && Array.isArray(value) && value.length === 2) {
      let callback = value[0];
      let needPermissionList = value[1];
      if (!isFunction(callback)) {
        throw "callback must be a function";
      }
      if (needPermissionList && Array.isArray(needPermissionList) && needPermissionList.length) {
        el.__handleClick__ = function () {
          const authStore = useAuthStore();
          const authButtonList = authStore.authButtonListGet;
          const hasPermission = needPermissionList.every((p: any) => {
            return authButtonList.includes(p);
          });
          // 权限不满足时的操作
          if (!hasPermission) {
            ElMessage.error("暂无权限，请联系管理员添加");
          } else {
            callback();
          }
        };
        el.addEventListener("click", el.__handleClick__);
      } else {
        throw new Error(`使用方式：v-check="[exportReport, ['report:export']]"`);
      }
    } else {
      throw new Error(`使用方式：v-check="[exportReport, ['report:export']]"`);
    }
  },
  beforeUnmount(el: ElType) {
    el.removeEventListener("click", el.__handleClick__);
  },
};

export default check;
