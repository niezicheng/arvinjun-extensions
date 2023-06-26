import * as vscode from 'vscode';
import removeLog from './removeLog';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(removeLog);
}

export function deactivate() {}
