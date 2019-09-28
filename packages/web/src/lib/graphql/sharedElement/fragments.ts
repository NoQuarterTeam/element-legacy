import gql from "graphql-tag"

export const SharedElement = gql`
  fragment SharedElement on SharedElement {
    id
    user {
      id
      firstName
    }
    element {
      id
      creator {
        id
        firstName
      }
    }
  }
`
