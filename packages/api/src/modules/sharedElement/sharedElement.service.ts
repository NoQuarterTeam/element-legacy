import { SharedElement } from "./sharedElement.entity"
import { CreateSharedElementInput } from "./sharedElement.input"

import { Service } from "typedi"
import { User } from "../user/user.entity"
import { ElementService } from "../element/element.service"

@Service()
export class SharedElementService {
  constructor(private readonly elementService: ElementService) {}

  async findById(sharedElementId: string): Promise<SharedElement> {
    const sharedElement = await SharedElement.findOne(sharedElementId)
    if (!sharedElement) throw new Error("sharedElement not found")
    return sharedElement
  }

  async findAll(userId: string): Promise<SharedElement[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const sharedElements = await SharedElement.createQueryBuilder(
          "sharedElement",
        )
          .innerJoinAndSelect("sharedElement.element", "element")
          .innerJoinAndSelect("sharedElement.user", "user")
          .where("element.creatorId = :userId", {
            userId,
          })
          .orWhere("sharedElement.userId = :userId", { userId })
          .getMany()

        resolve(sharedElements)
      } catch (error) {
        reject(error)
      }
    })
  }

  async findAllSharedUsersByElementId(elementId: string): Promise<User[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const sharedUsers = await User.createQueryBuilder("user")
          .innerJoinAndSelect("user.sharedElements", "sharedElement")
          .where("sharedElement.elementId = :elementId", {
            elementId,
          })
          .getMany()

        resolve(sharedUsers)
      } catch (error) {
        reject(error)
      }
    })
  }

  async findAllSharedUsersByUserId(userId: string): Promise<User[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const sharedElements = await SharedElement.createQueryBuilder(
          "sharedElement",
        )
          .innerJoinAndSelect("sharedElement.element", "element")
          .innerJoinAndSelect("element.creator", "creator")
          .innerJoinAndSelect("sharedElement.user", "user")
          .where("element.creatorId = :userId", {
            userId,
          })
          .orWhere("sharedElement.userId = :userId", { userId })
          .getMany()

        const sharedUsers = sharedElements
          .map(se => [se.element.creator, se.user])
          .flat()
          .filter(user => user.id !== userId)
          .filter(
            (user, index, self) =>
              index === self.findIndex(u => u.id === user.id),
          )

        resolve(sharedUsers)
      } catch (error) {
        reject(error)
      }
    })
  }

  create(data: CreateSharedElementInput): Promise<SharedElement> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!data.elementId) return false
        const children = await this.elementService.findChildren(data.elementId)

        if (children.length > 0) {
          children.map(async child => {
            const childData = {
              userId: data.userId,
              elementId: child.id,
            }
            await SharedElement.create({
              ...childData,
            }).save()
          })
        }

        const sharedElement = await SharedElement.create({
          ...data,
        }).save()
        resolve(sharedElement)
      } catch (error) {
        reject(error)
      }
    })
  }

  update(
    sharedElementId: string,
    data: CreateSharedElementInput,
  ): Promise<SharedElement> {
    return new Promise(async (resolve, reject) => {
      try {
        const sharedElement = await this.findById(sharedElementId)
        if (!sharedElement) throw new Error("sharedElement not found")
        Object.assign(sharedElement, data)
        await sharedElement.save()
        resolve(sharedElement)
      } catch (error) {
        reject(error)
      }
    })
  }

  destroy(userId: string, elementId: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const sharedElement = await SharedElement.findOne({
          where: { userId, elementId },
        })
        if (!sharedElement) throw new Error("not found")
        const children = await this.elementService.findChildren(elementId)

        if (children.length > 0) {
          children.map(async child => {
            child.remove()
          })
        }

        await sharedElement.remove()
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }
}
