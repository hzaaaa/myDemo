import router from "@/routers";
import { defineStore } from "pinia";

// TabsStore 标签栏相关存储
export const useTabsStore = defineStore({
  // id: 必须，在所有 Stores 中唯一
  id: "TabsStore",
  state: (): TabsStore => ({
    // tabs栏里的菜单列表
    tabsMenuList: [],
  }),
  getters: {},
  actions: {
    addTabs(tabItem: TabsProps) {
      if (this.tabsMenuList.every((item) => item.name !== tabItem.name)) {
        this.tabsMenuList.push(tabItem);
      }
    },
    removeTabs(tabName: string, isCurrent: boolean = true) {
      if (isCurrent) {
        this.tabsMenuList.forEach((item, index) => {
          if (item.name !== tabName) return;
          const nextTab = this.tabsMenuList[index + 1] || this.tabsMenuList[index - 1];
          if (!nextTab) return;
          router.push({ name: nextTab.name });
        });
      }
      this.tabsMenuList = this.tabsMenuList.filter((item) => item.name !== tabName);
    },
    setTabs(tabsMenuList: TabsProps[]) {
      this.tabsMenuList = tabsMenuList;
    },
  },
  persist: { key: "TabsStore", storage: localStorage },
});
