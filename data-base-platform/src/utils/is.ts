/**
 * @description 获取值的类型
 */
export const getType = (val: unknown) => Object.prototype.toString.call(val).slice(8, -1);

/**
 * @description 判断值是否为某种类型
 * @param val 需要判断类型的值
 * @returns boolean，是否为某种类型
 */
export const isString = (val: unknown): val is string => getType(val) === "String";
export const isDate = (val: unknown): val is Date => getType(val) === "Date";
export const isFunction = (val: unknown): val is Function => getType(val) === "Function";
export const isArray = (val: unknown): val is Array<any> => Array.isArray(val);
