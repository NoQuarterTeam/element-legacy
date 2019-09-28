import { InputType, Field } from "type-graphql"
import { Task } from "./task.entity"

@InputType()
export class TaskInput implements Partial<Task> {
  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  startTime?: string

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  estimatedTime?: string

  @Field({ nullable: true })
  completed?: boolean

  @Field({ nullable: true })
  scheduledDate?: Date

  @Field({ nullable: true })
  elementId?: string

  @Field()
  userId: string

  @Field({ nullable: true })
  order?: number
}

@InputType()
export class OrderTaskInput implements Partial<Task> {
  @Field()
  order: number

  @Field()
  scheduledDate: Date

  @Field()
  userId: string
}
