import DataLoader from "dataloader"
import { In } from "typeorm"
import { Element } from "./element.entity"

export const elementChildrenLoader = () =>
  new DataLoader(async (keys: ReadonlyArray<string>) => {
    const parentIds = [...keys]
    const children = await Element.getRepository().find({
      where: {
        parentId: In(parentIds),
      },
    })
    const map: { [key: string]: Element[] } = {}
    children.forEach(child => {
      if (child.parentId in map) {
        map[child.parentId].push(child)
      } else {
        map[child.parentId] = [child]
      }
    })
    return parentIds.map(parentId => map[parentId] || [])
  })
