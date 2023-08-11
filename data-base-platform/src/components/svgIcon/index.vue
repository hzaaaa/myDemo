<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="iconName" :fill="color"></use>
  </svg>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface SvgProps {
  name: string; // 图标名称 ==> 必传
  color?: string; // 图标颜色 ==> 非必传
  size?: string; // 图标大小 ==> 非必传，默认 20px
}

const props = withDefaults(defineProps<SvgProps>(), {
  // color: "#333333",
  size: "1em",
});

const iconName = computed(() => `#${props.name}`);
</script>

<style scoped lang="scss">
.icon {
  // v-bind Vue3 支持，可将 css 值与 js 的值绑定
  width: v-bind("$props.size");
  height: v-bind("$props.size");
  vertical-align: -0.1em;
  fill: currentColor;
  overflow: hidden;
}
</style>
