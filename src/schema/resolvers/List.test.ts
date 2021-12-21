import { UserInputError } from "apollo-server";
import "reflect-metadata";
import List from "../types/List";
import Task from "../types/Task";
import { ListResolver } from "./List";

const listResolver = new ListResolver();

const listTitle = "Jest Testing";
const listUpdatedTitle = "Jest Testing Updated";
const taskTitle = "First";
const taskUpdatedTitle = "First Updated";
const taskTitle2 = "Second";

var list: List;
var task: Task;

jest.setTimeout(15000);

describe("Success scenario flow", () => {
  test("Create List", async () => {
    list = await listResolver.addList({ title: listTitle });
    expect(list.title).toBe(listTitle);
  });

  test("Get List", async () => {
    const responseList = await listResolver.list(list.id);
    expect(responseList).toEqual(list);
  });

  test("Get Lists", async () => {
    const responseLists = await listResolver.lists();
    expect(responseLists).toContainEqual(list);
  });

  test("Update List", async () => {
    list = await listResolver.updateList({ id: list.id, title: listUpdatedTitle });
    expect(list.title).toBe(listUpdatedTitle);
  });

  test("Get Updated List", async () => {
    const responseList = await listResolver.list(list.id);
    expect(responseList).toEqual(list);
  });

  test("Get Updated Lists", async () => {
    const responseLists = await listResolver.lists();
    expect(responseLists).toContainEqual(list);
  });

  test("Add Task", async () => {
    task = await listResolver.addTask({ listId: list.id, title: taskTitle });
    expect(task.title).toBe(taskTitle);
    expect(task.completed).toBe(false);
    expect(task.order).toBe(0);
  });

  test("Check current Task is exist", async () => {
    const tasks = await listResolver.tasks(list);
    expect(tasks).toContainEqual(task);
  });

  test("Update Task's title", async () => {
    task = await listResolver.updateTask({ listId: list.id, id: task.id, title: taskUpdatedTitle });
    expect(task.title).toBe(taskUpdatedTitle);
    expect(task.completed).toBe(false);
    expect(task.order).toBe(0);
  });

  test("Update Task's completed", async () => {
    task = await listResolver.updateTask({ listId: list.id, id: task.id, completed: true });
    expect(task.title).toBe(taskUpdatedTitle);
    expect(task.completed).toBe(true);
    expect(task.order).toBe(0);
  });

  // test("Update Task's order Error when out of range", async () => {
  //   expect(async () => await listResolver.updateTask({ listId: list.id, id: task.id, order: -1 })).toThrow(
  //     UserInputError,
  //   );
  // });

  test("Add second Task", async () => {
    const task2 = await listResolver.addTask({ listId: list.id, title: taskTitle2 });
    expect(task2.title).toBe(taskTitle2);
    expect(task2.completed).toBe(false);
    expect(task2.order).toBe(1);
  });

  test("This List have 2 tasks", async () => {
    const length = await (await listResolver.tasks(list)).length;
    expect(length).toBe(2);
  });

  test("Update Task's order", async () => {
    task = await listResolver.updateTask({ listId: list.id, id: task.id, order: 1 });
    expect(task.title).toBe(taskUpdatedTitle);
    expect(task.completed).toBe(true);
    expect(task.order).toBe(1);

    const task2 = (await listResolver.tasks(list))[0];
    expect(task2.title).toBe(taskTitle2);
    expect(task2.completed).toBe(false);
    expect(task2.order).toBe(0);
  });

  test("Update Task's title, completed, order together", async () => {
    task = await listResolver.updateTask({
      listId: list.id,
      id: task.id,
      title: taskTitle,
      completed: false,
      order: 0,
    });
    expect(task.title).toBe(taskTitle);
    expect(task.completed).toBe(false);
    expect(task.order).toBe(0);

    const task2 = (await listResolver.tasks(list))[1];
    expect(task2.title).toBe(taskTitle2);
    expect(task2.completed).toBe(false);
    expect(task2.order).toBe(1);
  });

  test("Tasks is order by 'order'", async () => {
    const tasks = await listResolver.tasks(list);
    expect(tasks[0].order).toBe(0);
    expect(tasks[1].order).toBe(1);
  });

  test("Remove Task", async () => {
    await listResolver.removeTask({ listId: list.id, id: task.id });
    const tasks = await listResolver.tasks(list);
    expect(tasks).not.toContainEqual(task);
  });

  test("When first task is remove, order is update correctly", async () => {
    const tasks = await listResolver.tasks(list);
    expect(tasks[0].order).toBe(0);
  });

  test("Remove List", async () => {
    const responseLists = await listResolver.removeList({ id: list.id });
    expect(responseLists).not.toContainEqual(list);
  });
});

describe("User input error", () => {
  beforeAll(async () => {
    list = await listResolver.addList({ title: listTitle });
    task = await listResolver.addTask({ listId: list.id, title: taskTitle });
  });

  afterAll(async () => {
    await listResolver.removeList({ id: list.id });
  });

  test("List not exist", async () => {
    await expect(listResolver.list("0")).rejects.toThrowError(UserInputError);
  });

  test("Update on Task not exist", async () => {
    await expect(listResolver.updateTask({ listId: list.id, id: "0", title: "Update" })).rejects.toThrowError(
      UserInputError,
    );
  });

  test("Update Task's Order out of range", async () => {
    await expect(listResolver.updateTask({ listId: list.id, id: "0", order: -1 })).rejects.toThrowError(UserInputError);
  });
});
