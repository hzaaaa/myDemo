<template>
  <component :is="LayoutComponents[layout]" />
</template>

<script setup lang="ts">
import { type Component } from "vue";
import LayoutVertical from "./LayoutVertical.vue";
import LayoutClassic from "./LayoutClassic.vue";

const LayoutComponents: Record<string, Component> = {
  vertical: LayoutVertical,
  classic: LayoutClassic,
};

const layout = "classic";
</script>

<style scoped lang="scss"></style>
