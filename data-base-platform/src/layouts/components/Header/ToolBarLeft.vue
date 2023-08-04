<template>
  <div class="breadcrumb">
    <Breadcrumb id="breadcrumb" v-if="themeStore.breadcrumb" />
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from "@/stores/theme";
import Breadcrumb from "./components/Breadcrumb.vue";

const themeStore = useThemeStore();
</script>

<style scoped lang="scss"></style>
