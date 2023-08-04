// AuthStore
declare interface AuthStore {
  authButtonList: string[];
  authRouteList: RouteItem[];
}

// UserStore
declare interface UserStore {
  id: number | null;
  token: string;
  username: string;
  nickname?: string;
  deptId?: number;
  roleId?: number;
  behavior: "" | "add" | "modify"; // 用户操作，add | modify
}

// ThemeStore
declare interface ThemeStore {
  isCollapse: boolean; // 折叠菜单
  breadcrumb: boolean; // 面包屑导航
  breadcrumbIcon: boolean; // 面包屑导航图标
  tabs: boolean; // 是否展示标签栏
  tabsIcon: boolean; // 是否显示标签页图标
  layout: "vertical" | "classic" | "transverse" | "columns"; // 布局切换，默认 vertical
}

// TabsStore
declare interface TabsStore {
  tabsMenuList: TabsProps[];
}
declare interface TabsProps {
  icon: string; // 标签页的图标
  title: string; // 标签页的标题
  // path: string; // 标签页的路径
  name: string; // 标签页对应的路由名
  close: boolean; // 标签页是否可删除
}

// KeepAliveStore
declare interface KeepAliveStore {
  keepAliveName: string[];
}
