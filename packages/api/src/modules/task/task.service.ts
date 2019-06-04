import { Task } from "./task.entity"
import { TaskInput, OrderTaskInput } from "./task.input"

import { Service } from "typedi"

@Service()
export class TaskService {
  async findById(taskId: string): Promise<Task> {
    const task = await Task.findOne(taskId)
    if (!task) throw new Error("task not found")
    return task
  }

  async findAll(): Promise<Task[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const tasks = await Task.find()
        resolve(tasks)
      } catch (error) {
        reject(error)
      }
    })
  }

  create(data: TaskInput): Promise<Task> {
    return new Promise(async (resolve, reject) => {
      try {
        const task = await Task.create({
          ...data,
        }).save()
        resolve(task)
      } catch (error) {
        reject(error)
      }
    })
  }

  update(taskId: string, data: TaskInput): Promise<Task> {
    return new Promise(async (resolve, reject) => {
      try {
        let task = await this.findById(taskId)
        if (!task) throw new Error("task not found")
        Object.assign(task, data)
        await task.save()
        task = await this.findById(taskId)
        resolve(task)
      } catch (error) {
        reject(error)
      }
    })
  }

  updateOrder(taskId: string, data: OrderTaskInput): Promise<Task> {
    return new Promise(async (resolve, reject) => {
      try {
        const task = await this.findById(taskId)
        if (!task) throw new Error("task not found")
        Object.assign(task, data)
        await task.save()
        resolve(task)
      } catch (error) {
        reject(error)
      }
    })
  }

  destroy(taskId: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const task = await Task.findOne(taskId)
        if (!task) throw new Error("not found")
        await task.remove()
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }
}
