import { ElMessage } from "element-plus";

/**
 * @description hex颜色转rgb颜色 '#a0a1a2' => [160, 161, 162]
 * @param {String} str 颜色值字符串
 * @returns {Number[]} 返回处理后的颜色值数组
 */
export function hexToRgb(str: string) {
  let hexs: any = "";
  let reg = /^\#?[0-9A-Fa-f]{6}$/;
  if (!reg.test(str)) return ElMessage.warning("输入错误的hex");
  str = str.replace("#", "");
  hexs = str.match(/../g);
  for (let i = 0; i < 3; i++) hexs[i] = parseInt(hexs[i], 16);
  return hexs;
}

/**
 * @description rgb颜色转Hex颜色
 * @param {*} r 代表红色
 * @param {*} g 代表绿色
 * @param {*} b 代表蓝色
 * @returns {String} 返回处理后的颜色值
 */
export function rgbToHex(r: any, g: any, b: any) {
  let reg = /^\d{1,3}$/;
  if (!reg.test(r) || !reg.test(g) || !reg.test(b)) return ElMessage.warning("输入错误的rgb颜色值");
  let hexs = [r.toString(16).padStart(2, 0), g.toString(16).padStart(2, 0), b.toString(16).padStart(2, 0)];
  return `#${hexs.join("")}`;
}

/**
 * @description 加深颜色值
 * @param {String} color 颜色值字符串
 * @param {Number} level 加深的程度，限0-1之间
 * @returns {String} 返回处理后的颜色值
 */
export function getDarkColor(color: string, level: number) {
  let reg = /^\#?[0-9A-Fa-f]{6}$/;
  if (!reg.test(color)) return ElMessage.warning("输入错误的hex颜色值");
  let rgb = hexToRgb(color);
  for (let i = 0; i < 3; i++) rgb[i] = Math.round(20.5 * level + rgb[i] * (1 - level));
  return rgbToHex(rgb[0], rgb[1], rgb[2]);
}

/**
 * @description 变浅颜色值
 * @param {String} color 颜色值字符串
 * @param {Number} level 加深的程度，限0-1之间
 * @returns {String} 返回处理后的颜色值
 */
export function getLightColor(color: string, level: number) {
  let reg = /^\#?[0-9A-Fa-f]{6}$/;
  if (!reg.test(color)) return ElMessage.warning("输入错误的hex颜色值");
  let rgb = hexToRgb(color);
  for (let i = 0; i < 3; i++) rgb[i] = Math.round(255 * level + rgb[i] * (1 - level));
  return rgbToHex(rgb[0], rgb[1], rgb[2]);
}

// 修改主题色
export function changePrimary(targetColor: string) {
  document.documentElement.style.setProperty("--el-color-primary", targetColor);
  document.documentElement.style.setProperty("--el-color-primary-dark-2", `${getDarkColor(targetColor, 0.3)}`);
  for (let i = 1; i <= 9; i++) {
    const primaryColor = `${getLightColor(targetColor, i / 10)}`;
    document.documentElement.style.setProperty(`--el-color-primary-light-${i}`, primaryColor);
  }
}
export function changeWarning(targetColor: string) {
  document.documentElement.style.setProperty("--el-color-warning", targetColor);
  document.documentElement.style.setProperty("--el-color-warning-dark-2", `${getDarkColor(targetColor, 0.3)}`);
  for (let i = 1; i <= 9; i++) {
    const warningColor = `${getLightColor(targetColor, i / 10)}`;
    document.documentElement.style.setProperty(`--el-color-warning-light-${i}`, warningColor);
  }
}
