import http from "@/api";
import { PORTAuth } from "@/api/config/servicePort";
import AuthRouteList from "@/assets/json/AuthRouteList.json";
import loginJSON from "@/assets/json/loginApi.json";

/**
 * @name 登录模块
 */
export const loginApi = (params: Login.ReqLoginForm) => {
  // console.warn("调用 login 接口");
  // return Promise.resolve(loginJSON);
  return http.post<Login.ResLogin>(PORTAuth + `/auth/login`, params);
  return http.post<Login.ResLogin>(PORTAuth + `/auth/login`, {}, { params }); // post 请求携带 query 参数  ==>  ?username=admin&password=123456&type
};

/**
 * @name 退出登录
 */
export const logoutApi = () => {
  return http.post(PORTAuth + `/auth/logout`);
};

/**
 * @name 获取菜单列表
 */
export const getAuthRouteListApi = () => {
  // return http.get<RouteItem[]>(PORTAuth + `/menu/list`);
  
  return Promise.resolve(AuthRouteList);
};

/**
 * @name 获取按钮权限列表
 */
export const getAuthButtonListApi = () => {
  return http.get<string[]>(PORTAuth + `/menu/user/permission`);
  // return Promise.resolve(AuthButtonList);
};
