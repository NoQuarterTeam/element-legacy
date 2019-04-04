import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm"

import { Element } from "../element/element.entity"

import { ObjectType, Field, ID } from "type-graphql"

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

  @Field({ nullable: true })
  @Column({ nullable: true })
  order: number

  @ManyToOne(() => Element, element => element.tasks, { eager: true })
  element: Element

  // @OneToMany(() => Progress, progress => progress.task)
  // progress: Progress;

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date
}
