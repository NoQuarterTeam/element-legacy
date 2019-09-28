import gql from "graphql-tag"

import { SharedElement } from "./fragments"
import { User } from "../user/fragments"

export const GET_ALL_SHARED_ELEMENTS = gql`
  query AllSharedElements {
    allSharedElements {
      ...SharedElement
    }
  }
  ${SharedElement}
`

export const GET_SHARED_USERS_BY_ELEMENT_ID = gql`
  query AllSharedUsers($elementId: String!) {
    allSharedUsers(elementId: $elementId) {
      ...User
    }
  }
  ${User}
`

export const GET_SHARED_USERS_BY_USER_ID = gql`
  query AllSharedUsersByUser($userId: String!) {
    allSharedUsersByUser(userId: $userId) {
      ...User
    }
  }
  ${User}
`

export const CREATE_SHARED_ELEMENTS = gql`
  mutation CreateSharedElements($data: CreateSharedElementsInput!) {
    createSharedElements(data: $data) {
      ...SharedElement
    }
  }
  ${SharedElement}
`

export const DELETE_SHARED_ELEMENT = gql`
  mutation DeleteSharedElement($email: String!, $elementId: String!) {
    destroySharedElement(email: $email, elementId: $elementId)
  }
`
