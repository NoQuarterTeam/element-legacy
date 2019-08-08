import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm"

import { ObjectType, Field, ID } from "type-graphql"
import { Task } from "../task/task.entity"

@ObjectType()
@Entity()
export class Progress extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string

  // @Field()
  // @Column({ nullable: true })
  // date: Date

  @Field(() => Task)
  @ManyToOne(() => Task, task => task.progress, {
    eager: true,
    onDelete: "CASCADE",
  })
  task: Task

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date
}
