import {
  Resolver,
  Mutation,
  Arg,
  Authorized,
  Query,
  Subscription,
  PubSub,
  Publisher,
  Root,
} from "type-graphql"

import { Task } from "./task.entity"
import { TaskService } from "./task.service"
import { TaskInput, OrderTaskInput } from "./task.input"
import { CurrentUser } from "../shared/context/currentUser"
import { User } from "../user/user.entity"

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Subscription(() => Task, { topics: "TASK_UPDATES" })
  updateTaskSubscription(@Root() task: Task) {
    // if () {
    return task
    // } else {
    //   return null
    // }
  }

  @Subscription(() => Task, { topics: "TASK_DELETE" })
  deleteTaskSubscription(@Root() taskId: string) {
    // if () {
    return taskId
    // } else {
    //   return null
    // }
  }

  // ALL TASKS
  @Authorized()
  @Query(() => [Task], { nullable: true })
  allTasks(
    @CurrentUser() user: User,
    @Arg("selectedUserId", { nullable: true }) selectedUserId?: string,
    @Arg("daysBack", { nullable: true }) daysBack?: number,
    @Arg("daysForward", { nullable: true }) daysForward?: number,
  ): Promise<Task[]> {
    return this.taskService.findAll(
      user.id,
      selectedUserId,
      daysBack,
      daysForward,
    )
  }

  // CREATE TASK
  @Authorized()
  @Mutation(() => Task, { nullable: true })
  async createTask(
    @Arg("data") data: TaskInput,
    @CurrentUser() user: User,
  ): Promise<Task | null> {
    return this.taskService.create(data, user.id)
  }

  // UPDATE TASK
  @Authorized()
  @Mutation(() => Task, { nullable: true })
  async updateTask(
    @Arg("taskId") taskId: string,
    @Arg("data") data: TaskInput,
    @PubSub("TASK_UPDATES") publish: Publisher<Task>,
  ): Promise<Task> {
    const task = await this.taskService.update(taskId, data)
    await publish(task)
    return task
  }

  // UPDATE TASK ORDER
  @Authorized()
  @Mutation(() => Task, { nullable: true })
  async updateTaskOrder(
    @Arg("taskId") taskId: string,
    @Arg("data") data: OrderTaskInput,
    @PubSub("TASK_UPDATES") publish: Publisher<Task>,
  ): Promise<Task> {
    const task = await this.taskService.update(taskId, data)
    await publish(task)
    return task
  }

  // DESTROY TASK
  @Authorized()
  @Mutation(() => Boolean, { nullable: true })
  async destroyTask(
    @Arg("taskId") taskId: string,
    @PubSub("TASK_DELETED") publish: Publisher<string>,
  ): Promise<boolean> {
    await publish(taskId)
    return this.taskService.destroy(taskId)
  }

  // @FieldResolver()
  // element(@Root() task: Task) {
  //   return elememnt.fnd
  // }
}
