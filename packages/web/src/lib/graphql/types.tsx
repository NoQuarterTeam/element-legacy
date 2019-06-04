import gql from "graphql-tag"
import * as ReactApolloHooks from "react-apollo-hooks"
import * as ReactApollo from "react-apollo"
export type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any
}

export interface CreateElementInput {
  name?: Maybe<Scalars["String"]>
  color?: Maybe<Scalars["String"]>
  archived?: Maybe<Scalars["Boolean"]>
}

export interface Element {
  __typename?: "Element"
  id: Scalars["ID"]
  name: Scalars["String"]
  color: Scalars["String"]
  archived: Scalars["Boolean"]
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
}

export interface Habit {
  __typename?: "Habit"
  id: Scalars["ID"]
  archived: Scalars["Boolean"]
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
}

export interface InputHabit {
  archived?: Maybe<Scalars["Boolean"]>
}

export interface InputProgress {
  date?: Maybe<Scalars["DateTime"]>
  archived?: Maybe<Scalars["Boolean"]>
}

export interface LoginInput {
  email: Scalars["String"]
  password: Scalars["String"]
}

export interface Mutation {
  __typename?: "Mutation"
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
  updateTaskOrder?: Maybe<Task>
  destroyTask?: Maybe<Scalars["Boolean"]>
  register: UserAuthResponse
  login: UserAuthResponse
  updateUser?: Maybe<User>
  logout: Scalars["Boolean"]
}

export interface MutationCreateElementArgs {
  data: CreateElementInput
}

export interface MutationUpdateElementArgs {
  data: CreateElementInput
  elementId: Scalars["String"]
}

export interface MutationDestroyElementArgs {
  elementId: Scalars["String"]
}

export interface MutationCreateHabitArgs {
  data: InputHabit
}

export interface MutationUpdateHabitArgs {
  data: InputHabit
  habitId: Scalars["String"]
}

export interface MutationDestroyHabitArgs {
  habitId: Scalars["String"]
}

export interface MutationCreateProgressArgs {
  data: InputProgress
}

export interface MutationUpdateProgressArgs {
  data: InputProgress
  progressId: Scalars["String"]
}

export interface MutationDestroyProgressArgs {
  progressId: Scalars["String"]
}

export interface MutationCreateTaskArgs {
  data: TaskInput
}

export interface MutationUpdateTaskArgs {
  data: TaskInput
  taskId: Scalars["String"]
}

export interface MutationUpdateTaskOrderArgs {
  data: OrderTaskInput
  taskId: Scalars["String"]
}

export interface MutationDestroyTaskArgs {
  taskId: Scalars["String"]
}

export interface MutationRegisterArgs {
  data: RegisterInput
}

export interface MutationLoginArgs {
  data: LoginInput
}

export interface MutationUpdateUserArgs {
  data: UpdateInput
}

export interface OrderTaskInput {
  order: Scalars["Float"]
  scheduledDate: Scalars["DateTime"]
}

export interface Progress {
  __typename?: "Progress"
  id: Scalars["ID"]
  date: Scalars["DateTime"]
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
}

export interface Query {
  __typename?: "Query"
  allElements?: Maybe<Element[]>
  allHabits?: Maybe<Habit[]>
  allProgresss?: Maybe<Progress[]>
  allTasks?: Maybe<Task[]>
  me?: Maybe<User>
}

export interface RegisterInput {
  firstName: Scalars["String"]
  lastName: Scalars["String"]
  email: Scalars["String"]
  password: Scalars["String"]
}

export interface Task {
  __typename?: "Task"
  id: Scalars["ID"]
  name: Scalars["String"]
  startTime?: Maybe<Scalars["String"]>
  description?: Maybe<Scalars["String"]>
  estimatedTime?: Maybe<Scalars["String"]>
  completed: Scalars["Boolean"]
  scheduledDate?: Maybe<Scalars["DateTime"]>
  order: Scalars["Float"]
  elementId: Scalars["String"]
  element: Element
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
}

export interface TaskInput {
  name: Scalars["String"]
  startTime: Scalars["String"]
  description: Scalars["String"]
  estimatedTime: Scalars["String"]
  completed: Scalars["Boolean"]
  scheduledDate: Scalars["DateTime"]
  elementId: Scalars["String"]
}

export interface UpdateInput {
  firstName?: Maybe<Scalars["String"]>
  lastName?: Maybe<Scalars["String"]>
  email?: Maybe<Scalars["String"]>
  password?: Maybe<Scalars["String"]>
}

export interface User {
  __typename?: "User"
  id: Scalars["ID"]
  email: Scalars["String"]
  firstName: Scalars["String"]
  lastName: Scalars["String"]
}

export interface UserAuthResponse {
  __typename?: "UserAuthResponse"
  user: User
  token: Scalars["String"]
}
export type ElementFragment = { __typename?: "Element" } & Pick<
  Element,
  "id" | "name" | "color" | "archived"
>

export interface AllElementsQueryVariables {}

export type AllElementsQuery = { __typename?: "Query" } & {
  allElements: Maybe<({ __typename?: "Element" } & ElementFragment)[]>
}

export interface CreateElementMutationVariables {
  data: CreateElementInput
}

export type CreateElementMutation = { __typename?: "Mutation" } & {
  createElement: Maybe<{ __typename?: "Element" } & ElementFragment>
}

export interface UpdateElementMutationVariables {
  elementId: Scalars["String"]
  data: CreateElementInput
}

export type UpdateElementMutation = { __typename?: "Mutation" } & {
  updateElement: Maybe<{ __typename?: "Element" } & ElementFragment>
}

export type TaskFragment = { __typename?: "Task" } & Pick<
  Task,
  | "id"
  | "name"
  | "startTime"
  | "description"
  | "estimatedTime"
  | "completed"
  | "order"
  | "scheduledDate"
  | "elementId"
> & {
    element: { __typename?: "Element" } & Pick<
      Element,
      "id" | "color" | "name" | "archived" | "createdAt" | "updatedAt"
    >
  }

export interface AllTasksQueryVariables {}

export type AllTasksQuery = { __typename?: "Query" } & {
  allTasks: Maybe<({ __typename?: "Task" } & TaskFragment)[]>
}

export interface CreateTaskMutationVariables {
  data: TaskInput
}

export type CreateTaskMutation = { __typename?: "Mutation" } & {
  createTask: Maybe<{ __typename?: "Task" } & TaskFragment>
}

export interface UpdateTaskMutationVariables {
  taskId: Scalars["String"]
  data: TaskInput
}

export type UpdateTaskMutation = { __typename?: "Mutation" } & {
  updateTask: Maybe<{ __typename?: "Task" } & TaskFragment>
}

export interface UpdateTaskOrderMutationVariables {
  taskId: Scalars["String"]
  data: OrderTaskInput
}

export type UpdateTaskOrderMutation = { __typename?: "Mutation" } & {
  updateTaskOrder: Maybe<
    { __typename?: "Task" } & Pick<Task, "id" | "order" | "scheduledDate">
  >
}

export type UserFragment = { __typename?: "User" } & Pick<
  User,
  "id" | "firstName" | "lastName" | "email"
>

export interface MeQueryVariables {}

export type MeQuery = { __typename?: "Query" } & {
  me: Maybe<{ __typename?: "User" } & UserFragment>
}

export interface LoginMutationVariables {
  data: LoginInput
}

export type LoginMutation = { __typename?: "Mutation" } & {
  login: { __typename?: "UserAuthResponse" } & Pick<
    UserAuthResponse,
    "token"
  > & { user: { __typename?: "User" } & UserFragment }
}

export interface RegisterMutationVariables {
  data: RegisterInput
}

export type RegisterMutation = { __typename?: "Mutation" } & {
  register: { __typename?: "UserAuthResponse" } & Pick<
    UserAuthResponse,
    "token"
  > & { user: { __typename?: "User" } & UserFragment }
}

export interface UpdateUserMutationVariables {
  data: UpdateInput
}

export type UpdateUserMutation = { __typename?: "Mutation" } & {
  updateUser: Maybe<{ __typename?: "User" } & UserFragment>
}

export interface LogoutMutationVariables {}

export type LogoutMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "logout"
>
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
    order
    scheduledDate
    elementId
    element {
      id
      color
      name
      archived
      createdAt
      updatedAt
    }
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
export type CreateElementMutationFn = ReactApollo.MutationFn<
  CreateElementMutation,
  CreateElementMutationVariables
>

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
export const UpdateElementDocument = gql`
  mutation UpdateElement($elementId: String!, $data: CreateElementInput!) {
    updateElement(elementId: $elementId, data: $data) {
      ...Element
    }
  }
  ${ElementFragmentDoc}
`
export type UpdateElementMutationFn = ReactApollo.MutationFn<
  UpdateElementMutation,
  UpdateElementMutationVariables
>

export function useUpdateElementMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    UpdateElementMutation,
    UpdateElementMutationVariables
  >,
) {
  return ReactApolloHooks.useMutation<
    UpdateElementMutation,
    UpdateElementMutationVariables
  >(UpdateElementDocument, baseOptions)
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
  mutation CreateTask($data: TaskInput!) {
    createTask(data: $data) {
      ...Task
    }
  }
  ${TaskFragmentDoc}
`
export type CreateTaskMutationFn = ReactApollo.MutationFn<
  CreateTaskMutation,
  CreateTaskMutationVariables
>

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
export const UpdateTaskDocument = gql`
  mutation UpdateTask($taskId: String!, $data: TaskInput!) {
    updateTask(taskId: $taskId, data: $data) {
      ...Task
    }
  }
  ${TaskFragmentDoc}
`
export type UpdateTaskMutationFn = ReactApollo.MutationFn<
  UpdateTaskMutation,
  UpdateTaskMutationVariables
>

export function useUpdateTaskMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    UpdateTaskMutation,
    UpdateTaskMutationVariables
  >,
) {
  return ReactApolloHooks.useMutation<
    UpdateTaskMutation,
    UpdateTaskMutationVariables
  >(UpdateTaskDocument, baseOptions)
}
export const UpdateTaskOrderDocument = gql`
  mutation UpdateTaskOrder($taskId: String!, $data: OrderTaskInput!) {
    updateTaskOrder(taskId: $taskId, data: $data) {
      id
      order
      scheduledDate
    }
  }
`
export type UpdateTaskOrderMutationFn = ReactApollo.MutationFn<
  UpdateTaskOrderMutation,
  UpdateTaskOrderMutationVariables
>

export function useUpdateTaskOrderMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    UpdateTaskOrderMutation,
    UpdateTaskOrderMutationVariables
  >,
) {
  return ReactApolloHooks.useMutation<
    UpdateTaskOrderMutation,
    UpdateTaskOrderMutationVariables
  >(UpdateTaskOrderDocument, baseOptions)
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
export type LoginMutationFn = ReactApollo.MutationFn<
  LoginMutation,
  LoginMutationVariables
>

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
export type RegisterMutationFn = ReactApollo.MutationFn<
  RegisterMutation,
  RegisterMutationVariables
>

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
export type UpdateUserMutationFn = ReactApollo.MutationFn<
  UpdateUserMutation,
  UpdateUserMutationVariables
>

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
export type LogoutMutationFn = ReactApollo.MutationFn<
  LogoutMutation,
  LogoutMutationVariables
>

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
