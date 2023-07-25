import * as vscode from 'vscode';
import treeView from './treeView';
import removeLog from './general/removeLog';
import helloWorld from './general/helloWorld';

export function activate(context: vscode.ExtensionContext) {
	const { arvCommand, arvPackAnalysis} = treeView(context);
	// 需要时正确地管理和注销这些资源【防止内存泄漏和资源消耗过度】
	context.subscriptions.push(arvCommand, arvPackAnalysis, removeLog, helloWorld);
}

export function deactivate() {}
