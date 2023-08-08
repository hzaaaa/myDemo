import http from "@/api";
import { PORTAuth } from "@/api/config/servicePort";

/**
 * @name 3.3.1 角色添加
 */
export const addRoleApi = (params: any) => {
  return http.post<any>(PORTAuth + `/role/add`, params);
  
};
/**
 * @name 3.3.4 角色修改
 */
export const updateRoleApi = (params: any) => {
  return http.post<any>(PORTAuth + `/role/update`, params);
  
};

/**
 * @name  角色列表
 */
export const getRoleListApi = (params: any) => {
  return http.get<any>(PORTAuth + `/role/list`, params);
  
};
/**
 * @name  删除角色
 */
export const deleteRoleApi = (params: any) => {
  return http.post<any>(PORTAuth + `/role/delete`, params);
  
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
 */
export const getRoleDetailsApi = (params: any) => {
  return http.get<any>(PORTAuth + `/role/info`, params);
  
};


/**
 * 3.1.1.5.4 获取角色下拉框
 */
export const getRoleSelectorsApi = (params: any) => {
  return http.get<any>(PORTAuth + `/role/getRoleSelectors`, params);
};
