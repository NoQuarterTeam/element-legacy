import { Entity, OneToMany, ManyToMany, ManyToOne } from "typeorm"
import { ObjectType, Field } from "type-graphql"

import { Task } from "../task/task.entity"
import { Habit } from "../habit/habit.entity"
import { User } from "../user/user.entity"
import { SharedElement } from "../sharedElement/sharedElement.entity"
import { BaseEntity } from "../shared/base.entity"
import { StringField, BooleanField, UuidField } from "../shared/fields"

@ObjectType()
@Entity()
export class Element extends BaseEntity<Element> {
  @StringField()
  name: string

  @StringField({ nullable: true })
  color: string

  @BooleanField({ nullable: true, default: false })
  archived: boolean

  // RELATIONS

  @OneToMany(
    () => Task,
    task => task.element,
  )
  tasks: Task[]

  @ManyToMany(() => Habit)
  habit: Habit[]

  @Field(() => [Element], { nullable: true })
  @OneToMany(
    () => Element,
    element => element.children,
    {
      cascade: false,
      nullable: true,
    },
  )
  children: Element[]

  @ManyToOne(
    () => Element,
    element => element.parent,
    {
      cascade: false,
      nullable: true,
    },
  )
  parent: Element

  @UuidField({ nullable: true })
  parentId: string

  @UuidField({ nullable: true })
  creatorId: string

  @Field(() => User, { nullable: true })
  @ManyToOne(
    () => User,
    user => user.elements,
    {
      eager: true,
    },
  )
  creator: User

  @Field(() => [SharedElement], { nullable: true })
  @OneToMany(
    () => SharedElement,
    sharedElements => sharedElements.element,
  )
  sharedElements: SharedElement[]
}
