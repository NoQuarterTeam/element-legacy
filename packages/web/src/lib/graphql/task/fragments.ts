import gql from "graphql-tag"

export const Task = gql`
  fragment Task on Task {
    id
    name
    startTime
    description
    estimatedTime
    completed
    scheduledDate
    element
  }
`
