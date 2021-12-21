import { nanoid } from "nanoid";
import { Field, ID, Int, ObjectType } from "type-graphql";

@ObjectType({ description: "Task title with complete status" })
class Task {
  static defaultTask(task?: Partial<Task>) {
    return Object.assign(new Task(), {
      id: task.id ?? nanoid(10),
      title: task.title ?? "",
      completed: task.completed ?? false,
      order: task.order ?? 1,
      listId: task.listId ?? "",
    });
  }

  @Field((type) => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  completed: boolean;

  @Field((type) => Int)
  order: number;

  @Field()
  listId: string;
}

export default Task;
