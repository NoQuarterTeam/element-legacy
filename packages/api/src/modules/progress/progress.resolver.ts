import { Resolver, Mutation, Arg, Authorized, Query } from "type-graphql"

import { Progress } from "./progress.entity"
import { ProgressService } from "./progress.service"

import { InputProgress } from "./progress.input"

@Resolver(() => Progress)
export class ProgressResolver {
  constructor(private readonly progressService: ProgressService) {}

  // ALL PROGRESSS
  @Authorized()
  @Query(() => [Progress], { nullable: true })
  allProgresss(): Promise<Progress[]> {
    return this.progressService.findAll()
  }

  // CREATE PROGRESS
  @Authorized()
  @Mutation(() => Progress, { nullable: true })
  async createProgress(@Arg("data") data: InputProgress): Promise<Progress> {
    return this.progressService.create(data)
  }

  // UPDATE PROGRESS
  @Authorized()
  @Mutation(() => Progress, { nullable: true })
  async updateProgress(
    @Arg("progressId") progressId: string,
    @Arg("data") data: InputProgress,
  ): Promise<Progress> {
    return this.progressService.update(progressId, data)
  }

  // DESTROY PROGRESS
  @Authorized()
  @Mutation(() => Boolean, { nullable: true })
  destroyProgress(@Arg("progressId") progressId: string): Promise<boolean> {
    return this.progressService.destroy(progressId)
  }
}
