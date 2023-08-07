// api/index.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { useUserStore } from "@/stores/user";
import router from "@/routers";
import { ElMessage } from "element-plus";
import { isFunction } from "@/utils/is";
import { ResultEnum } from "@/types/httpEnum";
import abortController from "@/api/abort";

const config = {
  // 默认地址请求地址，可在 .env 开头文件中修改
  baseURL: import.meta.env.VITE_API_URL,
  // 设置超时时间（单位 ms）
  timeout: ResultEnum.TIMEOUT as number,
};
const noAbortControllerUrl =<any> {
  // "/marketing/biz/bill":true,
  
  //待添加
}
class RequestHttp {
  service: AxiosInstance;
  constructor(config: AxiosRequestConfig) {
    // 实例化 axios
    this.service = axios.create(config);

    /**
     * @description 请求拦截器
     * 客户端发送请求 -> [请求拦截器] -> 服务器
     * token校验: 接受服务器返回的token,存储到vuex/pinia/本地储存当中
     */
    this.service.interceptors.request.use(
      (config: any) => {
        const userStore = useUserStore();
        const token: string = userStore.token;
        // debugger
        // [取消请求控制器]中添加请求
        if(!noAbortControllerUrl[config.url]){

          // abortController.addPending(config);
        }
        // 给每个请求添加 Authorization 请求头，将用户 token 传到后端
        if (token && config.headers && isFunction(config.headers.set)) {
          config.headers.set("Authorization", `Bearer ${token}`);
        }
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    /**
     * @description 响应拦截器
     *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
     */
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        if (response.headers["content-disposition"]) {
          return response;
        }
        const { data, config } =<any> response;
        // [取消请求控制器]中移除请求
        if(!noAbortControllerUrl[config.url]){
          // abortController.canclePending(config);
        }

        const userStore = useUserStore();
        // 登录失效
        if (data.code === ResultEnum.OVERDUE||data.msg==='login expire') {
          userStore.$reset();
          router.replace("/login");
          ElMessage.error(data.msg);
          return Promise.reject(data);
        }
        // 全局错误信息拦截
        if (data.code && data.code !== ResultEnum.SUCCESS) {
          ElMessage.error(data.msg);
          return Promise.reject(data);
        }
        // 请求成功或者后端直接返回数据流时，返回数据
        // debugger
        // if(data.data&&data.code&&data.msg){
        //   return data.data
        // }
        // debugger
        return data;
      },
      (error: AxiosError) => {
        const { message } = error;
        if (message.includes("timeout")) ElMessage.error("请求超时！请您稍后重试");
        if (message.includes("Network Error")) ElMessage.error("网络错误！请您稍后重试");
        return Promise.reject(error);
      }
    );
  }

  /**
   * @description 常用请求方法封装
   */
  get<T>(url: string, params?: object, _config = {}): Promise<ResultData<T>> {
    return this.service.get(url, { params, ..._config });
  }
  post<T>(url: string, params?: object, _config = {}): Promise<ResultData<T>> {
    if(_config){
      // console.log('_config',_config)
    }
    return this.service.post(url, params, _config);
  }
}

export default new RequestHttp(config);
