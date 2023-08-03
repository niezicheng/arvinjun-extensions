import { TView, TViewItem, TCommand } from '../types';
const fs = require('fs');
const path = require('path');
const get = require('lodash/get');

export const rootPath = path.join(__dirname, '../../../');
export const packageJsonPath = path.join(rootPath, 'package.json');
export const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

export const activitybarId = get(packageJson, 'contributes.viewsContainers.activitybar[0].id', []);
export const views = get(packageJson, `contributes.views.${activitybarId}`, []);
export const commands = get(packageJson, 'contributes.commands', []);
export const keybindings = get(packageJson, 'contributes.keybindings', []);

// 依据 package.json 生成新的 views
export const newViews: TView = views.map((view: TViewItem) => {
  const newCommands: TCommand[] = commands
    ?.filter((command: { command: string; }) => view.id?.toLowerCase()?.includes(command.command?.split('.')?.[0]))
    ?.map((command: { command: string; title: any; }) => {
      const keybinding = keybindings?.find((keybinding: { command: string }) => keybinding.command === command.command);
      return {
        command: command.command,
        title: command.title,
        hotKey: keybinding?.key,
      };
    });

  return {
    ...view,
    commands: newCommands,
  };
});
