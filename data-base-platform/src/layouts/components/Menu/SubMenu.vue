<template>
  <template v-for="subItem in menuList" :key="subItem.path">
    <el-sub-menu v-if="subItem.children && subItem.children.length > 0" :index="subItem.path">
      <template #title>
        <el-icon v-if="subItem.meta?.icon && subItem.meta?.icon.startsWith('icon-')" class="mr4">
          <SvgIcon :name="subItem.meta?.icon" size="16px"></SvgIcon>
        </el-icon>
        <el-icon v-if="subItem.meta?.icon && !subItem.meta?.icon.startsWith('icon-')">
          <component :is="subItem.meta?.icon"></component>
        </el-icon>
        <span>{{ subItem?.meta?.title }}</span>
      </template>
      <SubMenu :menuList="subItem.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="subItem.path" @click="handleClickMenu(subItem)">
      <el-icon v-if="subItem.meta?.icon && subItem.meta?.icon.startsWith('icon-')" class="mr4">
        <SvgIcon :name="subItem.meta?.icon" size="16px"></SvgIcon>
      </el-icon>
      <el-icon v-if="subItem.meta?.icon && !subItem.meta?.icon.startsWith('icon-')">
        <component :is="subItem.meta?.icon"></component>
      </el-icon>
      <template #title>
        <span>{{ subItem?.meta?.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import SvgIcon from "@/components/svgIcon/index.vue";

let props = defineProps<{ menuList: RouteItem[] }>();
console.log('menuList',props.menuList)
const router = useRouter();
const handleClickMenu = (subItem: RouteItem) => {
  // if (subItem.meta.isLink) return window.open(subItem.meta.isLink, "_blank");
  router.push(subItem.path);
};
</script>

<style scoped lang="scss">
.el-menu-item.is-active {
  background-color: #eefffe;
}
</style>
