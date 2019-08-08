import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm"

import { ObjectType, Field, ID } from "type-graphql"
import { Element } from "../element/element.entity"
import { User } from "../user/user.entity"

@ObjectType()
@Entity()
export class Habit extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Field()
  @Column({ default: false })
  archived: boolean

  @Field()
  @Column()
  elementId: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  activeFrom: Date

  @Field(() => Element)
  @ManyToOne(() => Element, { eager: true })
  @JoinColumn()
  element: Element

  @Field({ nullable: true })
  @Column({ nullable: true })
  userId: string

  @Field(() => User)
  @ManyToOne(() => User, user => user.habits)
  user: User

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date

  @Field({ nullable: true })
  @Column({ nullable: true })
  archivedAt: Date
}
