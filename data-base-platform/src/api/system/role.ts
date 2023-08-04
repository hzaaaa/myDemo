import http from "@/api";
import { PORTAuth } from "@/api/config/servicePort";

/**
 * @name 获取角色列表
 * @param Token 必须，token，String
 * @param roleName 非必须，角色名称模糊字段 String
 */

export const getRoleListApi = (params: any) => {
  return http.post<any>(PORTAuth + `/role/getRoleList`, params);
  return http.post<any>(PORTAuth + `/role/getRoleList`, {}, { params }); // post 请求携带 query 参数  ==>  ?username=admin&password=123456&type
};

/**
 * @name 角色权限
 * @param Token 必须，token，String
 * @param roleId 非必须，角色Id，Integer，如果roleID 和 roleName 都不传，则系统会自动选取当前用户的roleId进行查询
 * @param roleName 非必须，角色名称支持模糊查询，String
 */
// export const getMenuTreeApi = (params: any) => {
//     return http.post<any>(PORTAuth + `/menu/getMenuTree`, params);
// };
export const getMenuTreeApi = (params: any) => {
  return http.post<any>(PORTAuth + `/menu/getMenuTree`, params);
  return http.post<any>(PORTAuth + `/menu/getMenuTree`, {}, { params }); // post 请求携带 query 参数  ==>  ?username=admin&password=123456&type
};

/**
 * @name 获取角色详情
 * @param Token 必须，token，String
 * @param roleId 必须，角色ID，Integer
 */
export const getRoleDetailsApi = (params: any) => {
  return http.get<any>(PORTAuth + `/role/getRoleDetails`, params);
  return http.get<any>(PORTAuth + `/role/getRoleDetails`, {}, { params }); // post 请求携带 query 参数  ==>  ?username=admin&password=123456&type
};

/**
 * @name 角色添加修改保存
 * @param Token 必须，token，String
 * @param roleId 新建不传，角色Id，Integer
 * @param roleName 必须，角色名称，String
 * @param description 非必须，备注，String
 * @param menuIdList 必须，角色菜单列表，List<Integer>
 */
export const postRoleUpdateApi = (params: any) => {
  return http.post<any>(PORTAuth + `/role/editRole`, params);
  return http.post<any>(PORTAuth + `/role/editRole`, {}, { params }); // post 请求携带 query 参数  ==>  ?username=admin&password=123456&type
};
/**
 * 3.1.1.5.4 获取角色下拉框
 */
export const getRoleSelectorsApi = (params: any) => {
  return http.get<any>(PORTAuth + `/role/getRoleSelectors`, params);
};
