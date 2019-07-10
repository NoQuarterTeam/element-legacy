import dayjs from "dayjs"

import { Progress } from "./progress.entity"
import { InputProgress } from "./progress.input"

import { Service } from "typedi"
import { Task } from "../task/task.entity"
import { Habit } from "../habit/habit.entity"
import { HabitService } from "../habit/habit.service"

@Service()
export class ProgressService {
  constructor(private readonly habitService: HabitService) {}

  async findById(progressId: string): Promise<Progress> {
    const progress = await Progress.findOne(progressId)
    if (!progress) throw new Error("progress not found")
    return progress
  }

  async findAll(): Promise<Progress[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const progresss = await Progress.find()
        resolve(progresss)
      } catch (error) {
        reject(error)
      }
    })
  }

  create(data: InputProgress): Promise<Progress> {
    return new Promise(async (resolve, reject) => {
      try {
        const progress = await Progress.create({
          ...data,
        }).save()
        resolve(progress)
      } catch (error) {
        reject(error)
      }
    })
  }

  update(progressId: string, data: InputProgress): Promise<Progress> {
    return new Promise(async (resolve, reject) => {
      try {
        const progress = await this.findById(progressId)
        if (!progress) throw new Error("progress not found")
        Object.assign(progress, data)
        await progress.save()
        resolve(progress)
      } catch (error) {
        reject(error)
      }
    })
  }

  destroy(progressId: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const progress = await Progress.findOne(progressId)
        if (!progress) throw new Error("not found")
        await progress.remove()
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }

  async updateProgress(task: Task) {
    const progress = await Progress.findOne({
      where: { task: { id: task.id } },
    })

    if (task.completed) {
      // check for habit with elementId that is active within the Tasks scheduled date
      const allHabits = await this.habitService.findAll()

      const activeHabits = allHabits
        .filter(
          (habit: Habit) =>
            habit.elementId === task.elementId &&
            dayjs(task.scheduledDate).isAfter(
              dayjs(habit.activeFrom).startOf("day"),
              // .subtract(1, "day"),
            ),
        )
        .filter((hab: Habit) => {
          if (hab.archivedAt) {
            return dayjs(task.scheduledDate)
              .startOf("day")
              .isBefore(dayjs(hab.archivedAt).startOf("day"))
          } else {
            return true
          }
        })

      if (activeHabits.length) {
        if (progress) return false
        this.create({ task })
      } else if (progress) {
        await progress.remove()
      }
    } else if (progress) {
      await progress.remove()
    }
  }
}
