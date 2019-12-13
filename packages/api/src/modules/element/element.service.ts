import { Element } from "./element.entity"
import { CreateElementInput, UpdateElementInput } from "./element.input"

import { Service } from "typedi"
import { Brackets } from "typeorm"

@Service()
export class ElementService {
  async findById(elementId: string): Promise<Element> {
    const element = await Element.findOne(elementId)
    if (!element) throw new Error("element not found")
    return element
  }

  async findAll(userId: string, selectedUserId: string): Promise<Element[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const elementsQuery = await Element.createQueryBuilder("element")

        if (userId === selectedUserId) {
          elementsQuery
            .leftJoin("element.sharedElements", "sharedElement")
            .where("element.creatorId = :userId", { userId })
            .orWhere("sharedElement.userId = :userId", {
              userId,
            })
        } else {
          elementsQuery
            .leftJoin("element.sharedElements", "sharedElement")
            .where(
              new Brackets(qb => {
                // where element has been shared to currentUser by selectedUser
                qb.where("element.creatorId = :selectedUserId", {
                  selectedUserId,
                }).andWhere("sharedElement.userId = :userId", {
                  userId,
                })
              }),
            )
            .orWhere(
              new Brackets(qb => {
                // where element has been shared to selectedUser by currentUser
                qb.where("element.creatorId = :userId", {
                  userId,
                }).andWhere("sharedElement.userId = :selectedUserId", {
                  selectedUserId,
                })
              }),
            )
        }

        const elements = elementsQuery.getMany()

        resolve(elements)
      } catch (error) {
        reject(error)
      }
    })
  }

  findChildren(parentId: string): Promise<Element[]> {
    return Element.find({ parentId })
  }

  create(data: CreateElementInput, userId: string): Promise<Element> {
    return new Promise(async (resolve, reject) => {
      try {
        const element = await Element.create({
          ...data,
          creatorId: userId,
        }).save()
        resolve(element)
      } catch (error) {
        reject(error)
      }
    })
  }

  update(elementId: string, data: UpdateElementInput): Promise<Element> {
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
