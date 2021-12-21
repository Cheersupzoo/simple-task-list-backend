import { nanoid } from "nanoid";
import List from "../schema/types/List";
import Task from "../schema/types/Task";

export function createMockList() {
  const firstlid = nanoid(10);
  const secondlid = nanoid(10);
  return [
    createList({
      id: firstlid,
      title: "Today",
      tasks: [
        createTask({
          title: "Study Crypto",
          completed: false,
          listId: firstlid,
          id: nanoid(10),
          order: 1,
        }),
        createTask({
          title: "Buy grocery",
          completed: true,
          listId: firstlid,
          id: nanoid(10),
          order: 2,
        }),
      ],
    }),
    createList({
      id: secondlid,
      title: "Tomorrow",
      tasks: [
        createTask({
          title: "Read one book",
          completed: false,
          listId: secondlid,
          id: nanoid(10),
          order: 1,
        }),
        createTask({
          title: "Meet friend at Mall",
          completed: false,
          listId: secondlid,
          id: nanoid(10),
          order: 2,
        }),
        createTask({
          title: "Pay bills",
          completed: false,
          listId: secondlid,
          id: nanoid(10),
          order: 3,
        }),
      ],
    }),
  ];
}

function createList(listData: Partial<List>): List {
  return Object.assign(new List(), listData);
}
function createTask(taskData: Partial<Task>): Task {
  return Object.assign(new Task(), taskData);
}
