import { InputType, Field } from "type-graphql"
import { Progress } from "./progress.entity"

@InputType()
export class InputProgress implements Partial<Progress> {
  @Field({ nullable: true })
  date?: Date

  @Field({ nullable: true })
  archived?: boolean
}
