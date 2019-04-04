import gql from "graphql-tag"
// import { User } from "../user/fragments"
import { Element } from "./fragments"

export const GET_ALL_ELEMENTS = gql`
  query AllElements {
    allElements {
      ...Element
    }
  }
  ${Element}
`

export const CREATE_ELEMENT = gql`
  mutation CreateElement($data: CreateElementInput!) {
    createElement(data: $data) {
      ...Element
    }
  }
  ${Element}
`
