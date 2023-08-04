import router from "@/routers/index";
import { useAuthStore } from "@/stores/auth";
import { useUserStore } from "@/stores/user";
import { isString } from "@/utils/is";
import { ElMessage } from "element-plus";

/**
 * 引入 views 目录下所有 .vue 文件
 */
const viewsModules = import.meta.glob("@/views/**/*.vue");

/**
 * 初始化动态路由，解决刷新时路由丢失问题
 */
export const initDynamicRoutes = async () => {
  const authStore = useAuthStore();
  const userStore = useUserStore();

  try {
    // debugger
    // 1. 获取菜单列表 && 按钮权限列表
    await authStore.getAuthRouteList(userStore.roleIdGet);
    // await authStore.getAuthButtonList();
    
    // 2. 判断当前用户有无菜单权限
    if (!authStore.authRouteListGet.length) {
      ElMessage.warning("当前账号无任何菜单权限，请联系系统管理员！");
      userStore.$reset();
      router.replace("/login");
      return Promise.reject("无菜单权限");
    }
    
    // 3. 添加动态路由
    authStore.flatRouteListGet.forEach((item: any) => {
      item.children && delete item.children;
      if (item.component && isString(item.component)) {
        item.component = viewsModules[`/src/views${item.component}.vue`];
      }
      // debugger
      if(!item.path){
        return ;
      }
      if (item.meta?.isFull) router.addRoute(item);
      else router.addRoute("Layout", item);
    });
    
  } catch (error) {
    // 当菜单或按钮权限请求出错时，重定向到登录页
    userStore.$reset();
    router.replace("/login");
    return Promise.reject(error);
  }
};

/**
 * @description 使用递归扁平化树状路由，用于添加动态路由
 * @param {Array} routeList 树状路由列表
 */
export function getFlatRouteList(routeList: RouteItem[]): RouteItem[] {
  let newRouteList: RouteItem[] = JSON.parse(JSON.stringify(routeList));
  return newRouteList.flatMap((item) => [item, ...(item.children ? getFlatRouteList(item.children) : [])]);
  // return newRouteList.reduce((pre, cur) => [...pre, cur, ...(cur.children ? getFlatRouteList(cur.children) : [])], <any>[]);
}

/**
 * @description 左侧菜单栏渲染，树状结构，剔除 isHide == true
 * @param {Array} routeList 树状路由列表
 */
export function getShowMenuList(routeList: RouteItem[]): RouteItem[] {
  let newRouteList: RouteItem[] = JSON.parse(JSON.stringify(routeList));
  return newRouteList.filter((item) => {
    item.children?.length && (item.children = getShowMenuList(item.children));
    return !item.meta?.isHide;
  });
}

/**
 * @description 使用递归找出所有面包屑存储到 pinia/vuex 中
 * @param {Array} routeList 菜单列表
 * @param {Array} parent 父级菜单
 * @param {Object} result 处理后的结果
 */
export const getAllBreadcrumbList = (routeList: RouteItem[], result: { [key: string]: any } = {}, parent = []) => {
  for (const item of routeList) {
    result[item.path] = [...parent, item];
    if (item.children) getAllBreadcrumbList(item.children, result, result[item.path]);
  }
  return result;
};

/**
 * @description 将后端传过来的菜单格式化为前端期望的菜单结构
 * @param {Array} backOriginMenu 后端传的原始菜单
 * @param {Object} result 处理后的结果
 */
export const menuFormat = (backOriginMenu: any[]) => {
  return backOriginMenu;
  return getTransformedRoute(backOriginMenu);
};

const getTransformedRoute = (OriginRouteList: any[], resRouteList: any[] = []) => {
  OriginRouteList.forEach((m: any) => {
    const res: any = {};
    // 后端 component ==> 路由 path, 以及 component
    res.path = m.component +'/'+m.router;
    res.meta = m.meta;
    // 后端 router ==> 路由 name
    res.name = m.router;
    // 后端 redirect ==> redirect
    if (m.redirect) res.redirect = m.redirect;
    else res.component = m.component;
    // 后端 icon ==> 路由 meta，需要 JSON.parse 解析
    if (m.icon) {
      try {
        res.meta = JSON.parse(m.icon);
      } catch (error) {
        console.error(error);
      }
    }
    // 后端 childrenList ==> childrent
    if (m.childrenList) res.children = getTransformedRoute(m.childrenList);
    resRouteList.push(res);
  });
  return resRouteList;
};

/**
 * @description 跳转到动态路由第一个可访问的路由
 * @param {Array} dynamicRoutes
 */
export const routerToFirstPage = () => {
  const authStore = useAuthStore();
  let temp = getFirstRoute(authStore.authRouteList);
  
  router.push(temp);
};

const getFirstRoute = (routes: any): any => {
  for (let route of routes) {
    if (route.children) {
      let result = getFirstRoute(route.children);
      if(result.component){
        return result
      }
    } 
    if (route.path) return { path: route.path };
    if (route.name) return { name: route.name };
    return {};
  }
};
