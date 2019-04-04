import { InputType, Field } from "type-graphql"
import { Habit } from "./habit.entity"

@InputType()
export class InputHabit implements Partial<Habit> {
  // @Field({ nullable: true })
  // element?: string

  @Field({ nullable: true })
  archived?: boolean
}
