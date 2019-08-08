import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  ManyToOne,
} from "typeorm"

import { ObjectType, Field, ID } from "type-graphql"
import { Task } from "../task/task.entity"
import { Habit } from "../habit/habit.entity"
import { User } from "../user/user.entity"

@ObjectType()
@Entity()
export class Element extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Field()
  @Column()
  name: string

  @Field()
  @Column({ nullable: true })
  color: string

  @Field()
  @Column({ nullable: true, default: false })
  archived: boolean

  @OneToMany(() => Task, task => task.element)
  tasks: Task[]

  @ManyToMany(() => Habit)
  habit: Habit[]

  @Field(() => [Element], { nullable: true })
  @OneToMany(() => Element, element => element.children, {
    cascade: false,
    nullable: true,
  })
  children: Element[]

  @ManyToOne(() => Element, element => element.parent, {
    cascade: false,
    nullable: true,
  })
  parent: Element

  @Field({ nullable: true })
  @Column({ nullable: true })
  parentId: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  creatorId: string

  @Field(() => User)
  @ManyToOne(() => User, user => user.elements)
  creator: User

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date
}
