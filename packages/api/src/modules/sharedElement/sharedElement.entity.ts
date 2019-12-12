import { Entity, ManyToOne } from "typeorm"

import { BaseEntity } from "../shared/base.entity"

import { ObjectType, Field } from "type-graphql"
import { User } from "../user/user.entity"
import { Element } from "../element/element.entity"
import { UuidField } from "../shared/fields"

@ObjectType()
@Entity()
export class SharedElement extends BaseEntity<SharedElement> {
  @UuidField()
  elementId: string

  @Field(() => Element)
  @ManyToOne(
    () => Element,
    element => element.sharedElements,
  )
  element: Element

  @UuidField()
  userId: string

  @Field(() => User)
  @ManyToOne(
    () => User,
    user => user.sharedElements,
  )
  user: User
}
