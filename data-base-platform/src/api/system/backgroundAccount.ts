import http from "@/api";
import { PORTAuth } from "@/api/config/servicePort";
import { Account, UserDetail, UpdateUser } from "@/api/interface";

/**
 * @name 获取后台账号列表
 * @param Token 必须，token，String
 * @param nickName 非必须，部门模糊字段 String
 * @param enabled 非必须，是否有效；0-未启用，1-已启用，不传代表所有 Integer
 * @param pageNum 必须，当前页，默认1，Integer
 * @param pageSize 必须，每页数量，默认10，Integer
 */

export const getUserListApi = (params: Account.AccountFixList) => {
  return http.post<any>(PORTAuth + `/user/getUserList`, params);
  return http.post<any>(PORTAuth + `/user/getUserList`, {}, { params }); // post 请求携带 query 参数  ==>  ?username=admin&password=123456&type
};
/**
 * @name 3.1.1.5.6 获取用户下拉框
 */

export const getUserSelectorsApi = (params: any) => {
  return http.get<any>(PORTAuth + `/user/getUserSelectors`, params);
};

/**
 * @name 获取用户详情
 * @param Token 必须，token，String
 * @param userId 必须，员工ID，Integer
 */
export const getUserDetailsApi = (params: UserDetail.UserForm) => {
  return http.get<UserDetail.UserFixDetail>(PORTAuth + `/user/getUserDetails`, params);
  return http.get<UserDetail.UserFixDetail>(PORTAuth + `/user/getUserDetails`, {}, { params }); // post 请求携带 query 参数  ==>  ?username=admin&password=123456&type
};

/**
 * @name 用户添加修改保存
 * @param Token 必须，token，String
 * @param userId 新建不传，用户Id，Integer
 * @param username 编辑不传，用户账号，String
 * @param nickName 必须，姓名，String
 * @param phone 非必须，手机号，String
 * @param email 非必须，邮箱，String
 * @param newPwd 新建必须传，密码，String
 * @param deptId 必须，部门Id，Integer
 * @param roleId 必须，角色Id，Integer
 * @param enabled 必须，是否启用；0-未启用，1-已启用，不传代表所有 Integer
 */
export const postUserUpdateApi = (params: UpdateUser.UpdateUserFixList) => {
  return http.post<any>(PORTAuth + `/user/editUser`, params);
  return http.post<any>(PORTAuth + `/user/editUser`, {}, { params }); // post 请求携带 query 参数  ==>  ?username=admin&password=123456&type
};

/**
 * 用户密码修改
 * @param oldPwd 旧密码，必须
 * @param newPwd 新密码，必须
 */
export const pwdChangeApi = (params: any) => {
  return http.post<any>(PORTAuth + `/user/pwdChange`, params);
};
