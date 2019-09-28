import { Resolver, Mutation, Arg, Authorized, Query, Ctx } from "type-graphql"

import { Task } from "./task.entity"
import { TaskService } from "./task.service"
import { TaskInput, OrderTaskInput } from "./task.input"
import { ResolverContext } from "../../lib/types"

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  // ALL TASKS
  @Authorized()
  @Query(() => [Task], { nullable: true })
  allTasks(
    @Ctx() { userId }: ResolverContext,
    @Arg("selectedUserId", { nullable: true }) selectedUserId?: string,
  ): Promise<Task[]> {
    return this.taskService.findAll(userId, selectedUserId)
  }

  // CREATE TASK
  @Authorized()
  @Mutation(() => Task, { nullable: true })
  async createTask(
    @Arg("data") data: TaskInput,
    @Ctx() { userId }: ResolverContext,
  ): Promise<Task | null> {
    return this.taskService.create(data, userId)
  }

  // UPDATE TASK
  @Authorized()
  @Mutation(() => Task, { nullable: true })
  async updateTask(
    @Arg("taskId") taskId: string,
    @Arg("data") data: TaskInput,
  ): Promise<Task> {
    return this.taskService.update(taskId, data)
  }

  // UPDATE TASK ORDER
  @Authorized()
  @Mutation(() => Task, { nullable: true })
  async updateTaskOrder(
    @Arg("taskId") taskId: string,
    @Arg("data") data: OrderTaskInput,
  ): Promise<Task> {
    return this.taskService.update(taskId, data)
  }

  // DESTROY TASK
  @Authorized()
  @Mutation(() => Boolean, { nullable: true })
  destroyTask(@Arg("taskId") taskId: string): Promise<boolean> {
    return this.taskService.destroy(taskId)
  }

  // @FieldResolver()
  // element(@Root() task: Task) {
  //   return elememnt.fnd
  // }
}
