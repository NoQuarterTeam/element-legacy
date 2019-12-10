import { Entity, JoinColumn, ManyToOne, Column } from "typeorm"

import { BaseEntity } from "../shared/base.entity"

import { ObjectType, Field } from "type-graphql"
import { Element } from "../element/element.entity"
import { User } from "../user/user.entity"
import { UuidField, BooleanField } from "../shared/fields"

@ObjectType()
@Entity()
export class Habit extends BaseEntity<Habit> {
  @BooleanField({ nullable: true, default: false })
  archived: boolean

  @UuidField()
  elementId: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  activeFrom: Date

  @Field(() => Element)
  @ManyToOne(() => Element, { eager: true })
  @JoinColumn()
  element: Element

  @UuidField({ nullable: true })
  userId: string

  @Field(() => User)
  @ManyToOne(
    () => User,
    user => user.habits,
  )
  user: User

  @Field({ nullable: true })
  @Column({ nullable: true })
  archivedAt: Date
}
