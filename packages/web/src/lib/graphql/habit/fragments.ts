import gql from "graphql-tag"

export const Habit = gql`
  fragment Habit on Habit {
    id
    element {
      id
      name
      color
    }
    activeFrom
    archivedAt
  }
`
