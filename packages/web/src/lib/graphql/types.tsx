import gql from "graphql-tag"
import * as ReactApolloHooks from "react-apollo-hooks"
import * as ReactApollo from "react-apollo"
export type Maybe<T> = T | null
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
  parentId?: Maybe<Scalars["String"]>
}

export type CreateSharedElementInput = {
  userId?: Maybe<Scalars["String"]>
  creatorId?: Maybe<Scalars["String"]>
  elementId?: Maybe<Scalars["String"]>
}

export type CreateSharedElementsInput = {
  emails: Array<Scalars["String"]>
  elementId: Scalars["String"]
}

export type Element = {
  __typename?: "Element"
  id: Scalars["ID"]
  name: Scalars["String"]
  color: Scalars["String"]
  archived: Scalars["Boolean"]
  children?: Maybe<Array<Element>>
  parentId?: Maybe<Scalars["String"]>
  creatorId?: Maybe<Scalars["String"]>
  creator?: Maybe<User>
  sharedElements?: Maybe<Array<SharedElement>>
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
}

export type Habit = {
  __typename?: "Habit"
  id: Scalars["ID"]
  archived: Scalars["Boolean"]
  elementId: Scalars["String"]
  activeFrom?: Maybe<Scalars["DateTime"]>
  element: Element
  userId?: Maybe<Scalars["String"]>
  user: User
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
  archivedAt?: Maybe<Scalars["DateTime"]>
}

export type HabitInput = {
  elementId?: Maybe<Scalars["String"]>
  archived?: Maybe<Scalars["Boolean"]>
  archivedAt?: Maybe<Scalars["DateTime"]>
  activeFrom?: Maybe<Scalars["DateTime"]>
}

export type LoginInput = {
  email: Scalars["String"]
  password: Scalars["String"]
}

export type Mutation = {
  __typename?: "Mutation"
  createElement?: Maybe<Element>
  updateElement?: Maybe<Element>
  destroyElement?: Maybe<Scalars["Boolean"]>
  createHabit?: Maybe<Habit>
  updateHabit?: Maybe<Habit>
  archiveHabit?: Maybe<Habit>
  createSharedElements?: Maybe<Array<SharedElement>>
  destroySharedElement?: Maybe<Scalars["Boolean"]>
  createTask?: Maybe<Task>
  updateTask?: Maybe<Task>
  updateTaskOrder?: Maybe<Task>
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
  data: HabitInput
}

export type MutationUpdateHabitArgs = {
  data: HabitInput
  habitId: Scalars["String"]
}

export type MutationArchiveHabitArgs = {
  data: HabitInput
  habitId: Scalars["String"]
}

export type MutationCreateSharedElementsArgs = {
  data: CreateSharedElementsInput
}

export type MutationDestroySharedElementArgs = {
  elementId: Scalars["String"]
  email: Scalars["String"]
}

export type MutationCreateTaskArgs = {
  data: TaskInput
}

export type MutationUpdateTaskArgs = {
  data: TaskInput
  taskId: Scalars["String"]
}

export type MutationUpdateTaskOrderArgs = {
  data: OrderTaskInput
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

export type OrderTaskInput = {
  order: Scalars["Float"]
  scheduledDate: Scalars["DateTime"]
  userId: Scalars["String"]
}

export type Progress = {
  __typename?: "Progress"
  id: Scalars["ID"]
  task: Task
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
}

export type Query = {
  __typename?: "Query"
  allElements?: Maybe<Array<Element>>
  allHabits?: Maybe<Array<Habit>>
  allProgress?: Maybe<Array<Progress>>
  allSharedElements?: Maybe<Array<SharedElement>>
  allSharedUsers?: Maybe<Array<User>>
  allSharedUsersByUser?: Maybe<Array<User>>
  allTasks?: Maybe<Array<Task>>
  me?: Maybe<User>
}

export type QueryAllElementsArgs = {
  selectedUserId: Scalars["String"]
}

export type QueryAllSharedUsersArgs = {
  elementId: Scalars["String"]
}

export type QueryAllSharedUsersByUserArgs = {
  userId: Scalars["String"]
}

export type QueryAllTasksArgs = {
  daysForward?: Maybe<Scalars["Float"]>
  daysBack?: Maybe<Scalars["Float"]>
  selectedUserId?: Maybe<Scalars["String"]>
}

export type RegisterInput = {
  firstName: Scalars["String"]
  lastName: Scalars["String"]
  email: Scalars["String"]
  password: Scalars["String"]
}

export type SharedElement = {
  __typename?: "SharedElement"
  id: Scalars["ID"]
  elementId: Scalars["String"]
  element: Element
  userId: Scalars["String"]
  user: User
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
}

export type Subscription = {
  __typename?: "Subscription"
  updateTaskSubscription: Task
  deleteTaskSubscription: Task
}

export type Task = {
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
  userId: Scalars["String"]
  user: User
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
}

export type TaskInput = {
  name?: Maybe<Scalars["String"]>
  startTime?: Maybe<Scalars["String"]>
  description?: Maybe<Scalars["String"]>
  estimatedTime?: Maybe<Scalars["String"]>
  completed?: Maybe<Scalars["Boolean"]>
  scheduledDate?: Maybe<Scalars["DateTime"]>
  elementId?: Maybe<Scalars["String"]>
  userId: Scalars["String"]
  order?: Maybe<Scalars["Float"]>
}

export type UpdateInput = {
  firstName?: Maybe<Scalars["String"]>
  lastName?: Maybe<Scalars["String"]>
  email?: Maybe<Scalars["String"]>
  password?: Maybe<Scalars["String"]>
}

export type User = {
  __typename?: "User"
  id: Scalars["ID"]
  email: Scalars["String"]
  firstName: Scalars["String"]
  lastName: Scalars["String"]
  elements: Array<Element>
  habits: Array<Habit>
  sharedElements?: Maybe<Array<SharedElement>>
  tasks: Array<Task>
}

export type UserAuthResponse = {
  __typename?: "UserAuthResponse"
  user: User
  token: Scalars["String"]
}
export type ElementFragment = { __typename?: "Element" } & Pick<
  Element,
  "id" | "name" | "color" | "archived" | "parentId" | "creatorId"
> & {
    children: Maybe<
      Array<{ __typename?: "Element" } & Pick<Element, "id" | "archived">>
    >
  }

export type AllElementsQueryVariables = {
  selectedUserId: Scalars["String"]
}

export type AllElementsQuery = { __typename?: "Query" } & {
  allElements: Maybe<Array<{ __typename?: "Element" } & ElementFragment>>
}

export type CreateElementMutationVariables = {
  data: CreateElementInput
}

export type CreateElementMutation = { __typename?: "Mutation" } & {
  createElement: Maybe<{ __typename?: "Element" } & ElementFragment>
}

export type UpdateElementMutationVariables = {
  elementId: Scalars["String"]
  data: CreateElementInput
}

export type UpdateElementMutation = { __typename?: "Mutation" } & {
  updateElement: Maybe<{ __typename?: "Element" } & ElementFragment>
}

export type HabitFragment = { __typename?: "Habit" } & Pick<
  Habit,
  "id" | "activeFrom" | "archivedAt"
> & {
    element: { __typename?: "Element" } & Pick<Element, "id" | "name" | "color">
  }

export type AllHabitsQueryVariables = {}

export type AllHabitsQuery = { __typename?: "Query" } & {
  allHabits: Maybe<Array<{ __typename?: "Habit" } & HabitFragment>>
}

export type CreateHabitMutationVariables = {
  data: HabitInput
}

export type CreateHabitMutation = { __typename?: "Mutation" } & {
  createHabit: Maybe<{ __typename?: "Habit" } & HabitFragment>
}

export type ArchiveHabitMutationVariables = {
  habitId: Scalars["String"]
  data: HabitInput
}

export type ArchiveHabitMutation = { __typename?: "Mutation" } & {
  archiveHabit: Maybe<{ __typename?: "Habit" } & HabitFragment>
}

export type ProgressFragment = { __typename?: "Progress" } & Pick<
  Progress,
  "id"
> & {
    task: { __typename?: "Task" } & Pick<Task, "name" | "scheduledDate"> & {
        element: { __typename?: "Element" } & Pick<Element, "name">
      }
  }

export type AllProgressQueryVariables = {}

export type AllProgressQuery = { __typename?: "Query" } & {
  allProgress: Maybe<Array<{ __typename?: "Progress" } & ProgressFragment>>
}

export type SharedElementFragment = { __typename?: "SharedElement" } & Pick<
  SharedElement,
  "id"
> & {
    user: { __typename?: "User" } & Pick<User, "id" | "firstName">
    element: { __typename?: "Element" } & Pick<Element, "id"> & {
        creator: Maybe<{ __typename?: "User" } & Pick<User, "id" | "firstName">>
      }
  }

export type AllSharedElementsQueryVariables = {}

export type AllSharedElementsQuery = { __typename?: "Query" } & {
  allSharedElements: Maybe<
    Array<{ __typename?: "SharedElement" } & SharedElementFragment>
  >
}

export type AllSharedUsersQueryVariables = {
  elementId: Scalars["String"]
}

export type AllSharedUsersQuery = { __typename?: "Query" } & {
  allSharedUsers: Maybe<Array<{ __typename?: "User" } & UserFragment>>
}

export type AllSharedUsersByUserQueryVariables = {
  userId: Scalars["String"]
}

export type AllSharedUsersByUserQuery = { __typename?: "Query" } & {
  allSharedUsersByUser: Maybe<Array<{ __typename?: "User" } & UserFragment>>
}

export type CreateSharedElementsMutationVariables = {
  data: CreateSharedElementsInput
}

export type CreateSharedElementsMutation = { __typename?: "Mutation" } & {
  createSharedElements: Maybe<
    Array<{ __typename?: "SharedElement" } & SharedElementFragment>
  >
}

export type DeleteSharedElementMutationVariables = {
  email: Scalars["String"]
  elementId: Scalars["String"]
}

export type DeleteSharedElementMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "destroySharedElement"
>

export type TaskFragment = { __typename: "Task" } & Pick<
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
  | "userId"
> & {
    element: { __typename?: "Element" } & Pick<
      Element,
      "id" | "color" | "name" | "archived" | "createdAt" | "updatedAt"
    >
  }

export type AllTasksQueryVariables = {
  selectedUserId: Scalars["String"]
  daysBack: Scalars["Float"]
  daysForward: Scalars["Float"]
}

export type AllTasksQuery = { __typename?: "Query" } & {
  allTasks: Maybe<Array<{ __typename?: "Task" } & TaskFragment>>
}

export type CreateTaskMutationVariables = {
  data: TaskInput
}

export type CreateTaskMutation = { __typename?: "Mutation" } & {
  createTask: Maybe<{ __typename?: "Task" } & TaskFragment>
}

export type UpdateTaskMutationVariables = {
  taskId: Scalars["String"]
  data: TaskInput
}

export type UpdateTaskMutation = { __typename?: "Mutation" } & {
  updateTask: Maybe<{ __typename?: "Task" } & TaskFragment>
}

export type UpdateTaskOrderMutationVariables = {
  taskId: Scalars["String"]
  data: OrderTaskInput
}

export type UpdateTaskOrderMutation = { __typename?: "Mutation" } & {
  updateTaskOrder: Maybe<
    { __typename?: "Task" } & Pick<Task, "id" | "order" | "scheduledDate">
  >
}

export type DeleteTaskMutationVariables = {
  taskId: Scalars["String"]
}

export type DeleteTaskMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "destroyTask"
>

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
export const ElementFragmentDoc = gql`
  fragment Element on Element {
    id
    name
    color
    archived
    parentId
    creatorId
    children {
      id
      archived
    }
  }
`
export const HabitFragmentDoc = gql`
  fragment Habit on Habit {
    id
    element {
      id
      name
      color
    }
    activeFrom
    archivedAt
  }
`
export const ProgressFragmentDoc = gql`
  fragment Progress on Progress {
    id
    task {
      name
      scheduledDate
      element {
        name
      }
    }
  }
`
export const SharedElementFragmentDoc = gql`
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
export const TaskFragmentDoc = gql`
  fragment Task on Task {
    __typename
    id
    name
    startTime
    description
    estimatedTime
    completed
    order
    scheduledDate
    elementId
    userId
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
  query AllElements($selectedUserId: String!) {
    allElements(selectedUserId: $selectedUserId) {
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
export const AllHabitsDocument = gql`
  query AllHabits {
    allHabits {
      ...Habit
    }
  }
  ${HabitFragmentDoc}
`

export function useAllHabitsQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<AllHabitsQueryVariables>,
) {
  return ReactApolloHooks.useQuery<AllHabitsQuery, AllHabitsQueryVariables>(
    AllHabitsDocument,
    baseOptions,
  )
}
export const CreateHabitDocument = gql`
  mutation CreateHabit($data: HabitInput!) {
    createHabit(data: $data) {
      ...Habit
    }
  }
  ${HabitFragmentDoc}
`
export type CreateHabitMutationFn = ReactApollo.MutationFn<
  CreateHabitMutation,
  CreateHabitMutationVariables
>

export function useCreateHabitMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    CreateHabitMutation,
    CreateHabitMutationVariables
  >,
) {
  return ReactApolloHooks.useMutation<
    CreateHabitMutation,
    CreateHabitMutationVariables
  >(CreateHabitDocument, baseOptions)
}
export const ArchiveHabitDocument = gql`
  mutation ArchiveHabit($habitId: String!, $data: HabitInput!) {
    archiveHabit(habitId: $habitId, data: $data) {
      ...Habit
    }
  }
  ${HabitFragmentDoc}
`
export type ArchiveHabitMutationFn = ReactApollo.MutationFn<
  ArchiveHabitMutation,
  ArchiveHabitMutationVariables
>

export function useArchiveHabitMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    ArchiveHabitMutation,
    ArchiveHabitMutationVariables
  >,
) {
  return ReactApolloHooks.useMutation<
    ArchiveHabitMutation,
    ArchiveHabitMutationVariables
  >(ArchiveHabitDocument, baseOptions)
}
export const AllProgressDocument = gql`
  query AllProgress {
    allProgress {
      ...Progress
    }
  }
  ${ProgressFragmentDoc}
`

export function useAllProgressQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<AllProgressQueryVariables>,
) {
  return ReactApolloHooks.useQuery<AllProgressQuery, AllProgressQueryVariables>(
    AllProgressDocument,
    baseOptions,
  )
}
export const AllSharedElementsDocument = gql`
  query AllSharedElements {
    allSharedElements {
      ...SharedElement
    }
  }
  ${SharedElementFragmentDoc}
`

export function useAllSharedElementsQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<
    AllSharedElementsQueryVariables
  >,
) {
  return ReactApolloHooks.useQuery<
    AllSharedElementsQuery,
    AllSharedElementsQueryVariables
  >(AllSharedElementsDocument, baseOptions)
}
export const AllSharedUsersDocument = gql`
  query AllSharedUsers($elementId: String!) {
    allSharedUsers(elementId: $elementId) {
      ...User
    }
  }
  ${UserFragmentDoc}
`

export function useAllSharedUsersQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<AllSharedUsersQueryVariables>,
) {
  return ReactApolloHooks.useQuery<
    AllSharedUsersQuery,
    AllSharedUsersQueryVariables
  >(AllSharedUsersDocument, baseOptions)
}
export const AllSharedUsersByUserDocument = gql`
  query AllSharedUsersByUser($userId: String!) {
    allSharedUsersByUser(userId: $userId) {
      ...User
    }
  }
  ${UserFragmentDoc}
`

export function useAllSharedUsersByUserQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<
    AllSharedUsersByUserQueryVariables
  >,
) {
  return ReactApolloHooks.useQuery<
    AllSharedUsersByUserQuery,
    AllSharedUsersByUserQueryVariables
  >(AllSharedUsersByUserDocument, baseOptions)
}
export const CreateSharedElementsDocument = gql`
  mutation CreateSharedElements($data: CreateSharedElementsInput!) {
    createSharedElements(data: $data) {
      ...SharedElement
    }
  }
  ${SharedElementFragmentDoc}
`
export type CreateSharedElementsMutationFn = ReactApollo.MutationFn<
  CreateSharedElementsMutation,
  CreateSharedElementsMutationVariables
>

export function useCreateSharedElementsMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    CreateSharedElementsMutation,
    CreateSharedElementsMutationVariables
  >,
) {
  return ReactApolloHooks.useMutation<
    CreateSharedElementsMutation,
    CreateSharedElementsMutationVariables
  >(CreateSharedElementsDocument, baseOptions)
}
export const DeleteSharedElementDocument = gql`
  mutation DeleteSharedElement($email: String!, $elementId: String!) {
    destroySharedElement(email: $email, elementId: $elementId)
  }
`
export type DeleteSharedElementMutationFn = ReactApollo.MutationFn<
  DeleteSharedElementMutation,
  DeleteSharedElementMutationVariables
>

export function useDeleteSharedElementMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    DeleteSharedElementMutation,
    DeleteSharedElementMutationVariables
  >,
) {
  return ReactApolloHooks.useMutation<
    DeleteSharedElementMutation,
    DeleteSharedElementMutationVariables
  >(DeleteSharedElementDocument, baseOptions)
}
export const AllTasksDocument = gql`
  query AllTasks(
    $selectedUserId: String!
    $daysBack: Float!
    $daysForward: Float!
  ) {
    allTasks(
      selectedUserId: $selectedUserId
      daysBack: $daysBack
      daysForward: $daysForward
    ) @connection(key: "timeline", filter: ["selectedUserId"]) {
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
export const DeleteTaskDocument = gql`
  mutation DeleteTask($taskId: String!) {
    destroyTask(taskId: $taskId)
  }
`
export type DeleteTaskMutationFn = ReactApollo.MutationFn<
  DeleteTaskMutation,
  DeleteTaskMutationVariables
>

export function useDeleteTaskMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    DeleteTaskMutation,
    DeleteTaskMutationVariables
  >,
) {
  return ReactApolloHooks.useMutation<
    DeleteTaskMutation,
    DeleteTaskMutationVariables
  >(DeleteTaskDocument, baseOptions)
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
