type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any
}

export type CreateElementInput = {
  name?: Maybe<Scalars["String"]>
  color?: Maybe<Scalars["String"]>
  archived?: Maybe<Scalars["Boolean"]>
}

export type CreateTaskInput = {
  name?: Maybe<Scalars["String"]>
  startTime?: Maybe<Scalars["String"]>
  description?: Maybe<Scalars["String"]>
  estimatedTime?: Maybe<Scalars["String"]>
  completed?: Maybe<Scalars["Boolean"]>
  scheduledDate?: Maybe<Scalars["DateTime"]>
}

export type Element = {
  id: Scalars["ID"]
  name: Scalars["String"]
  color: Scalars["String"]
  archived: Scalars["Boolean"]
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
}

export type Habit = {
  id: Scalars["ID"]
  archived: Scalars["Boolean"]
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
}

export type InputHabit = {
  archived?: Maybe<Scalars["Boolean"]>
}

export type InputProgress = {
  date?: Maybe<Scalars["DateTime"]>
  archived?: Maybe<Scalars["Boolean"]>
}

export type LoginInput = {
  email: Scalars["String"]
  password: Scalars["String"]
}

export type Mutation = {
  createElement?: Maybe<Element>
  updateElement?: Maybe<Element>
  destroyElement?: Maybe<Scalars["Boolean"]>
  createHabit?: Maybe<Habit>
  updateHabit?: Maybe<Habit>
  destroyHabit?: Maybe<Scalars["Boolean"]>
  createProgress?: Maybe<Progress>
  updateProgress?: Maybe<Progress>
  destroyProgress?: Maybe<Scalars["Boolean"]>
  createTask?: Maybe<Task>
  updateTask?: Maybe<Task>
  destroyTask?: Maybe<Scalars["Boolean"]>
  register: UserAuthResponse
  login: UserAuthResponse
  updateUser?: Maybe<User>
  logout: Scalars["Boolean"]
}

export type MutationCreateElementArgs = {
  data: CreateElementInput
}

export type MutationUpdateElementArgs = {
  data: CreateElementInput
  elementId: Scalars["String"]
}

export type MutationDestroyElementArgs = {
  elementId: Scalars["String"]
}

export type MutationCreateHabitArgs = {
  data: InputHabit
}

export type MutationUpdateHabitArgs = {
  data: InputHabit
  habitId: Scalars["String"]
}

export type MutationDestroyHabitArgs = {
  habitId: Scalars["String"]
}

export type MutationCreateProgressArgs = {
  data: InputProgress
}

export type MutationUpdateProgressArgs = {
  data: InputProgress
  progressId: Scalars["String"]
}

export type MutationDestroyProgressArgs = {
  progressId: Scalars["String"]
}

export type MutationCreateTaskArgs = {
  data: CreateTaskInput
}

export type MutationUpdateTaskArgs = {
  data: UpdateTask
  taskId: Scalars["String"]
}

export type MutationDestroyTaskArgs = {
  taskId: Scalars["String"]
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

export type Progress = {
  id: Scalars["ID"]
  date: Scalars["DateTime"]
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
}

export type Query = {
  allElements?: Maybe<Array<Element>>
  allHabits?: Maybe<Array<Habit>>
  allProgresss?: Maybe<Array<Progress>>
  allTasks?: Maybe<Array<Task>>
  me?: Maybe<User>
}

export type RegisterInput = {
  firstName: Scalars["String"]
  lastName: Scalars["String"]
  email: Scalars["String"]
  password: Scalars["String"]
}

export type Task = {
  id: Scalars["ID"]
  name: Scalars["String"]
  startTime?: Maybe<Scalars["String"]>
  description?: Maybe<Scalars["String"]>
  estimatedTime?: Maybe<Scalars["String"]>
  completed: Scalars["Boolean"]
  scheduledDate?: Maybe<Scalars["DateTime"]>
  order?: Maybe<Scalars["Float"]>
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
}

export type UpdateInput = {
  firstName?: Maybe<Scalars["String"]>
  lastName?: Maybe<Scalars["String"]>
  email?: Maybe<Scalars["String"]>
  password?: Maybe<Scalars["String"]>
}

export type UpdateTask = {
  name?: Maybe<Scalars["String"]>
  startTime?: Maybe<Scalars["String"]>
  description?: Maybe<Scalars["String"]>
  estimatedTime?: Maybe<Scalars["String"]>
  completed?: Maybe<Scalars["Boolean"]>
  scheduledDate?: Maybe<Scalars["DateTime"]>
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
export type ElementFragment = { __typename?: "Element" } & Pick<
  Element,
  "id" | "name" | "color" | "archived"
>

export type AllElementsQueryVariables = {}

export type AllElementsQuery = { __typename?: "Query" } & {
  allElements: Maybe<Array<{ __typename?: "Element" } & ElementFragment>>
}

export type CreateElementMutationVariables = {
  data: CreateElementInput
}

export type CreateElementMutation = { __typename?: "Mutation" } & {
  createElement: Maybe<{ __typename?: "Element" } & ElementFragment>
}

export type TaskFragment = { __typename?: "Task" } & Pick<
  Task,
  | "id"
  | "name"
  | "startTime"
  | "description"
  | "estimatedTime"
  | "completed"
  | "scheduledDate"
>

export type AllTasksQueryVariables = {}

export type AllTasksQuery = { __typename?: "Query" } & {
  allTasks: Maybe<Array<{ __typename?: "Task" } & TaskFragment>>
}

export type CreateTaskMutationVariables = {
  data: CreateTaskInput
}

export type CreateTaskMutation = { __typename?: "Mutation" } & {
  createTask: Maybe<{ __typename?: "Task" } & TaskFragment>
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
export const ElementFragmentDoc = gql`
  fragment Element on Element {
    id
    name
    color
    archived
  }
`
export const TaskFragmentDoc = gql`
  fragment Task on Task {
    id
    name
    startTime
    description
    estimatedTime
    completed
    scheduledDate
  }
`
export const UserFragmentDoc = gql`
  fragment User on User {
    id
    firstName
    lastName
    email
  }
`
export const AllElementsDocument = gql`
  query AllElements {
    allElements {
      ...Element
    }
  }
  ${ElementFragmentDoc}
`

export function useAllElementsQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<AllElementsQueryVariables>,
) {
  return ReactApolloHooks.useQuery<AllElementsQuery, AllElementsQueryVariables>(
    AllElementsDocument,
    baseOptions,
  )
}
export const CreateElementDocument = gql`
  mutation CreateElement($data: CreateElementInput!) {
    createElement(data: $data) {
      ...Element
    }
  }
  ${ElementFragmentDoc}
`

export function useCreateElementMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    CreateElementMutation,
    CreateElementMutationVariables
  >,
) {
  return ReactApolloHooks.useMutation<
    CreateElementMutation,
    CreateElementMutationVariables
  >(CreateElementDocument, baseOptions)
}
export const AllTasksDocument = gql`
  query AllTasks {
    allTasks {
      ...Task
    }
  }
  ${TaskFragmentDoc}
`

export function useAllTasksQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<AllTasksQueryVariables>,
) {
  return ReactApolloHooks.useQuery<AllTasksQuery, AllTasksQueryVariables>(
    AllTasksDocument,
    baseOptions,
  )
}
export const CreateTaskDocument = gql`
  mutation CreateTask($data: CreateTaskInput!) {
    createTask(data: $data) {
      ...Task
    }
  }
  ${TaskFragmentDoc}
`

export function useCreateTaskMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    CreateTaskMutation,
    CreateTaskMutationVariables
  >,
) {
  return ReactApolloHooks.useMutation<
    CreateTaskMutation,
    CreateTaskMutationVariables
  >(CreateTaskDocument, baseOptions)
}
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
