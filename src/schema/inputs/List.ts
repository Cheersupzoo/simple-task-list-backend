import { Field, ID, InputType, Int } from "type-graphql";
import List from "../types/List";
import Task from "../types/Task";

@InputType()
export class AddListInput implements Partial<List> {
  @Field()
  title: string;
}

@InputType()
export class RemoveListInput implements Partial<List> {
  @Field((type) => ID)
  id: string;
}

@InputType()
export class UpdateListInput implements Partial<List> {
  @Field((type) => ID)
  id: string;

  @Field()
  title: string;
}

@InputType()
export class AddTaskInput implements Partial<Task> {
  @Field()
  listId: string;

  @Field()
  title: string;
}

@InputType()
export class UpdateTaskInput implements Partial<Task> {
  @Field((type) => ID)
  id: string;

  @Field()
  listId: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  completed?: boolean;

  @Field(type => Int,{ nullable: true })
  order?: number;
}

@InputType()
export class RemoveTaskInput implements Partial<Task> {
  @Field()
  listId: string;

  @Field()
  id: string;
}