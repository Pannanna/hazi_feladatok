import type { TodoContent, CategorizedDatedTodo } from "./type";

export function isCategorizedDatedTodo(
  content: TodoContent
): content is CategorizedDatedTodo {
  return (
    typeof content === "object" &&
    content !== null &&
    "content" in content &&
    typeof (content as any).content === "object" &&
    (content as any).content !== null &&
    "dueDate" in (content as any).content &&
    (content as any).content.dueDate instanceof Date
  );
}