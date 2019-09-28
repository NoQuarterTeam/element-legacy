import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm"

import { ObjectType, Field, ID } from "type-graphql"
import { User } from "../user/user.entity"
import { Element } from "../element/element.entity"

@ObjectType()
@Entity()
export class SharedElement extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Field()
  @Column()
  elementId: string

  @Field(() => Element)
  @ManyToOne(() => Element, element => element.sharedElements)
  element: Element

  @Field()
  @Column()
  userId: string

  @Field(() => User)
  @ManyToOne(() => User, user => user.sharedElements)
  user: User

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date
}
