/**
 * @description 复制文本内容到剪贴板
 * @param text 需要复制的文本内容
 */
export function copyTextToClipboard(text: string) {
  if (navigator.clipboard) {
    // 新api，安全限制较多，https 或 localhost 才可用
    navigator.clipboard.writeText(text);
  } else {
    // 传统api，随时可能会废弃
    const tempInput = document.createElement("input");
    tempInput.setAttribute("value", text);
    document.body.append(tempInput);
    tempInput.select();
    document.execCommand("copy");
    tempInput.remove();
  }
}
