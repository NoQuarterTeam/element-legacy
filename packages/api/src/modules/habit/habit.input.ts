import { InputType, Field } from "type-graphql"
import { Habit } from "./habit.entity"

@InputType()
export class HabitInput implements Partial<Habit> {
  @Field({ nullable: true })
  elementId?: string

  @Field({ nullable: true })
  archived?: boolean

  @Field({ nullable: true })
  archivedAt?: Date

  @Field({ nullable: true })
  activeFrom?: Date
}
