import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToMany,
} from "typeorm"
import { Element } from "../element/element.entity"
import { ObjectType, Field, ID } from "type-graphql"
import bcrypt from "bcryptjs"
import { Habit } from "../habit/habit.entity"
import { Task } from "../task/task.entity"
import { SharedElement } from "../sharedElement/sharedElement.entity"

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Field()
  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Field()
  @Column()
  firstName: string

  @Field()
  @Column()
  lastName: string

  @CreateDateColumn()
  createdAt: string

  @UpdateDateColumn()
  updatedAt: string

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
