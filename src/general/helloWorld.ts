import * as vscode from 'vscode';

/**
 * 弹框提示 HelloWorld
 */
const helloWorld = vscode.commands.registerCommand('general.helloWorld', () => {
  vscode.window.showInformationMessage('Hello World!');
});

export default helloWorld;

