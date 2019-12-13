import gql from "graphql-tag"
// import { User } from "../user/fragments"
import { Element } from "./fragments"

export const GET_ALL_ELEMENTS = gql`
  query AllElements($selectedUserId: String!) {
    allElements(selectedUserId: $selectedUserId) {
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

export const UPDATE_ELEMENT = gql`
  mutation UpdateElement($elementId: String!, $data: UpdateElementInput!) {
    updateElement(elementId: $elementId, data: $data) {
      ...Element
    }
  }
  ${Element}
`
