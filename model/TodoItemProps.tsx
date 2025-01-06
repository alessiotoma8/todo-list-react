import { Todo } from "./Todo";

export type TodoItemProps = {
    todo: Todo;
    toggleComplete: (id: string) => void;
    deleteTodo: (id: string) => void;
  };
  