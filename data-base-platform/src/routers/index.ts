import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useUserStore } from "@/stores/user";
import { staticRoutes, errorRoutes } from "@/routers/route";
import { initDynamicRoutes } from "@/routers/backEnd";
import abortController from "@/api/abort";

const router = createRouter({
  history: createWebHistory(),
  routes: [...staticRoutes, ...errorRoutes],
});

/**
 * @description 全局前置路由守卫
 */
router.beforeEach(async (to, from, next) => {
  
  console.log("from==>", from);
  console.log("to====>", to);
  console.log("router", router, router.getRoutes());
  // 进入下一页面前，取消所有 pending 中的请求
  abortController.cancleAllPending();
  const authStore = useAuthStore();
  const userStore = useUserStore();
  
  // 1. 如果访问登录页，有 token 停留在当前页，没有 token 清空路由缓存并重定向到登录页
  if (to.path.startsWith("/login")) {
    
    if (userStore.token) return next(from.fullPath);
    authStore.$reset();
    return next();
  }
  
  // 2. 判断是否有 token，没有则重定向到登录页
  if (!userStore.token) return next({ path: "/login", replace: true });
  
  // 3. 如果没有菜单列表，重新请求菜单列表并添加动态路由（手动刷新、输入地址跳转时）
  
  if (!authStore.authRouteListGet.length) {
    
    await initDynamicRoutes();
    return next({ ...to, replace: true });
  }

  // 4. 正常访问页面
  next();
});

export default router;
