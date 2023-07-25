import * as vscode from 'vscode';

/**
 * 删除当前选中的文本中的所有 console.log
 */
const removeLog = vscode.commands.registerCommand('general.removeLog', () => {
  const global = vscode.window;
  // vscode 当前编辑页的编辑器实例
  const editor = global.activeTextEditor;
  if (!editor) {
    return;
  }
  const document = editor.document;
  // 获取用户选中的文本
  let selectedText = document.getText(editor.selection);
  if (!selectedText) {
    global.showErrorMessage('Please select a text range!');
    return;
  }
  selectedText = selectedText.replace(/\s+console.(log|info|error|table)\((.*)\);?/g, '');
  editor.edit((editBuilder) => {
    // 获取编辑实例，进行真正替换
    editBuilder.replace(editor.selection, selectedText);
  });
  global.showInformationMessage('Remove log success!');
});

export default removeLog;

