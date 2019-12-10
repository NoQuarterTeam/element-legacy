import { Entity, ManyToOne } from "typeorm"

import { BaseEntity } from "../shared/base.entity"

import { ObjectType, Field } from "type-graphql"
import { Task } from "../task/task.entity"

@ObjectType()
@Entity()
export class Progress extends BaseEntity<Progress> {
  // @Field()
  // @Column({ nullable: true })
  // date: Date

  @Field(() => Task)
  @ManyToOne(
    () => Task,
    task => task.progress,
    {
      eager: true,
      onDelete: "CASCADE",
    },
  )
  task: Task
}
