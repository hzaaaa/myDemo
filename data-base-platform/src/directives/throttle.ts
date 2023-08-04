/**
 * v-throttle
 * 按钮节流指令
 * 使用：给 Dom 加上 v-throttle 及回调函数
 * <button v-throttle="debounceClick">节流提交</button>
 */
import { isFunction } from "@/utils/is";
import type { Directive, DirectiveBinding } from "vue";
interface ElType extends HTMLElement {
  __handleClick__: () => any;
}
const throttle: Directive = {
  mounted(el: ElType, binding: DirectiveBinding) {
    if (!isFunction(binding.value)) {
      throw "callback must be a function";
    }
    let timer: NodeJS.Timeout | null = null;
    el.__handleClick__ = function () {
      if (!timer) {
        binding.value();
        timer = setTimeout(() => {
          timer = null;
        }, 1000);
      }
    };
    el.addEventListener("click", el.__handleClick__);
  },
  beforeUnmount(el: ElType) {
    el.removeEventListener("click", el.__handleClick__);
  },
};

export default throttle;
