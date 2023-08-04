// 请求响应参数(不包含data)
declare interface Result {
  code: number;
  msg: string;
}

// 请求响应参数(包含data)
declare interface ResultData<T> extends Result {
  data: T;
}

// * 登录模块 interface
declare namespace Login {
  interface ReqLoginForm {
    username: string;
    password: string;
    type?: number;
    captchaId?: string;
    code?: string;
  }
  interface ResLogin {
    token: string;
    [key: string]: any;
  }
  interface ResCaptcha {
    captchaId: string;
    img: string;
  }
}
