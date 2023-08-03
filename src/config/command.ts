// 侧边栏菜单数据
export const MENU_TREE_DATA = [
  {
    id: 'Arvinjun-General',
    name: '通用',
    commands: [
      {
        command: 'general.helloWorld',
        hotKey: '',
        title: 'hello world',
        icon: 'demo.svg'
      },
      {
        command: 'general.removeLog',
        hotKey: 'cmd+shift+d',
        title: 'remove console',
        icon: 'remove.svg'
      },
    ]
  },
  {
    id: 'Arvinjun-PackAnalysis',
    name: '包分析',
    commands: []
  }
];
