import gql from "graphql-tag"

export const Task = gql`
  fragment Task on Task {
    id
    name
    startTime
    description
    estimatedTime
    completed
    order
    scheduledDate
    elementId
    element {
      id
      color
      name
      archived
      createdAt
      updatedAt
    }
  }
`
