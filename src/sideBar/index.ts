// Arvinjun-sidebar.ts
// 自定义侧边栏入口和面板
import * as vscode from 'vscode';
import * as path from 'path';
import { MENU_TREE_DATA } from '../config';

type TViewItem = {
  command: string
  title: string
  hotKey: string
  icon?: string
};

/**
 * @description 重写每个节点
 */
export class SideBarEntryItem extends vscode.TreeItem {
  constructor(
    label: string,
    collapsibleState: vscode.TreeItemCollapsibleState,
    private hotKey?: string,
    private icon?: string,
  ) {
    super(label, collapsibleState);
    this.tooltip = `${this.label}-${this.hotKey}`;
    this.description = this.hotKey ? `【快捷键: ${this.hotKey}】` : '';
    this.iconPath = this.icon ? path.join(__dirname, "../../", "images", this.icon) : '';
  }
}

/**
 * @description 入口文件
 */
export class SideBarEntry implements vscode.TreeDataProvider<SideBarEntryItem> {
  public id: string;
  public rootSideBars: SideBarEntryItem[] = [];
  public context?: vscode.ExtensionContext;

  constructor(id: string, context?: vscode.ExtensionContext, rootSideBars?: SideBarEntryItem[]) {
    this.id = id,
    this.context = context;
    this.rootSideBars = rootSideBars || [];
    this.context = context;
  }

  getTreeItem(element: SideBarEntryItem): vscode.TreeItem {
    return element;
  }

  getChildren(
    element?: SideBarEntryItem
  ): vscode.ProviderResult<SideBarEntryItem[]> {
    const commands = MENU_TREE_DATA?.find((view: { id: string; }) => view.id === this.id)?.commands;
    //子节点
    var childrenList: any = [];
    commands?.forEach((item: TViewItem, index: number) => {
      const children = new SideBarEntryItem(
        item.title,
        vscode.TreeItemCollapsibleState.None,
        item.hotKey,
        item.icon,
      );
      children.command = {
        command: item.command,
        title: '',
        arguments: [], //命令接收的参数
      };
      childrenList[index] = children;
    });
    return childrenList;
  }
}

export default function (context: vscode.ExtensionContext) {
  // 注册侧边栏面板
  const sidebarArvinjunGeneral = new SideBarEntry('Arvinjun-General', context);
  const sidebarArvinjunPackageAnalysis = new SideBarEntry('Arvinjun-PackAnalysis', context);

  vscode.window.registerTreeDataProvider(
    sidebarArvinjunGeneral.id,
    sidebarArvinjunGeneral
  );
  vscode.window.registerTreeDataProvider(
    sidebarArvinjunPackageAnalysis.id,
    sidebarArvinjunPackageAnalysis
  );
};
