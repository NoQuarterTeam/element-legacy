import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm"

import { ObjectType, Field, ID } from "type-graphql"
import { CreateElementInput } from "../element/element.input"
import { Element } from "../element/element.entity"
import { Progress } from "../progress/progress.entity"

@ObjectType()
@Entity()
export class Task extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Field()
  @Column()
  name: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  startTime: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  description: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  estimatedTime: string

  @Field()
  @Column({ default: false })
  completed: boolean

  @Field({ nullable: true })
  @Column({ nullable: true })
  scheduledDate: Date

  @Field()
  @Column({ type: "int" })
  order: number

  @Field()
  @Column()
  elementId: string

  @Field(() => Element)
  @ManyToOne(() => Element, element => element.tasks, { eager: true })
  element: CreateElementInput

  // @Field()
  @OneToMany(() => Progress, progress => progress.task)
  progress: Progress

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date
}
