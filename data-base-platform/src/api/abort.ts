import { AxiosRequestConfig } from "axios";

class AxiosAbort {
  // [取消请求控制器]
  pendingMap: Map<string, AbortController>;
  constructor() {
    this.pendingMap = new Map();
  }

  /**
   * 取消请求
   */
  canclePending(config: AxiosRequestConfig) {
    const id = `${config.method}-${config.url}`;
    if (this.pendingMap.has(id)) {
      this.pendingMap.get(id)?.abort();
      this.pendingMap.delete(id);
    }
  }
  /**
   * 添加请求
   */
  addPending(config: AxiosRequestConfig) {
    this.canclePending(config);
    const id = `${config.method}-${config.url}`;
    const controller = new AbortController();
    config.signal = controller.signal;
    if (!this.pendingMap.has(id)) this.pendingMap.set(id, controller);
  }
  /**
   * 取消所有请求
   */
  cancleAllPending() {
    this.pendingMap.forEach((controller) => {
      controller.abort();
    });
    this.pendingMap.clear();
  }
}

export default new AxiosAbort();
