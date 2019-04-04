import { Resolver, Mutation, Arg, Authorized, Query } from "type-graphql"

import { Habit } from "./habit.entity"
import { HabitService } from "./habit.service"

import { InputHabit } from "./habit.input"

@Resolver(() => Habit)
export class HabitResolver {
  constructor(private readonly habitService: HabitService) {}

  // ALL HABITS
  @Authorized()
  @Query(() => [Habit], { nullable: true })
  allHabits(): Promise<Habit[]> {
    return this.habitService.findAll()
  }

  // CREATE HABIT
  @Authorized()
  @Mutation(() => Habit, { nullable: true })
  async createHabit(@Arg("data") data: InputHabit): Promise<Habit> {
    return this.habitService.create(data)
  }

  // UPDATE HABIT
  @Authorized()
  @Mutation(() => Habit, { nullable: true })
  async updateHabit(
    @Arg("habitId") habitId: string,
    @Arg("data") data: InputHabit,
  ): Promise<Habit> {
    return this.habitService.update(habitId, data)
  }

  // DESTROY HABIT
  @Authorized()
  @Mutation(() => Boolean, { nullable: true })
  destroyHabit(@Arg("habitId") habitId: string): Promise<boolean> {
    return this.habitService.destroy(habitId)
  }
}
