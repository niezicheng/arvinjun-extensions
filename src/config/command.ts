// 侧边栏菜单数据
export const MENU_TREE_DATA = [
  {
    id: 'Arvinjun-General',
    name: '通用',
    commands: [
      {
        command: 'general.helloWorld',
        title: 'hello world',
        icon: 'demo.svg'
      },
      {
        command: 'general.removeLog',
        hotKey: 'cmd+shift+d',
        title: 'remove console',
        icon: 'remove.svg'
      },
      {
        command: 'general.copyDirectoryToClipboard',
        hotKey: 'cmd+shift+c',
        title: 'copy directory to clipboard',
        icon: 'directory.svg'
      },
    ]
  },
  {
    id: 'Arvinjun-PackAnalysis',
    name: '包分析',
    commands: []
  }
];
