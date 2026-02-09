import { TodoItem } from "../models/todoItem";
import type { TodoContent } from "../utils/type";
import { isCategorizedDatedTodo } from "../utils/typeGuards";
import { LogAdd } from "../utils/decorators";

export class TodoList<T extends TodoContent> {
  private items: Map<number, TodoItem<T>> = new Map();

  @LogAdd
  addItem(item: TodoItem<T>): void {
    this.items.set(item.id, item);
  }

  deleteItem(id: number): boolean {
    return this.items.delete(id);
  }

  listItems(category?: string): void {
    for (const item of this.items.values()) {
      if (category && item.content.category !== category) {
        continue;
      }

      if (isCategorizedDatedTodo(item.content)) {
        console.log(
          `${item.id}: ${item.content.content.message} (${item.content.content.dueDate.toDateString()})`
        );
      } else {
        console.log(`${item.id}: ${item.content.content}`);
      }
    }
  }
}