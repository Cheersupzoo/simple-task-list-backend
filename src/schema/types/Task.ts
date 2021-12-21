import { nanoid } from "nanoid";
import { Field, ID, Int, ObjectType } from "type-graphql";

@ObjectType({ description: "Task title with complete status" })
class Task {
  public static defaultTask(task?: Partial<Task>) {
    return Object.assign(new Task(), {
      id: task.id ?? nanoid(10),
      title: task.title ?? "",
      completed: task.completed ?? false,
      order: task.order ?? 1,
      listId: task.listId ?? "",
    });
  }

  @Field((type) => ID)
  public id: string;

  @Field()
  public title: string;

  @Field()
  public completed: boolean;

  @Field((type) => Int)
  public order: number;

  @Field()
  public listId: string;
}

export default Task;
