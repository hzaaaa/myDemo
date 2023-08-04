/**
 * @description 使用 useDebounceFn 处理的回调函数会在 delay 时间后调用，每次操作会重置 delay 计时
 * @param func 回调函数
 * @param delay 延迟时间，单位 ms
 */
export function useDebounceFn(func: Function, delay: number = 200) {
  let timer: NodeJS.Timeout | null = null;
  const debounceFn = function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func();
    }, delay);
  };
  return debounceFn;
}
