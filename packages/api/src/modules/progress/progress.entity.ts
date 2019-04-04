import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm"

import { ObjectType, Field, ID } from "type-graphql"

@ObjectType()
@Entity()
export class Progress extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Field()
  @Column({ nullable: true })
  date: Date

  // @ManyToOne(() => Task, task => task.progress, { eager: true })
  // task: Task;

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date
}
