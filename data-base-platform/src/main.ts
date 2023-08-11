import { createApp } from "vue";
import App from "@/App.vue";
import pinia from "@/stores/index";
import router from "@/routers/index";
import directives from "@/directives/index";

import ElementPlus from "element-plus";
import "@/styles/index.scss";

import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { changePrimary, changeWarning } from "./utils/theme";
import { DEFAULT_PRIMARY, DEFAULT_WARNING } from "./config";

import "@/assets/iconfont/iconfont.js";
import "@/assets/iconfont/iconfont1.js";

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(directives);
app.use(ElementPlus);

app.mount("#app");

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

changePrimary(DEFAULT_PRIMARY);
changeWarning(DEFAULT_WARNING);
