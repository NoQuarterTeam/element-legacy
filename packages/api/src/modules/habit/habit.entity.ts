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
export class Habit extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Field()
  @Column({ nullable: true })
  archived: boolean

  // @OneToOne(() => Element, { eager: true })
  // @JoinColumn()
  // element: Element;

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date
}
