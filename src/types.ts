export enum ETabs {
  All,
  Incomplete,
  Completed,
}

export interface TodoItemProps {
  id?: string;
  name: string;
  isCompleted: boolean;
}
