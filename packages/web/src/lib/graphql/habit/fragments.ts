import gql from "graphql-tag"

export const Habit = gql`
  fragment Habit on Habit {
    id
    element {
      name
      color
    }
    activeFrom
    archivedAt
  }
`
