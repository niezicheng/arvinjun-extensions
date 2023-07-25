// Arvinjun-sidebar.ts
// 自定义侧边栏入口和面板
import * as vscode from 'vscode';
import { newViews } from '../config';

type TViewItem = {
  command: string
  title: string
  hotKey: string
};

/**
 * @description 重写每个节点
 */
export class SideBarEntryItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    private hotKey?: string,
  ) {
    super(label, collapsibleState);
    this.tooltip = `${this.label}-${this.hotKey}`;
    this.description = this.hotKey ? `【快捷键: ${this.hotKey}】` : '';
  }
}

/**
 * @description 入口文件
 */
export class SideBarEntry implements vscode.TreeDataProvider<SideBarEntryItem> {
  public id: string;
  public command: string;
  public rootSideBars: SideBarEntryItem[] = [];
  constructor(id: string, command: string, rootSideBars?: SideBarEntryItem[]) {
    this.id = id,
    this.command = command;
    this.rootSideBars = rootSideBars || [];
  }

  getTreeItem(element: SideBarEntryItem): vscode.TreeItem {
    return element;
  }

  getChildren(
    element?: SideBarEntryItem
  ): vscode.ProviderResult<SideBarEntryItem[]> {

    if (element) {
      const commands = newViews?.find((view: { id: string; }) => view.id === this.id)?.commands;
      //子节点
      var childrenList: any = [];
      commands?.forEach((item: TViewItem, index: number) => {
        const children = new SideBarEntryItem(
          item.title,
          vscode.TreeItemCollapsibleState.None,
          item.hotKey,
        );
        children.command = {
          command: this.command, //命令id
          title: item.title,
          arguments: [item.command], //命令接收的参数
        };
        childrenList[index] = children;
      });
      return childrenList;
    } else {
      //根节点
      return this.rootSideBars.map(sideBar =>  new SideBarEntryItem(
        sideBar.label,
        sideBar.collapsibleState,
      ));
    }
  }
}

export default function (context: vscode.ExtensionContext) {
  const generalSideBars = [{ label: '测试', collapsibleState: vscode.TreeItemCollapsibleState.Collapsed }];
  // 注册侧边栏面板
  const sidebarArvinjunGeneral = new SideBarEntry('Arvinjun-General', 'Arvinjun-General.openChild', generalSideBars);
  const sidebarArvinjunPackageAnalysis = new SideBarEntry('Arvinjun-PackAnalysis', 'Arvinjun-PackAnalysis.openChild');

  vscode.window.registerTreeDataProvider(
    sidebarArvinjunGeneral.id,
    sidebarArvinjunGeneral
  );
  vscode.window.registerTreeDataProvider(
    sidebarArvinjunPackageAnalysis.id,
    sidebarArvinjunPackageAnalysis
  );

  //注册命令
  const arvCommand = vscode.commands.registerCommand(sidebarArvinjunGeneral.command, (args) => {
    // 执行命令
    vscode.commands.executeCommand(args);
  });

  const arvPackAnalysis = vscode.commands.registerCommand(
    'Arvinjun-PackAnalysis.openChild',
    (args) => {
      console.log('[Arvinjun-PackAnalysis.openChild] 当前选中的是:', args);
      vscode.window.showInformationMessage(args);
    }
  );

  return {
    arvCommand,
    arvPackAnalysis
  };
};
