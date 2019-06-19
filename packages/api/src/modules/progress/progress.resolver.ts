import { Resolver, Authorized, Query } from "type-graphql"

import { Progress } from "./progress.entity"
import { ProgressService } from "./progress.service"

@Resolver(() => Progress)
export class ProgressResolver {
  constructor(private readonly progressService: ProgressService) {}

  // ALL PROGRESS
  @Authorized()
  @Query(() => [Progress], { nullable: true })
  allProgress(): Promise<Progress[]> {
    return this.progressService.findAll()
  }
}
