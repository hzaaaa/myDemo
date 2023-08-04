<template>
  <div class="tabs">
    <el-tabs v-model="activeName" type="card" @tab-click="tabClick" @tab-remove="tabRemove">
      <el-tab-pane v-for="item in tabsStore.tabsMenuList" :key="item.name" :name="item.name" :closable="item.close">
        <template #label>
          <el-icon class="mr2 font16" v-show="themeStore.tabsIcon && item.icon">
            <component :is="item.icon"></component>
          </el-icon>
          {{ item.title }}
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { TabsPaneContext } from "element-plus";
import { useTabsStore } from "@/stores/tabs";
import { useThemeStore } from "@/stores/theme";
import { useAuthStore } from "@/stores/auth";
import { useKeepAliveStore } from "@/stores/keepAlive";

const route = useRoute();
const router = useRouter();
const tabsStore = useTabsStore();
const themeStore = useThemeStore();
const authStore = useAuthStore();
const keepAliveStore = useKeepAliveStore();

const activeName = ref(route.name);

watch(
  () => route.fullPath,
  () => {
    if (route.meta.isFull) return;
    activeName.value = route.name;
    const tabsParams = {
      icon: route.meta.icon as string,
      title: route.meta.title as string,
      name: route.name as string,
      close: !route.meta.isAffix,
    };
    tabsStore.addTabs(tabsParams);
    route.meta.isKeepAlive && keepAliveStore.addKeepAliveName(tabsParams.name);
  },
  { immediate: true }
);
const tabClick = (tabItem: TabsPaneContext) => {
  const routeName = tabItem.props.name as string;
  router.push({ name: routeName });
};
const tabRemove = (tabName: string) => {
  keepAliveStore.removeKeepAliveName(tabName);
  tabsStore.removeTabs(tabName, tabName === route.name);
};

onMounted(() => {
  initTabs();
});
// 初始化需要固定的 tabs
const initTabs = () => {
  authStore.flatRouteListGet.forEach((item) => {
    if (item.meta.isAffix && !item.meta.isHide && !item.meta.isFull) {
      const tabsParams = {
        icon: item.meta.icon,
        title: item.meta.title,
        name: item.name,
        close: !item.meta.isAffix,
      };
      tabsStore.addTabs(tabsParams);
    }
  });
};
</script>

<style scoped lang="scss">
.tabs {
  :deep(.el-tabs__header) {
    margin: 0;

    .el-tabs__nav {
      border: none;

      .el-tabs__item {
        border: none;
        line-height: 40px;
        color: #afafaf;

        &.is-active {
          color: var(--el-color-primary);

          &::before {
            position: absolute;
            bottom: 0;
            width: 80%;
            height: 2px;
            background-color: var(--el-color-primary);
            content: "";
          }
        }
      }
    }
  }
}
</style>
