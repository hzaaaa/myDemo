import http from "@/api";
import { PORTAuth } from "@/api/config/servicePort";


/**
 * @name 获取后台账号列表
 * @param Token 必须，token，String
 * @param nickName 非必须，部门模糊字段 String
 * @param enabled 非必须，是否有效；0-未启用，1-已启用，不传代表所有 Integer
 * @param pageNum 必须，当前页，默认1，Integer
 * @param pageSize 必须，每页数量，默认10，Integer
 */

export const getUserListApi = (params: any) => {
  return http.get<any>(PORTAuth + `/user/list`, params);
  
};
/**
 * @name 3.1.1.5.6 获取用户下拉框
 */

export const getUserSelectorsApi = (params: any) => {
  return http.get<any>(PORTAuth + `/user/getUserSelectors`, params);
};

/**
 * @name 添加用户
 */

export const addUserApi = (params: any) => {
  return http.post<any>(PORTAuth + `/user/add`, params);
};
/**
 * @name 更新用户
 */

export const updateUserApi = (params: any) => {
  return http.post<any>(PORTAuth + `/user/update`, params);
};
/**
 * @name 删除用户
 */

export const deleteUserApi = (params: any) => {
  return http.post<any>(PORTAuth + `/user/delete`, params);
};

/**
 * @name 获取用户信息
 */
export const getUserDetailsApi = (params: any) => {
  return http.get<any>(PORTAuth + `/user/info`, params);
  
};



/**
 * 用户密码修改
 */
export const pwdChangeApi = (params: any) => {
  return http.post<any>(PORTAuth + `/user/password/update`, params);
};
/**
 *  管理员重置密码
 */
export const postUserPasswordResetApi = (params: any) => {
  return http.post<any>(PORTAuth + `/user/password/rest`, params);
};
