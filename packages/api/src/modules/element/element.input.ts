import { InputType, Field } from "type-graphql"
import { Element } from "./element.entity"

@InputType()
export class CreateElementInput implements Partial<Element> {
  @Field()
  name: string

  @Field()
  color: string

  @Field({ nullable: true })
  archived?: boolean

  @Field({ nullable: true })
  parentId?: string
}

@InputType()
export class UpdateElementInput implements Partial<Element> {
  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  color?: string

  @Field({ nullable: true })
  archived?: boolean

  @Field({ nullable: true })
  parentId?: string
}
