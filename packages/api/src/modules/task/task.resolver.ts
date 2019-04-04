import { Resolver, Mutation, Arg, Authorized, Query } from "type-graphql"

import { Task } from "./task.entity"
import { TaskService } from "./task.service"
// import { ResolverContext } from "../../lib/types"
import { CreateTaskInput, UpdateTask } from "./task.input"

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  // ALL TASKS
  @Authorized()
  @Query(() => [Task], { nullable: true })
  allTasks(): Promise<Task[]> {
    return this.taskService.findAll()
  }

  // CREATE TASK
  @Authorized()
  @Mutation(() => Task, { nullable: true })
  async createTask(@Arg("data") data: CreateTaskInput): Promise<Task> {
    return this.taskService.create(data)
  }

  // UPDATE TASK
  @Authorized()
  @Mutation(() => Task, { nullable: true })
  async updateTask(
    @Arg("taskId") taskId: string,
    @Arg("data") data: UpdateTask,
  ): Promise<Task> {
    return this.taskService.update(taskId, data)
  }

  // DESTROY TASK
  @Authorized()
  @Mutation(() => Boolean, { nullable: true })
  destroyTask(@Arg("taskId") taskId: string): Promise<boolean> {
    return this.taskService.destroy(taskId)
  }
}
