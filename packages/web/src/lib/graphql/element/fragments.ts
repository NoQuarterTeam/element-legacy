import gql from "graphql-tag"

export const Element = gql`
  fragment Element on Element {
    id
    name
    color
    archived
    parentId
    children {
      id
      archived
    }
  }
`
