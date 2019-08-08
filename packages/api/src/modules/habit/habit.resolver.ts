import { Resolver, Mutation, Arg, Authorized, Query, Ctx } from "type-graphql"

import { Habit } from "./habit.entity"
import { HabitService } from "./habit.service"

import { HabitInput } from "./habit.input"
import { ResolverContext } from "../../lib/types"

@Resolver(() => Habit)
export class HabitResolver {
  constructor(private readonly habitService: HabitService) {}

  // ALL HABITS
  @Authorized()
  @Query(() => [Habit], { nullable: true })
  allHabits(@Ctx() { userId }: ResolverContext): Promise<Habit[]> {
    return this.habitService.findAll(userId)
  }

  // CREATE HABIT
  @Authorized()
  @Mutation(() => Habit, { nullable: true })
  async createHabit(
    @Arg("data") data: HabitInput,
    @Ctx() { userId }: ResolverContext,
  ): Promise<Habit> {
    return this.habitService.create(data, userId)
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
