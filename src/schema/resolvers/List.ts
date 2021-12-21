import { Arg, FieldResolver, Mutation, Query, Resolver, ResolverInterface, Root } from "type-graphql";
import { Database } from "../../service/Database";
import { createMockList } from "../../service/MockData";
import {
  AddListInput,
  AddTaskInput,
  RemoveListInput,
  RemoveTaskInput,
  UpdateListInput,
  UpdateTaskInput,
} from "../inputs/List";
import List from "../types/List";
import Task from "../types/Task";

@Resolver((of) => List)
export class ListResolver implements ResolverInterface<List> {
  private items: List[] = createMockList();

  @Query((returns) => List, { description: "Get list by ID" })
  public async list(@Arg("id") id: string): Promise<List> {
    return Database.getList(id);
  }

  @Query((returns) => [List], { description: "Get all the lists" })
  public async lists(): Promise<List[]> {
    return await Database.getLists();
  }

  @Mutation((returns) => List, {
    description: "Add new list",
    nullable: true,
  })
  public async addList(@Arg("input") { title }: AddListInput): Promise<List> {
    return await Database.addList({ title });
  }

  @Mutation((returns) => List, { nullable: true })
  public async updateList(@Arg("input") { id, title }: UpdateListInput): Promise<List> {
    return Database.updateList({ id, title });
  }

  @Mutation((returns) => [List], { nullable: true })
  public async removeList(@Arg("input") { id }: RemoveListInput): Promise<List[]> {
    return await Database.removeList({ id });
  }

  @FieldResolver()
  public async tasks(@Root() root: List): Promise<Task[]> {
    return Database.getTasksByListId(root.id);
  }

  // Task Mutation
  @Mutation((returns) => Task)
  public async addTask(@Arg("input") { listId, title }: AddTaskInput): Promise<Task> {
    return await Database.addTask({ listId, title });
  }

  @Mutation((returns) => List)
  public async updateTask(@Arg("input") { listId, id, title, completed, order }: UpdateTaskInput): Promise<List> {
    return await Database.updateTask({ listId, id, title, completed, order });
  }

  @Mutation((returns) => List)
  public async removeTask(@Arg("input") { listId, id }: RemoveTaskInput): Promise<List> {
    return await Database.removeTask({ listId, id });
  }
}
