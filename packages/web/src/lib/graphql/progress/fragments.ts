import gql from "graphql-tag"

export const Progress = gql`
  fragment Progress on Progress {
    id
    task {
      name
      scheduledDate
      element {
        name
      }
    }
  }
`
