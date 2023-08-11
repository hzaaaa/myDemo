import http from "@/api";
import { PORTAuth } from "@/api/config/servicePort";
import AuthRouteList from "@/assets/json/AuthRouteList.json";
import { rejects } from "assert";
import { resolve } from "path";
import {useDataBase} from '@/stores/dataBase'


/**
 * @name 获取角色权限树
 * @param roleId 角色 ID, 非必须
 * @param roleName 角色名称, 支持模糊查询, 非必须。如果 roleId 和 roleName 都不传则取当前用户 roleId 查询
 */
export const getMenuTreeApi = (params?: any) => {
  return new Promise((resolve,reject)=>{
    let dataBaseStore =useDataBase();
    getResourceCatalogApi().then((res:any)=>{
      
      console.log('getResourceCatalogApi',res)
      let list = res.data||[];
      let arr =<any>[];
      for(let item of list){
        let obj = {
          "path": "/dataManagement/"+item.name,
          "name": item.name,
          "component": "/dataManagement/dataQuery/index",
          "meta": {
            "icon": "icon-odbc",
            "title": item.name,
            "isKeepAlive": true,
            "isHide": false
          },
          "children": [
            
          ]
        }
        arr.push(obj)
      }
      AuthRouteList.data[0].children = arr;
      if(arr.length===0){
        AuthRouteList.data[0].redirect ='';
      }else{
        AuthRouteList.data[0].redirect = arr[0].path;
      }
      dataBaseStore.setDataBaseList(res.data)
      resolve(AuthRouteList)
    })
  })
  console.log('AuthRouteList',AuthRouteList)
  
  // for(let i=0;i<10;i++){
  //   let obj = {
  //     "path": "/dataManagement/dataQuery"+i,
  //     "name": "dataQuery"+i,
  //     "component": "/dataManagement/dataQuery/index",
  //     "meta": {
  //       "title": "数据库"+i,
  //       "isKeepAlive": true,
  //       "isHide": false
  //     },
  //     "children": [
        
  //     ]
  //   }
  //   arr.push(obj)

  // }
  
  
  return Promise.resolve(AuthRouteList);
  // return http.post<any>(PORTAuth + `/menu/getMenuTree`, params);
};

/**
 * @name 获取角色的菜单ID
 * @param roleId 角色 ID, 非必须
 */
export const getMenuIdApi = (params?: any) => {
  return http.get<any>(PORTAuth + `/menu/id`, params);
};

/**
 * @name 获取当前用户所能查看的权限树
 * @param username 用户名
 */
export const getMenuTreeUserApi = (params?: any) => {
  return http.get<any>(PORTAuth + `/menu/menuTree/user`, params);
};
/**
 *  获取库表字段库
 */
export const getResourceCatalogApi = (params?: any) => {
  return http.get<any>(PORTAuth + `/table/getResourceCatalog`, params);
};

