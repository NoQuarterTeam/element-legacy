import { Task } from "./task.entity"
import { TaskInput } from "./task.input"

import { Service } from "typedi"
import { ElementService } from "../element/element.service"
import { ProgressService } from "../progress/progress.service"

@Service()
export class TaskService {
  constructor(
    private readonly elementService: ElementService,
    private readonly progressService: ProgressService,
  ) {}

  findById(taskId: string): Promise<Task> {
    return Task.findOneOrFail(taskId)
  }

  findAll(userId: string): Promise<Task[]> {
    return Task.find({ where: { userId } })
  }

  async create(data: TaskInput, userId: string): Promise<Task | null> {
    if (data.elementId) {
      const element = await this.elementService.findById(data.elementId)
      const task = await Task.create({
        ...data,
        element,
        userId,
      }).save()
      this.progressService.updateProgress(task, userId)
      return task
    } else {
      return null
    }
  }

  async update(taskId: string, data: TaskInput, userId: string): Promise<Task> {
    let task = await this.findById(taskId)
    if (!task) throw new Error("task not found")

    if (data.elementId) {
      const element = await this.elementService.findById(data.elementId)
      Object.assign(task, data, { element })
    } else {
      Object.assign(task, data)
    }
    this.progressService.updateProgress(task, userId)
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
