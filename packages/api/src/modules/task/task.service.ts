import { Task } from "./task.entity"
import { TaskInput } from "./task.input"

import { Service } from "typedi"
import { ElementService } from "../element/element.service"
import { ProgressService } from "../progress/progress.service"
import { SharedElementService } from "../sharedElement/sharedElement.service"
import { UserService } from "../user/user.service"

@Service()
export class TaskService {
  constructor(
    private readonly elementService: ElementService,
    private readonly sharedElementService: SharedElementService,
    private readonly progressService: ProgressService,
    private readonly userService: UserService,
  ) {}

  findById(taskId: string): Promise<Task> {
    return Task.findOneOrFail(taskId)
  }

  async findAll(userId: string, selectedUserId?: string): Promise<Task[]> {
    const tasksQuery = await Task.createQueryBuilder("task")

    if (userId != selectedUserId) {
      tasksQuery
        .leftJoinAndSelect("task.element", "element")
        .leftJoinAndSelect("element.sharedElements", "sharedElement")
        .andWhere("sharedElement.userId = :selectedUserId", { selectedUserId }) // and element been shared to selected User
        .orWhere("element.creatorId = :selectedUserId", {
          selectedUserId,
        }) // or element was created by selected user
        .where("task.userId = :selectedUserId", { selectedUserId }) // where task is selected User
      const tasks = tasksQuery.getMany()
      return tasks
    } else {
      const tasks = Task.find({ where: { userId } })
      return tasks
    }

    //   const sharedElements = await this.sharedElementService.findAll(userId)
    //   const sharedElementsForSelected = sharedElements.filter(
    //     shared => shared.element.creatorId === selectedUserId,
    //   )

    //   return Task.find({
    //     where: {
    //       elementId: In(
    //         sharedElementsForSelected.map(shared => shared.elementId),
    //       ),
    //     },
    //   })
    // } else {
    //   return Task.find({ where: { userId } })
    // }
  }

  async create(data: TaskInput, userId: string): Promise<Task | null> {
    if (data.elementId && data.userId) {
      const element = await this.elementService.findById(data.elementId)
      if (data.userId === userId) {
        const task = await Task.create({
          ...data,
          element,
        }).save()
        this.progressService.updateProgress(task, data.userId)
        return task
      } else {
        const sharedUserList = await this.sharedElementService.findAllSharedUsersByElementId(
          element.id,
        )
        const sharedUser = await this.userService.findById(data.userId)

        if (!sharedUserList.includes(sharedUser)) {
          const sharedElement = await this.sharedElementService.create({
            userId: sharedUser.id,
            elementId: element.id,
          })
          sharedElement.save()
        }
        const task = await Task.create({
          ...data,
          element,
        }).save()
        return task

        return null
      }
    } else {
      return null
    }
  }

  async update(taskId: string, data: TaskInput): Promise<Task> {
    let task = await this.findById(taskId)
    if (!task) throw new Error("task not found")

    if (data.elementId) {
      const element = await this.elementService.findById(data.elementId)
      Object.assign(task, data, { element })
    } else {
      Object.assign(task, data)
    }
    this.progressService.updateProgress(task, data.userId)
    await task.save()
    task = await this.findById(taskId)
    return task
  }

  async destroy(taskId: string): Promise<boolean> {
    const task = await Task.findOne(taskId)
    if (!task) throw new Error("not found")
    await task.remove()
    return true
  }
}
