import { InputType, Field } from "type-graphql"
import { Task } from "./task.entity"

@InputType()
export class CreateTaskInput implements Partial<Task> {
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
}

@InputType()
export class UpdateTask implements Partial<Task> {
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
}
