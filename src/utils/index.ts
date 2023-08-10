import * as vscode from 'vscode';
import { FolderType } from '../types';

/**
 * @description 因为 vscode 支持 Multi-root 工作区，暴力解决
 * @summary 如果发现只有一个根文件夹，读取其子文件夹作为 workspaceFolders
 * @link https://code.visualstudio.com/docs/editor/multi-root-workspaces
 */
export const getWorkSpaceFolders = () => {
  const folders: FolderType[] = [];
  vscode?.workspace?.workspaceFolders?.forEach((folder: any) => {
    folders.push({
      name: folder.name,
      path: folder.uri.path,
    });
  });
  return folders;
};

