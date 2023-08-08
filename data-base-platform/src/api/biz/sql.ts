import http from "@/api";
import { PORTBiz,PORTAuth } from "@/api/config/servicePort";

/**
 * @name  与hive数据库同步库表字段信息
 */

export const getDatabaseApi = (params: any) => {
  return http.get<any>(PORTBiz + `/table/getDatabase`, params,{
    timeout:5*60*1000
  });
};

/**
 * @name  查询sql
 */

export const executeApi = (params: any) => {
  return http.post<any>(PORTBiz + `/query/execute`,params,{
    params,
    timeout:5*60*1000
  });
};
/**
 * @name  查询历史记录
 */

export const queryHistoryApi = (params: any) => {
  return http.get<any>(PORTBiz + `/query/queryHistory`,params,{
    timeout:5*60*1000
  });
};
/**
 * @name  更新字段注释
 */

export const updateColumnCommentApi = (params: any) => {
  return http.post<any>(PORTBiz + `/table/updateColumnComment`,params,{
    timeout:5*60*1000
  });
};
/**
 * @name  更新表注释
 */

export const updateTableCommentApi = (params: any) => {
  return http.post<any>(PORTBiz + `/table/updateTableComment`,params,{
    timeout:5*60*1000
  });
};
/**
 * @name  更新库注释
 */

export const updateDatabaseCommentApi = (params: any) => {
  return http.post<any>(PORTBiz + `/table/updateDatabaseComment`,params,{
    timeout:5*60*1000
  });
};

