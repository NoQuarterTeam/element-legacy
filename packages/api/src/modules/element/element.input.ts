import { InputType, Field } from "type-graphql"
import { Element } from "./element.entity"

@InputType()
export class CreateElementInput implements Partial<Element> {
  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  color?: string

  @Field({ nullable: true })
  archived?: boolean
}