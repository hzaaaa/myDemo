import { RouteRecordRaw } from "vue-router";

/**
 * 定义静态路由（默认路由）
 * 此路由不要动，前端添加路由的话，请在 `dynamicRoutes 数组` 中添加
 * @description 前端控制直接改 dynamicRoutes 中的路由，后端控制不需要修改，请求接口路由数据时，会覆盖 dynamicRoutes 第一个顶级 children 的内容
 * @returns 返回路由菜单数据
 */
export const staticRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/sysManagement/backgroundAccountManagement/index",
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录",
    },
  },
  {
    path: "/layout",
    name: "Layout",
    component: () => import("@/layouts/Layout.vue"),
    redirect: "/sysManagement/backgroundAccountManagement/index",
    children: [],
  },
  {
    path: "/baseinfo",
    component: () => import("@/layouts/Layout.vue"),
    children: [
      {
        path: "",
        name: "baseinfo",
        component: () => import("@/views/info/Info.vue"),
      },
    ], // 注意这里要带上 文件后缀.vue
  },
  
];

/**
 * errorRouter (错误页面路由)
 */
export const errorRoutes = [
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/errorPage/404.vue"),
    meta: {
      title: "404页面",
    },
  },
  {
    path: "/500",
    name: "500",
    component: () => import("@/views/errorPage/500.vue"),
    meta: {
      title: "500页面",
    },
  },
  // Resolve refresh page, route warnings
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/errorPage/404.vue"),
  },
];
