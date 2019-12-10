import { Resolver, Mutation, Arg, Authorized, Query } from "type-graphql"

import { Habit } from "./habit.entity"
import { HabitService } from "./habit.service"

import { HabitInput } from "./habit.input"
import { User } from "../user/user.entity"
import { CurrentUser } from "../shared/context/currentUser"

@Resolver(() => Habit)
export class HabitResolver {
  constructor(private readonly habitService: HabitService) {}

  // ALL HABITS
  @Authorized()
  @Query(() => [Habit], { nullable: true })
  allHabits(@CurrentUser() user: User): Promise<Habit[]> {
    return this.habitService.findAll(user.id)
  }

  // CREATE HABIT
  @Authorized()
  @Mutation(() => Habit, { nullable: true })
  async createHabit(
    @Arg("data") data: HabitInput,
    @CurrentUser() user: User,
  ): Promise<Habit> {
    return this.habitService.create(data, user.id)
  }

  // UPDATE HABIT
  @Authorized()
  @Mutation(() => Habit, { nullable: true })
  async updateHabit(
    @Arg("habitId") habitId: string,
    @Arg("data") data: HabitInput,
  ): Promise<Habit> {
    return this.habitService.update(habitId, data)
  }

  // ARCHIVE HABIT
  @Authorized()
  @Mutation(() => Habit, { nullable: true })
  archiveHabit(
    @Arg("habitId") habitId: string,
    @Arg("data") data: HabitInput,
  ): Promise<Habit> {
    return this.habitService.archive(habitId, data)
  }
}
