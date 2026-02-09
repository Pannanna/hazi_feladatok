export type TextTodo = string;

export type DatedTodo = {
  message: string;
  dueDate: Date;
};

export type CategorizedTextTodo = {
  category: string;
  content: TextTodo;
};

export type CategorizedDatedTodo = {
  category: string;
  content: DatedTodo;
};

export type TodoContent = CategorizedTextTodo | CategorizedDatedTodo;