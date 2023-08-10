import * as vscode from 'vscode';
import { getWorkSpaceFolders } from '../utils';

// 需要排除的文件夹
const excludeList = ['.git'];

/**
 * 读取文件夹目录并将内容复制到剪切板 copyDirectoryToClipboard
 */
const copyDirectoryToClipboard = vscode.commands.registerCommand('general.copyDirectoryToClipboard', () => {
  // 得到 vscode 所有工程项目
  const folderList = getWorkSpaceFolders();
  // 读取文件夹目录并将内容复制到剪切板
  vscode.window.showQuickPick(folderList.map(item => item.name)).then((res) => {
    if (!res) {
      return;
    }
    // 选择工程项目
    const folder = folderList.find(item => item.name === res);
    if (!folder) {
      return;
    }
    // 读取文件夹目录
    const dirTree = require("directory-tree");
    const tree = dirTree(folder.path);
    // 递归读取文件夹目录
    const readDir = (tree: any) => {
      let text = '';
      if (tree.children) {
        tree.children.forEach((item: any) => {
          text += readDir(item);
        });
      } else {
        // 去除 folder.path 前缀
        text = tree.path?.replace(folder.path, folder.name) + '\n';
      }
      return text;
    };

    const rootDirTree = tree?.children || [];
    // 过滤 folder.path 下 .gitignore 文件内所有的目录及文件
    const gitignore = require('parse-gitignore');
    const gitignoreList = [...gitignore(`${folder.path}/.gitignore`)?.patterns || [], ...excludeList];
    const rootDir = rootDirTree.filter((item: any) => !gitignoreList.some((val: string) => val?.includes(item?.name)));
    // 循环读取文件夹目录
    const text = rootDir.reduce((prev: string, curr: any) => {
      return prev + readDir(curr);
    }, '');

    // 复制到剪切板
    vscode.env.clipboard.writeText(text);
    vscode.window.showInformationMessage(`${folder.name} project directory copy to clipboard success!`);
  });
});

export default copyDirectoryToClipboard;
