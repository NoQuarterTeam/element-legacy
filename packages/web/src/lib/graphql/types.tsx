export type Maybe<T> = T | null

export interface RegisterInput {
  firstName: string

  lastName: string

  email: string

  password: string
}

export interface LoginInput {
  email: string

  password: string
}

export interface UpdateInput {
  firstName?: Maybe<string>

  lastName?: Maybe<string>

  email?: Maybe<string>

  password?: Maybe<string>
}

// ====================================================
// Documents
// ====================================================

export namespace Me {
  export type Variables = {}

  export type Query = {
    __typename?: "Query"

    me: Maybe<Me>
  }

  export type Me = User.Fragment
}

export namespace Login {
  export type Variables = {
    data: LoginInput
  }

  export type Mutation = {
    __typename?: "Mutation"

    login: Login
  }

  export type Login = {
    __typename?: "UserAuthResponse"

    user: User

    token: string
  }

  export type User = User.Fragment
}

export namespace Register {
  export type Variables = {
    data: RegisterInput
  }

  export type Mutation = {
    __typename?: "Mutation"

    register: Register
  }

  export type Register = {
    __typename?: "UserAuthResponse"

    user: User

    token: string
  }

  export type User = User.Fragment
}

export namespace UpdateUser {
  export type Variables = {
    data: UpdateInput
  }

  export type Mutation = {
    __typename?: "Mutation"

    updateUser: Maybe<UpdateUser>
  }

  export type UpdateUser = User.Fragment
}

export namespace Logout {
  export type Variables = {}

  export type Mutation = {
    __typename?: "Mutation"

    logout: boolean
  }
}

export namespace User {
  export type Fragment = {
    __typename?: "User"

    id: string

    firstName: string

    lastName: string

    email: string
  }
}

import gql from "graphql-tag"
import * as ReactApolloHooks from "react-apollo-hooks"

// ====================================================
// Fragments
// ====================================================

export namespace User {
  export const FragmentDoc = gql`
    fragment User on User {
      id
      firstName
      lastName
      email
    }
  `
}

// ====================================================
// Components
// ====================================================

export namespace Me {
  export const Document = gql`
    query Me {
      me {
        ...User
      }
    }

    ${User.FragmentDoc}
  `
  export function use(
    baseOptions?: ReactApolloHooks.QueryHookOptions<Variables>,
  ) {
    return ReactApolloHooks.useQuery<Query, Variables>(Document, baseOptions)
  }
}
export namespace Login {
  export const Document = gql`
    mutation Login($data: LoginInput!) {
      login(data: $data) {
        user {
          ...User
        }
        token
      }
    }

    ${User.FragmentDoc}
  `
  export function use(
    baseOptions?: ReactApolloHooks.MutationHookOptions<Mutation, Variables>,
  ) {
    return ReactApolloHooks.useMutation<Mutation, Variables>(
      Document,
      baseOptions,
    )
  }
}
export namespace Register {
  export const Document = gql`
    mutation Register($data: RegisterInput!) {
      register(data: $data) {
        user {
          ...User
        }
        token
      }
    }

    ${User.FragmentDoc}
  `
  export function use(
    baseOptions?: ReactApolloHooks.MutationHookOptions<Mutation, Variables>,
  ) {
    return ReactApolloHooks.useMutation<Mutation, Variables>(
      Document,
      baseOptions,
    )
  }
}
export namespace UpdateUser {
  export const Document = gql`
    mutation UpdateUser($data: UpdateInput!) {
      updateUser(data: $data) {
        ...User
      }
    }

    ${User.FragmentDoc}
  `
  export function use(
    baseOptions?: ReactApolloHooks.MutationHookOptions<Mutation, Variables>,
  ) {
    return ReactApolloHooks.useMutation<Mutation, Variables>(
      Document,
      baseOptions,
    )
  }
}
export namespace Logout {
  export const Document = gql`
    mutation Logout {
      logout
    }
  `
  export function use(
    baseOptions?: ReactApolloHooks.MutationHookOptions<Mutation, Variables>,
  ) {
    return ReactApolloHooks.useMutation<Mutation, Variables>(
      Document,
      baseOptions,
    )
  }
}

// ====================================================
// Types
// ====================================================

export interface Query {
  me?: Maybe<User>
}

export interface User {
  id: string

  email: string

  firstName: string

  lastName: string
}

export interface Mutation {
  register: UserAuthResponse

  login: UserAuthResponse

  updateUser?: Maybe<User>

  logout: boolean
}

export interface UserAuthResponse {
  user: User

  token: string
}

// ====================================================
// Arguments
// ====================================================

export interface RegisterMutationArgs {
  data: RegisterInput
}
export interface LoginMutationArgs {
  data: LoginInput
}
export interface UpdateUserMutationArgs {
  data: UpdateInput
}
