// 工程文件类型
export interface FolderType {
  name: string
  path: string
}

// 侧边栏菜单数据
export type TViewItem = {
  id: string;
  name: string;
  commands: TCommand[];
};

// 侧边栏菜单数据
export type TCommand = {
  command: string
  title: string
  hotKey: string
};

// 侧边栏菜单数据
export type TView = TViewItem[];
