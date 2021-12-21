import { nanoid } from "nanoid";
import { Field, ID, ObjectType } from "type-graphql";
import Task from "./Task";

@ObjectType({ description: "List of Task" })
class List {
  public static defaultList(list: Partial<List>) {
    return Object.assign(new List(), {
      id: list.id ?? nanoid(10),
      title: list.title ?? "",
    });
  }
  @Field((type) => ID)
  public id: string;

  @Field()
  public title: string;

  @Field((type) => [Task])
  public tasks: Task[];
}

export default List;
