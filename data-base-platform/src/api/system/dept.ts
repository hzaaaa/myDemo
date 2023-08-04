import http from "@/api";
import { PORTAuth } from "@/api/config/servicePort";

/**
 * @name 获取部门列表
 * @param Token 必须，token，String
 * @param deptName 非必须，部门模糊字段 String
 * @param deleted 非必须，是否有效；0-有效，1-无效，不传代表所有 Boolean
 * @param pageNum 必须，当前页，默认1，Integer
 * @param pageSize 必须，每页数量，默认10，Integer
 */

export const getDeptListApi = (params: any) => {
  return http.post<any>(PORTAuth + `/dept/getDeptList`, params);
  return http.post<any>(PORTAuth + `/dept/getDeptList`, {}, { params }); // post 请求携带 query 参数  ==>  ?username=admin&password=123456&type
};

/**
 * @name 获取部门负责人下拉选项
 * @param Token 必须，token，String
 * @param deptName 非必须，部门模糊字段 String
 */
export const getDeptSelectorsApi = (params: any) => {
  return http.get<any>(PORTAuth + `/dept/getDeptSelectors`, params);
  return http.get<any>(PORTAuth + `/dept/getDeptSelectors`, {}, { params }); // post 请求携带 query 参数  ==>  ?username=admin&password=123456&type
};

/**
 * @name 获取部门详情
 * @param Token 必须，token，String
 * @param deptId 必须，部门ID，Integer
 */
export const getDeptDetailsApi = (params: any) => {
  return http.get<any>(PORTAuth + `/dept/getDeptDetails`, params);
  return http.get<any>(PORTAuth + `/dept/getDeptDetails`, {}, { params }); // post 请求携带 query 参数  ==>  ?username=admin&password=123456&type
};

/**
 * @name 部门添加修改保存
 * @param Token 必须，token，String
 * @param deptId 新建不传，部门Id，Integer
 * @param deptName 必须，部门内名称，String
 * @param deptLeaderId 非必须，部门负责人Id，Integer
 * @param deleted 必须，是否有效；0-有效，1-无效，不传代表所有 Boolean
 */
export const postDeptUpdateApi = (params: any) => {
  return http.post<any>(PORTAuth + `/dept/editDept`, params);
  return http.post<any>(PORTAuth + `/dept/editDept`, {}, { params }); // post 请求携带 query 参数  ==>  ?username=admin&password=123456&type
};
