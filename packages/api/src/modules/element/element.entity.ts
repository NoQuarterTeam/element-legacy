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
  JoinColumn,
} from "typeorm"

import { ObjectType, Field, ID } from "type-graphql"
import { Task } from "../task/task.entity"
import { Habit } from "../habit/habit.entity"

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

  // @Field(() => Element)
  // @ManyToOne(() => Element)
  // parentElement: Element

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date
}
