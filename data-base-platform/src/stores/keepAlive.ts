import { defineStore } from "pinia";

// KeepAliveStore Vue组件缓存相关存储
export const useKeepAliveStore = defineStore({
  // id: 必须，在所有 Stores 中唯一
  id: "KeepAliveStore",
  state: (): KeepAliveStore => ({
    keepAliveName: [],
  }),
  getters: {},
  actions: {
    addKeepAliveName(name: string) {
      !this.keepAliveName.includes(name) && this.keepAliveName.push(name);
    },
    removeKeepAliveName(name: string) {
      this.keepAliveName = this.keepAliveName.filter((item) => item !== name);
    },
    setKeepAliveName(nameList: string[] = []) {
      this.keepAliveName = nameList;
    },
  },
});
