import * as vscode from 'vscode';
import removeLog from './editor/removeLog';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(removeLog);
}

export function deactivate() {}
