import gql from "graphql-tag"
import { Progress } from "./fragments"

export const GET_ALL_PROGRESS = gql`
  query AllProgress {
    allProgress {
      ...Progress
    }
  }
  ${Progress}
`
