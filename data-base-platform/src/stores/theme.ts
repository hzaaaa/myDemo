import { defineStore } from "pinia";

// ThemeStore 主题样式相关存储
export const useThemeStore = defineStore({
  id: "ThemeStore",
  state: (): ThemeStore => ({
    // 折叠左侧菜单栏
    isCollapse: false,
    // 面包屑导航
    breadcrumb: true,
    // 面包屑导航图标
    breadcrumbIcon: true,
    // 标签栏
    tabs: false,
    // 标签页图标
    tabsIcon: false,
    // 布局切换：可选值"<vertical|classic|transverse|columns>"，默认 vertical
    layout: "vertical",
  }),
  getters: {},
  actions: {
    setThemeState(key: keyof ThemeStore, val: boolean) {
      this.$patch({ [key]: val });
    },
  },
  persist: { key: "ThemeStore", storage: localStorage },
});
