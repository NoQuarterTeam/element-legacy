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

    return sharedElements
  }

  async findAllSharedUsersByElementId(elementId: string): Promise<User[]> {
    const sharedUsers = await User.createQueryBuilder("user")
      .innerJoinAndSelect("user.sharedElements", "sharedElement")
      .where("sharedElement.elementId = :elementId", {
        elementId,
      })
      .getMany()
    return sharedUsers
  }

  async findAllSharedUsersByUserId(userId: string): Promise<User[]> {
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
        (user, index, self) => index === self.findIndex(u => u.id === user.id),
      )
    return sharedUsers
  }

  async create(data: CreateSharedElementInput): Promise<SharedElement> {
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
    return sharedElement
  }

  async update(
    sharedElementId: string,
    data: CreateSharedElementInput,
  ): Promise<SharedElement> {
    const sharedElement = await this.findById(sharedElementId)
    if (!sharedElement) throw new Error("sharedElement not found")
    Object.assign(sharedElement, data)
    await sharedElement.save()
    return sharedElement
  }

  async destroy(userId: string, elementId: string): Promise<boolean> {
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
    return true
  }
}
