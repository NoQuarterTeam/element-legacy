import { Element } from "./element.entity"
import { CreateElementInput } from "./element.input"

import { Service } from "typedi"

@Service()
export class ElementService {
  async findById(elementId: string): Promise<Element> {
    const element = await Element.findOne(elementId)
    if (!element) throw new Error("element not found")
    return element
  }

  async findAll(): Promise<Element[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const elements = await Element.find()
        resolve(elements)
      } catch (error) {
        reject(error)
      }
    })
  }

  findChildren(parentId: string): Promise<Element[]> {
    return Element.find({ parentId })
  }

  create(data: CreateElementInput): Promise<Element> {
    return new Promise(async (resolve, reject) => {
      try {
        const element = await Element.create({
          ...data,
        }).save()
        resolve(element)
      } catch (error) {
        reject(error)
      }
    })
  }

  update(elementId: string, data: CreateElementInput): Promise<Element> {
    return new Promise(async (resolve, reject) => {
      try {
        const element = await this.findById(elementId)
        if (!element) throw new Error("element not found")
        Object.assign(element, data)
        await element.save()
        resolve(element)
      } catch (error) {
        reject(error)
      }
    })
  }

  destroy(elementId: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const element = await Element.findOne(elementId)
        if (!element) throw new Error("not found")
        await element.remove()
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }
}
