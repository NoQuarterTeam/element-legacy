import { Entity, BeforeInsert, OneToMany } from "typeorm"
import { BaseEntity } from "../shared/base.entity"

import { Element } from "../element/element.entity"
import { ObjectType, Field } from "type-graphql"
import bcrypt from "bcryptjs"
import { Habit } from "../habit/habit.entity"
import { Task } from "../task/task.entity"
import { SharedElement } from "../sharedElement/sharedElement.entity"
import { StringField } from "../shared/fields"

@ObjectType()
@Entity()
export class User extends BaseEntity<User> {
  @StringField({ unique: true })
  email: string

  @StringField()
  password: string

  @StringField()
  firstName: string

  @StringField()
  lastName: string

  @Field(() => [Element])
  @OneToMany(
    () => Element,
    element => element.creator,
  )
  elements: Element[]

  @Field(() => [Habit])
  @OneToMany(
    () => Habit,
    habit => habit.user,
  )
  habits: Habit[]

  @Field(() => [SharedElement], { nullable: true })
  @OneToMany(
    () => SharedElement,
    sharedElements => sharedElements.user,
  )
  sharedElements: SharedElement[]

  @Field(() => [Task])
  @OneToMany(
    () => Task,
    task => task.user,
  )
  tasks: Task[]

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }
}
