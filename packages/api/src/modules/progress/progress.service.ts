import { Progress } from "./progress.entity"
import { InputProgress } from "./progress.input"

import { Service } from "typedi"

@Service()
export class ProgressService {
  async findById(progressId: string): Promise<Progress> {
    const progress = await Progress.findOne(progressId)
    if (!progress) throw new Error("progress not found")
    return progress
  }

  async findAll(): Promise<Progress[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const progresss = await Progress.getRepository()
          .createQueryBuilder("progress")
          .getMany()

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
}
