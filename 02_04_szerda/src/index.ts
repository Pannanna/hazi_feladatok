import { TodoItem } from "./models/todoItem";
import { TodoList } from "./services/todoList";
import type { TodoContent } from "./utils/type";

const list = new TodoList<TodoContent>();

list.addItem(
  new TodoItem(1, { category: "otthon", content: "Bevásárlás" })
);

list.addItem(
  new TodoItem(2, {
    category: "munka",
    content: { message: "Határidős feladat", dueDate: new Date() },
  })
);

list.listItems();          
list.listItems("otthon");  
list.deleteItem(1);        
list.listItems();