import { Resolver, ResolverInterface } from "type-graphql";
import Task from "../types/Task";

@Resolver((of) => Task)
export class TaskResolver implements ResolverInterface<Task> {
    
}