import { InputType, Field } from "type-graphql"
import { Habit } from "./habit.entity"

@InputType()
export class HabitInput implements Partial<Habit> {
  @Field({ nullable: true })
  elementId?: string

  @Field()
  archived?: boolean
}
