import { onMounted, onUnmounted } from "vue";

/**
 * @description 使用 useEventListener 创建的的事件监听会在页面 unMounted 时自动移除
 * @param target window、document 等需要监听的对象
 * @param event 监听事件名称 "resize" 等
 * @param callback 回调函数
 */
export function useEventListener<E extends keyof DocumentEventMap>(
  target: Document | Window | typeof globalThis,
  event: E,
  callback: () => any
) {
  onMounted(() => target.addEventListener(event, callback));
  onUnmounted(() => target.removeEventListener(event, callback));
}
