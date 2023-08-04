declare interface RouteItem {
  path: string; // 路由地址栏路径
  name: string; // 路由别名
  component?: string | (() => Promise); // 项目中组件路径
  redirect?: string; // 重定向地址
  meta: MetaProps; // 路由信息
  children?: RouteItem[]; // 子路由
}

declare interface MetaProps {
  icon: string; // 菜单图标
  title: string; // 菜单标题
  isKeepAlive: boolean; // 是否缓存
  isHide?: boolean; // 是否隐藏
  activeMenu?: string; // 当前路由为详情页时，需要高亮的菜单
  isAffix?: boolean; // 是否固定在标签栏
  isFull?: boolean; // 是否全屏（示例：数据大屏页面）
  isLink?: string; // 是否外链
}
