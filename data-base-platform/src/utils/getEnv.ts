/**
 * env 包装函数
 * @param env 自定义环境配置对象，配置的属性值默认字段串
 * @returns 包装后的自定义环境配置对象，将所有 "true""false" 转为布尔值
 */
export function wrapperEnv(env: Record<string, any>): ImportMetaEnv {
  const res: any = {};
  for (const envName of Object.keys(env)) {
    let envValue = env[envName];
    envValue = envValue === "true" ? true : envValue === "false" ? false : envValue;
    res[envName] = envValue;
  }
  return res;
}
