import { Field, ID, InputType, Int } from "type-graphql";
import List from "../types/List";
import Task from "../types/Task";

@InputType()
export class AddListInput implements Partial<List> {
  @Field()
  public title: string;
}

@InputType()
export class RemoveListInput implements Partial<List> {
  @Field((type) => ID)
  public id: string;
}

@InputType()
export class UpdateListInput implements Partial<List> {
  @Field((type) => ID)
  public id: string;

  @Field()
  public title: string;
}

@InputType()
export class AddTaskInput implements Partial<Task> {
  @Field()
  public listId: string;

  @Field()
  public title: string;
}

@InputType()
export class UpdateTaskInput implements Partial<Task> {
  @Field((type) => ID)
  public id: string;

  @Field()
  public listId: string;

  @Field({ nullable: true })
  public title?: string;

  @Field({ nullable: true })
  public completed?: boolean;

  @Field((type) => Int, { nullable: true })
  public order?: number;
}

@InputType()
export class RemoveTaskInput implements Partial<Task> {
  @Field()
  public listId: string;

  @Field()
  public id: string;
}
