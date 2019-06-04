import { InputType, Field } from "type-graphql"
import { Task } from "./task.entity"
import { CreateElementInput } from "../element/element.input"

@InputType()
export class TaskInput implements Partial<Task> {
  @Field()
  name: string

  @Field()
  startTime: string

  @Field()
  description: string

  @Field()
  estimatedTime: string

  @Field()
  completed: boolean

  @Field()
  scheduledDate: Date

  @Field()
  elementId: string
}

@InputType()
export class OrderTaskInput implements Partial<Task> {
  @Field()
  order: number

  @Field()
  scheduledDate: Date
}
