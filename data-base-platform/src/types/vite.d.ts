// 声明文件，*.vue 后缀的文件交给 vue 模块来处理
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// 声明 import.meta.env 中自定义类型，会与原始 ImportMetaEnv 自动合并
interface ImportMetaEnv {
  readonly VITE_USER_NODE_ENV: "development" | "production";
  readonly VITE_API_URL: string;
  readonly VITE_PORT: number;
  readonly VITE_OPEN: boolean;
  readonly VITE_REPORT: boolean;
  readonly VITE_BUILD_GZIP: boolean;
  readonly VITE_DROP_CONSOLE: boolean;
}
