export type TViewItem = {
  id: string;
  name: string;
  commands: TCommand[];
};

export type TCommand = {
  command: string
  title: string
  hotKey: string
};

export type TView = TViewItem[];
