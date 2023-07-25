import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { wrapperEnv } from "./src/utils/getEnv";
import viteCompression from "vite-plugin-compression";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	// 各个 .env 文件中自定义的环境参数合并后的对象
	const env = loadEnv(mode, process.cwd());
	
	// viteEnv 为处理后的环境对象
	const viteEnv = wrapperEnv(env);
	
	return {
		resolve: {
			alias: {
				"@": fileURLToPath(new URL("./src", import.meta.url)),
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
			https: env.VITE_USER_NODE_ENV === "development_https" ?  {
				cert: fs.readFileSync( 'keys/cert.crt'),
				key: fs.readFileSync('keys/cert.key'),
			}:false,
			port: viteEnv.VITE_PORT,
			open: viteEnv.VITE_OPEN,
			proxy: {
				// "/api/auth/menu/list": {
				// 	target: " https://mock.mengxuegu.com/mock/6486d401ed3be37af65f1be7/mock",
				// 	changeOrigin: true,
				// 	rewrite: (path) => path.replace(/^\/api/, ""),
				// },
				// "/api/auth": {
				// 	target: " https://mock.mengxuegu.com/mock/6444e3a9dfa03133b0ca7f8f/api-proxy/mock",
				// 	// target: "http://172.16.1.44:9057",
				// 	changeOrigin: true,
				// 	rewrite: (path) => path.replace(/^\/api/, ""),
				// },
				"/api": {
					// target: " https://mock.mengxuegu.com/mock/6444e3a9dfa03133b0ca7f8f/api-proxy/mock",
					target: "http://172.16.1.44:9057",
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, ""),
				},
			},
		},
		plugins: [
			vue(),
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
		// test: {
		// 	// 启用类似 jest 的全局测试 API
		// 	globals: true,
		// 	// 使用 happy-dom 模拟 DOM
		// 	// 这需要你安装 happy-dom 作为对等依赖（peer dependency）
		// 	environment: 'happy-dom',
		// 	coverage: {
		// 		reporter: ['text', 'json', 'html'],
		// 	},
		// }
	};
});
