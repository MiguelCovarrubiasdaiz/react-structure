export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  userId: string;
}

export interface TodoFormProps {
  userId?: string;
  onSuccess?: () => void;
}

export interface TodoItemProps {
  todo: Todo;
}
