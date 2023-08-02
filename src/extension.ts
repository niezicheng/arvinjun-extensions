import * as vscode from 'vscode';
import sideBar from './sideBar';
import removeLog from './general/removeLog';
import helloWorld from './general/helloWorld';

export function activate(context: vscode.ExtensionContext) {
	sideBar(context);
	// 需要时正确地管理和注销这些资源【防止内存泄漏和资源消耗过度】
	context.subscriptions.push(removeLog, helloWorld);
}

export function deactivate() {}
