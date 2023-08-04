/**
 * v-debounce
 * 按钮防抖指令，可自行扩展至input
 * 使用：给 Dom 加上 v-debounce 及回调函数
 * <button v-debounce="debounceClick">防抖提交</button>
 */
import { isFunction } from "@/utils/is";
import type { Directive, DirectiveBinding } from "vue";
interface ElType extends HTMLElement {
  __handleClick__: () => any;
}
const debounce: Directive = {
  mounted(el: ElType, binding: DirectiveBinding) {
    if (!isFunction(binding.value)) {
      throw "callback must be a function";
    }
    let timer: NodeJS.Timeout | null = null;
    el.__handleClick__ = function () {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        binding.value();
      }, 500);
    };
    el.addEventListener("click", el.__handleClick__);
  },
  beforeUnmount(el: ElType) {
    el.removeEventListener("click", el.__handleClick__);
  },
};

export default debounce;
