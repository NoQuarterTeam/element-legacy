import { Entity, ManyToOne, OneToMany, Column } from "typeorm"

import { BaseEntity } from "../shared/base.entity"

import { ObjectType, Field } from "type-graphql"
import { CreateElementInput } from "../element/element.input"
import { Element } from "../element/element.entity"
import { Progress } from "../progress/progress.entity"
import { User } from "../user/user.entity"
import {
  UuidField,
  StringField,
  BooleanField,
  IntField,
} from "../shared/fields"

@ObjectType()
@Entity()
export class Task extends BaseEntity<Task> {
  @StringField()
  name: string

  @StringField({ nullable: true })
  startTime: string

  @StringField({ nullable: true })
  description: string

  @StringField({ nullable: true })
  estimatedTime: string

  @BooleanField({ default: false })
  completed: boolean

  @Field({ nullable: true })
  @Column({ nullable: true })
  scheduledDate: Date

  @IntField()
  order: number

  @UuidField()
  elementId: string

  @Field(() => Element)
  @ManyToOne(
    () => Element,
    element => element.tasks,
    { eager: true },
  )
  element: CreateElementInput

  // @Field()
  @OneToMany(
    () => Progress,
    progress => progress.task,
  )
  progress: Progress

  @UuidField()
  userId: string

  @Field(() => User)
  @ManyToOne(
    () => User,
    user => user.tasks,
  )
  user: User
}
