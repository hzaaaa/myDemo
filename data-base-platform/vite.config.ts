import { defineConfig, loadEnv, ConfigEnv, UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { wrapperEnv } from "./src/utils/getEnv";
import viteCompression from "vite-plugin-compression";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// @see: https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  // 各个 .env 文件中自定义的环境参数合并后的对象
  const env = loadEnv(mode, process.cwd());
  // viteEnv 为处理后的环境对象，将所有 "true""false"转为布尔值
  const viteEnv = wrapperEnv(env);
  console.log("viteEnv", viteEnv);

  return {
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@use "@/styles/element/index.scss" as *;`,
				},
			},
		},
    server: {
      // 服务器主机名，如果允许外部访问，可设置为 "0.0.0.0"
      host: "0.0.0.0",
      port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN,
      proxy: {
        "/api": {
          // target: "http://172.16.1.44:820",
          target: "http://172.16.1.44:8081",
          rewrite: (path) => path.replace(/\/api/, ""),
        },
        
      },
    },
    plugins: [
      vue(),
      // * 是否生成包预览(分析依赖包大小,方便做优化处理)
      // viteEnv.VITE_REPORT && visualizer(), // 需要引入 import { visualizer } from "rollup-plugin-visualizer";
      // gzip压缩 生产环境生成 .gz 文件
      viteEnv.VITE_BUILD_GZIP &&
        viteCompression({
          verbose: true,
          disable: false,
          threshold: 10240,
          algorithm: "gzip",
          ext: ".gz",
        }),
				AutoImport({
					imports: [
						"vue",
						"vue-router",
						{
							moment: [["default", "moment"]],
						},
					],
					resolvers: [ElementPlusResolver({ importStyle: "sass" })],
				}),
				Components({
					resolvers: [ElementPlusResolver({ importStyle: "sass" })],
				}),
    ],
    // 生产环境去除 console 和 debugger
    esbuild: {
      drop: viteEnv.VITE_DROP_CONSOLE ? ["console", "debugger"] : [],
    },
    build: {
      outDir: "dist",
      minify: "esbuild",
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
        },
      },
    },
  };
});
