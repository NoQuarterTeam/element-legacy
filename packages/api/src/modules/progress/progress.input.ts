import { InputType, Field } from "type-graphql"
import { Progress } from "./progress.entity"
import { Task } from "../task/task.entity"

@InputType()
export class InputProgress implements Partial<Progress> {
  @Field({ nullable: true })
  task?: Task
}
