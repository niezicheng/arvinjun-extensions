import * as vscode from 'vscode';
import sideBar from './sideBar';
import removeLog from './general/removeLog';
import helloWorld from './general/helloWorld';
import copyDirectory from './general/copyDirectory';

// 您的扩展在激活时被调用
export function activate(context: vscode.ExtensionContext) {
	sideBar(context);
	// 需要时正确地订阅管理和注销这些资源【防止内存泄漏和资源消耗过度】
	context.subscriptions.push(helloWorld, removeLog, copyDirectory);
}

// 您的扩展在被停用时被调用
export function deactivate() {}
