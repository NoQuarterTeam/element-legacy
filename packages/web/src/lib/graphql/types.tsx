type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type LoginInput = {
  email: Scalars["String"]
  password: Scalars["String"]
}

export type Mutation = {
  register: UserAuthResponse
  login: UserAuthResponse
  updateUser?: Maybe<User>
  logout: Scalars["Boolean"]
}

export type MutationRegisterArgs = {
  data: RegisterInput
}

export type MutationLoginArgs = {
  data: LoginInput
}

export type MutationUpdateUserArgs = {
  data: UpdateInput
}

export type Query = {
  me?: Maybe<User>
}

export type RegisterInput = {
  firstName: Scalars["String"]
  lastName: Scalars["String"]
  email: Scalars["String"]
  password: Scalars["String"]
}

export type UpdateInput = {
  firstName?: Maybe<Scalars["String"]>
  lastName?: Maybe<Scalars["String"]>
  email?: Maybe<Scalars["String"]>
  password?: Maybe<Scalars["String"]>
}

export type User = {
  id: Scalars["ID"]
  email: Scalars["String"]
  firstName: Scalars["String"]
  lastName: Scalars["String"]
}

export type UserAuthResponse = {
  user: User
  token: Scalars["String"]
}
export type UserFragment = { __typename?: "User" } & Pick<
  User,
  "id" | "firstName" | "lastName" | "email"
>

export type MeQueryVariables = {}

export type MeQuery = { __typename?: "Query" } & {
  me: Maybe<{ __typename?: "User" } & UserFragment>
}

export type LoginMutationVariables = {
  data: LoginInput
}

export type LoginMutation = { __typename?: "Mutation" } & {
  login: { __typename?: "UserAuthResponse" } & Pick<
    UserAuthResponse,
    "token"
  > & { user: { __typename?: "User" } & UserFragment }
}

export type RegisterMutationVariables = {
  data: RegisterInput
}

export type RegisterMutation = { __typename?: "Mutation" } & {
  register: { __typename?: "UserAuthResponse" } & Pick<
    UserAuthResponse,
    "token"
  > & { user: { __typename?: "User" } & UserFragment }
}

export type UpdateUserMutationVariables = {
  data: UpdateInput
}

export type UpdateUserMutation = { __typename?: "Mutation" } & {
  updateUser: Maybe<{ __typename?: "User" } & UserFragment>
}

export type LogoutMutationVariables = {}

export type LogoutMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "logout"
>

import gql from "graphql-tag"
import * as ReactApolloHooks from "react-apollo-hooks"
export const UserFragmentDoc = gql`
  fragment User on User {
    id
    firstName
    lastName
    email
  }
`
export const MeDocument = gql`
  query Me {
    me {
      ...User
    }
  }
  ${UserFragmentDoc}
`

export function useMeQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<MeQueryVariables>,
) {
  return ReactApolloHooks.useQuery<MeQuery, MeQueryVariables>(
    MeDocument,
    baseOptions,
  )
}
export const LoginDocument = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      user {
        ...User
      }
      token
    }
  }
  ${UserFragmentDoc}
`

export function useLoginMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >,
) {
  return ReactApolloHooks.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    baseOptions,
  )
}
export const RegisterDocument = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      user {
        ...User
      }
      token
    }
  }
  ${UserFragmentDoc}
`

export function useRegisterMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >,
) {
  return ReactApolloHooks.useMutation<
    RegisterMutation,
    RegisterMutationVariables
  >(RegisterDocument, baseOptions)
}
export const UpdateUserDocument = gql`
  mutation UpdateUser($data: UpdateInput!) {
    updateUser(data: $data) {
      ...User
    }
  }
  ${UserFragmentDoc}
`

export function useUpdateUserMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >,
) {
  return ReactApolloHooks.useMutation<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >(UpdateUserDocument, baseOptions)
}
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`

export function useLogoutMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >,
) {
  return ReactApolloHooks.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    baseOptions,
  )
}
