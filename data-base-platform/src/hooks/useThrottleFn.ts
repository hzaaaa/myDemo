/**
 * @description 使用 useThrottleFn 处理的回调函数在 delay 时间内最多允许调用一次
 * @param func 回调函数
 * @param delay 延迟时间，单位 ms
 */
export function useThrottleFn(func: Function, delay: number = 200) {
  let timer: NodeJS.Timeout | null = null;
  const throttleFn = function () {
    if (!timer) {
      func();
      timer = setTimeout(() => {
        timer = null;
      }, delay);
    }
  };
  return throttleFn;
}
