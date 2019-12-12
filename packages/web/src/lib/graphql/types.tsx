import gql from "graphql-tag"
import * as ApolloReactCommon from "@apollo/react-common"
import * as ApolloReactHooks from "@apollo/react-hooks"
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

export type BaseEntity = {
  __typename?: "BaseEntity"
  id: Scalars["ID"]
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
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
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
  name: Scalars["String"]
  color?: Maybe<Scalars["String"]>
  archived?: Maybe<Scalars["Boolean"]>
  children?: Maybe<Array<Element>>
  parentId?: Maybe<Scalars["String"]>
  creatorId?: Maybe<Scalars["String"]>
  creator?: Maybe<User>
  sharedElements?: Maybe<Array<SharedElement>>
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

/**
 * __useAllElementsQuery__
 *
 * To run a query within a React component, call `useAllElementsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllElementsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllElementsQuery({
 *   variables: {
 *      selectedUserId: // value for 'selectedUserId'
 *   },
 * });
 */
export function useAllElementsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    AllElementsQuery,
    AllElementsQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<AllElementsQuery, AllElementsQueryVariables>(
    AllElementsDocument,
    baseOptions,
  )
}
export function useAllElementsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    AllElementsQuery,
    AllElementsQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    AllElementsQuery,
    AllElementsQueryVariables
  >(AllElementsDocument, baseOptions)
}
export type AllElementsQueryHookResult = ReturnType<typeof useAllElementsQuery>
export type AllElementsLazyQueryHookResult = ReturnType<
  typeof useAllElementsLazyQuery
>
export type AllElementsQueryResult = ApolloReactCommon.QueryResult<
  AllElementsQuery,
  AllElementsQueryVariables
>
export const CreateElementDocument = gql`
  mutation CreateElement($data: CreateElementInput!) {
    createElement(data: $data) {
      ...Element
    }
  }
  ${ElementFragmentDoc}
`
export type CreateElementMutationFn = ApolloReactCommon.MutationFunction<
  CreateElementMutation,
  CreateElementMutationVariables
>

/**
 * __useCreateElementMutation__
 *
 * To run a mutation, you first call `useCreateElementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateElementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createElementMutation, { data, loading, error }] = useCreateElementMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateElementMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateElementMutation,
    CreateElementMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    CreateElementMutation,
    CreateElementMutationVariables
  >(CreateElementDocument, baseOptions)
}
export type CreateElementMutationHookResult = ReturnType<
  typeof useCreateElementMutation
>
export type CreateElementMutationResult = ApolloReactCommon.MutationResult<
  CreateElementMutation
>
export type CreateElementMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateElementMutation,
  CreateElementMutationVariables
>
export const UpdateElementDocument = gql`
  mutation UpdateElement($elementId: String!, $data: CreateElementInput!) {
    updateElement(elementId: $elementId, data: $data) {
      ...Element
    }
  }
  ${ElementFragmentDoc}
`
export type UpdateElementMutationFn = ApolloReactCommon.MutationFunction<
  UpdateElementMutation,
  UpdateElementMutationVariables
>

/**
 * __useUpdateElementMutation__
 *
 * To run a mutation, you first call `useUpdateElementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateElementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateElementMutation, { data, loading, error }] = useUpdateElementMutation({
 *   variables: {
 *      elementId: // value for 'elementId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateElementMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateElementMutation,
    UpdateElementMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    UpdateElementMutation,
    UpdateElementMutationVariables
  >(UpdateElementDocument, baseOptions)
}
export type UpdateElementMutationHookResult = ReturnType<
  typeof useUpdateElementMutation
>
export type UpdateElementMutationResult = ApolloReactCommon.MutationResult<
  UpdateElementMutation
>
export type UpdateElementMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateElementMutation,
  UpdateElementMutationVariables
>
export const AllHabitsDocument = gql`
  query AllHabits {
    allHabits {
      ...Habit
    }
  }
  ${HabitFragmentDoc}
`

/**
 * __useAllHabitsQuery__
 *
 * To run a query within a React component, call `useAllHabitsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllHabitsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllHabitsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllHabitsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    AllHabitsQuery,
    AllHabitsQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<AllHabitsQuery, AllHabitsQueryVariables>(
    AllHabitsDocument,
    baseOptions,
  )
}
export function useAllHabitsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    AllHabitsQuery,
    AllHabitsQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<AllHabitsQuery, AllHabitsQueryVariables>(
    AllHabitsDocument,
    baseOptions,
  )
}
export type AllHabitsQueryHookResult = ReturnType<typeof useAllHabitsQuery>
export type AllHabitsLazyQueryHookResult = ReturnType<
  typeof useAllHabitsLazyQuery
>
export type AllHabitsQueryResult = ApolloReactCommon.QueryResult<
  AllHabitsQuery,
  AllHabitsQueryVariables
>
export const CreateHabitDocument = gql`
  mutation CreateHabit($data: HabitInput!) {
    createHabit(data: $data) {
      ...Habit
    }
  }
  ${HabitFragmentDoc}
`
export type CreateHabitMutationFn = ApolloReactCommon.MutationFunction<
  CreateHabitMutation,
  CreateHabitMutationVariables
>

/**
 * __useCreateHabitMutation__
 *
 * To run a mutation, you first call `useCreateHabitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateHabitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createHabitMutation, { data, loading, error }] = useCreateHabitMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateHabitMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateHabitMutation,
    CreateHabitMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    CreateHabitMutation,
    CreateHabitMutationVariables
  >(CreateHabitDocument, baseOptions)
}
export type CreateHabitMutationHookResult = ReturnType<
  typeof useCreateHabitMutation
>
export type CreateHabitMutationResult = ApolloReactCommon.MutationResult<
  CreateHabitMutation
>
export type CreateHabitMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateHabitMutation,
  CreateHabitMutationVariables
>
export const ArchiveHabitDocument = gql`
  mutation ArchiveHabit($habitId: String!, $data: HabitInput!) {
    archiveHabit(habitId: $habitId, data: $data) {
      ...Habit
    }
  }
  ${HabitFragmentDoc}
`
export type ArchiveHabitMutationFn = ApolloReactCommon.MutationFunction<
  ArchiveHabitMutation,
  ArchiveHabitMutationVariables
>

/**
 * __useArchiveHabitMutation__
 *
 * To run a mutation, you first call `useArchiveHabitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveHabitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveHabitMutation, { data, loading, error }] = useArchiveHabitMutation({
 *   variables: {
 *      habitId: // value for 'habitId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useArchiveHabitMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ArchiveHabitMutation,
    ArchiveHabitMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    ArchiveHabitMutation,
    ArchiveHabitMutationVariables
  >(ArchiveHabitDocument, baseOptions)
}
export type ArchiveHabitMutationHookResult = ReturnType<
  typeof useArchiveHabitMutation
>
export type ArchiveHabitMutationResult = ApolloReactCommon.MutationResult<
  ArchiveHabitMutation
>
export type ArchiveHabitMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ArchiveHabitMutation,
  ArchiveHabitMutationVariables
>
export const AllProgressDocument = gql`
  query AllProgress {
    allProgress {
      ...Progress
    }
  }
  ${ProgressFragmentDoc}
`

/**
 * __useAllProgressQuery__
 *
 * To run a query within a React component, call `useAllProgressQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllProgressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllProgressQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllProgressQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    AllProgressQuery,
    AllProgressQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<AllProgressQuery, AllProgressQueryVariables>(
    AllProgressDocument,
    baseOptions,
  )
}
export function useAllProgressLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    AllProgressQuery,
    AllProgressQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    AllProgressQuery,
    AllProgressQueryVariables
  >(AllProgressDocument, baseOptions)
}
export type AllProgressQueryHookResult = ReturnType<typeof useAllProgressQuery>
export type AllProgressLazyQueryHookResult = ReturnType<
  typeof useAllProgressLazyQuery
>
export type AllProgressQueryResult = ApolloReactCommon.QueryResult<
  AllProgressQuery,
  AllProgressQueryVariables
>
export const AllSharedElementsDocument = gql`
  query AllSharedElements {
    allSharedElements {
      ...SharedElement
    }
  }
  ${SharedElementFragmentDoc}
`

/**
 * __useAllSharedElementsQuery__
 *
 * To run a query within a React component, call `useAllSharedElementsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllSharedElementsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllSharedElementsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllSharedElementsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    AllSharedElementsQuery,
    AllSharedElementsQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    AllSharedElementsQuery,
    AllSharedElementsQueryVariables
  >(AllSharedElementsDocument, baseOptions)
}
export function useAllSharedElementsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    AllSharedElementsQuery,
    AllSharedElementsQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    AllSharedElementsQuery,
    AllSharedElementsQueryVariables
  >(AllSharedElementsDocument, baseOptions)
}
export type AllSharedElementsQueryHookResult = ReturnType<
  typeof useAllSharedElementsQuery
>
export type AllSharedElementsLazyQueryHookResult = ReturnType<
  typeof useAllSharedElementsLazyQuery
>
export type AllSharedElementsQueryResult = ApolloReactCommon.QueryResult<
  AllSharedElementsQuery,
  AllSharedElementsQueryVariables
>
export const AllSharedUsersDocument = gql`
  query AllSharedUsers($elementId: String!) {
    allSharedUsers(elementId: $elementId) {
      ...User
    }
  }
  ${UserFragmentDoc}
`

/**
 * __useAllSharedUsersQuery__
 *
 * To run a query within a React component, call `useAllSharedUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllSharedUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllSharedUsersQuery({
 *   variables: {
 *      elementId: // value for 'elementId'
 *   },
 * });
 */
export function useAllSharedUsersQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    AllSharedUsersQuery,
    AllSharedUsersQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    AllSharedUsersQuery,
    AllSharedUsersQueryVariables
  >(AllSharedUsersDocument, baseOptions)
}
export function useAllSharedUsersLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    AllSharedUsersQuery,
    AllSharedUsersQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    AllSharedUsersQuery,
    AllSharedUsersQueryVariables
  >(AllSharedUsersDocument, baseOptions)
}
export type AllSharedUsersQueryHookResult = ReturnType<
  typeof useAllSharedUsersQuery
>
export type AllSharedUsersLazyQueryHookResult = ReturnType<
  typeof useAllSharedUsersLazyQuery
>
export type AllSharedUsersQueryResult = ApolloReactCommon.QueryResult<
  AllSharedUsersQuery,
  AllSharedUsersQueryVariables
>
export const AllSharedUsersByUserDocument = gql`
  query AllSharedUsersByUser($userId: String!) {
    allSharedUsersByUser(userId: $userId) {
      ...User
    }
  }
  ${UserFragmentDoc}
`

/**
 * __useAllSharedUsersByUserQuery__
 *
 * To run a query within a React component, call `useAllSharedUsersByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllSharedUsersByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllSharedUsersByUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useAllSharedUsersByUserQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    AllSharedUsersByUserQuery,
    AllSharedUsersByUserQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    AllSharedUsersByUserQuery,
    AllSharedUsersByUserQueryVariables
  >(AllSharedUsersByUserDocument, baseOptions)
}
export function useAllSharedUsersByUserLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    AllSharedUsersByUserQuery,
    AllSharedUsersByUserQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    AllSharedUsersByUserQuery,
    AllSharedUsersByUserQueryVariables
  >(AllSharedUsersByUserDocument, baseOptions)
}
export type AllSharedUsersByUserQueryHookResult = ReturnType<
  typeof useAllSharedUsersByUserQuery
>
export type AllSharedUsersByUserLazyQueryHookResult = ReturnType<
  typeof useAllSharedUsersByUserLazyQuery
>
export type AllSharedUsersByUserQueryResult = ApolloReactCommon.QueryResult<
  AllSharedUsersByUserQuery,
  AllSharedUsersByUserQueryVariables
>
export const CreateSharedElementsDocument = gql`
  mutation CreateSharedElements($data: CreateSharedElementsInput!) {
    createSharedElements(data: $data) {
      ...SharedElement
    }
  }
  ${SharedElementFragmentDoc}
`
export type CreateSharedElementsMutationFn = ApolloReactCommon.MutationFunction<
  CreateSharedElementsMutation,
  CreateSharedElementsMutationVariables
>

/**
 * __useCreateSharedElementsMutation__
 *
 * To run a mutation, you first call `useCreateSharedElementsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSharedElementsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSharedElementsMutation, { data, loading, error }] = useCreateSharedElementsMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateSharedElementsMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateSharedElementsMutation,
    CreateSharedElementsMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    CreateSharedElementsMutation,
    CreateSharedElementsMutationVariables
  >(CreateSharedElementsDocument, baseOptions)
}
export type CreateSharedElementsMutationHookResult = ReturnType<
  typeof useCreateSharedElementsMutation
>
export type CreateSharedElementsMutationResult = ApolloReactCommon.MutationResult<
  CreateSharedElementsMutation
>
export type CreateSharedElementsMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateSharedElementsMutation,
  CreateSharedElementsMutationVariables
>
export const DeleteSharedElementDocument = gql`
  mutation DeleteSharedElement($email: String!, $elementId: String!) {
    destroySharedElement(email: $email, elementId: $elementId)
  }
`
export type DeleteSharedElementMutationFn = ApolloReactCommon.MutationFunction<
  DeleteSharedElementMutation,
  DeleteSharedElementMutationVariables
>

/**
 * __useDeleteSharedElementMutation__
 *
 * To run a mutation, you first call `useDeleteSharedElementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSharedElementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSharedElementMutation, { data, loading, error }] = useDeleteSharedElementMutation({
 *   variables: {
 *      email: // value for 'email'
 *      elementId: // value for 'elementId'
 *   },
 * });
 */
export function useDeleteSharedElementMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DeleteSharedElementMutation,
    DeleteSharedElementMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    DeleteSharedElementMutation,
    DeleteSharedElementMutationVariables
  >(DeleteSharedElementDocument, baseOptions)
}
export type DeleteSharedElementMutationHookResult = ReturnType<
  typeof useDeleteSharedElementMutation
>
export type DeleteSharedElementMutationResult = ApolloReactCommon.MutationResult<
  DeleteSharedElementMutation
>
export type DeleteSharedElementMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteSharedElementMutation,
  DeleteSharedElementMutationVariables
>
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

/**
 * __useAllTasksQuery__
 *
 * To run a query within a React component, call `useAllTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllTasksQuery({
 *   variables: {
 *      selectedUserId: // value for 'selectedUserId'
 *      daysBack: // value for 'daysBack'
 *      daysForward: // value for 'daysForward'
 *   },
 * });
 */
export function useAllTasksQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    AllTasksQuery,
    AllTasksQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<AllTasksQuery, AllTasksQueryVariables>(
    AllTasksDocument,
    baseOptions,
  )
}
export function useAllTasksLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    AllTasksQuery,
    AllTasksQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<AllTasksQuery, AllTasksQueryVariables>(
    AllTasksDocument,
    baseOptions,
  )
}
export type AllTasksQueryHookResult = ReturnType<typeof useAllTasksQuery>
export type AllTasksLazyQueryHookResult = ReturnType<
  typeof useAllTasksLazyQuery
>
export type AllTasksQueryResult = ApolloReactCommon.QueryResult<
  AllTasksQuery,
  AllTasksQueryVariables
>
export const CreateTaskDocument = gql`
  mutation CreateTask($data: TaskInput!) {
    createTask(data: $data) {
      ...Task
    }
  }
  ${TaskFragmentDoc}
`
export type CreateTaskMutationFn = ApolloReactCommon.MutationFunction<
  CreateTaskMutation,
  CreateTaskMutationVariables
>

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateTaskMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateTaskMutation,
    CreateTaskMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    CreateTaskMutation,
    CreateTaskMutationVariables
  >(CreateTaskDocument, baseOptions)
}
export type CreateTaskMutationHookResult = ReturnType<
  typeof useCreateTaskMutation
>
export type CreateTaskMutationResult = ApolloReactCommon.MutationResult<
  CreateTaskMutation
>
export type CreateTaskMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateTaskMutation,
  CreateTaskMutationVariables
>
export const UpdateTaskDocument = gql`
  mutation UpdateTask($taskId: String!, $data: TaskInput!) {
    updateTask(taskId: $taskId, data: $data) {
      ...Task
    }
  }
  ${TaskFragmentDoc}
`
export type UpdateTaskMutationFn = ApolloReactCommon.MutationFunction<
  UpdateTaskMutation,
  UpdateTaskMutationVariables
>

/**
 * __useUpdateTaskMutation__
 *
 * To run a mutation, you first call `useUpdateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskMutation, { data, loading, error }] = useUpdateTaskMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateTaskMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateTaskMutation,
    UpdateTaskMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    UpdateTaskMutation,
    UpdateTaskMutationVariables
  >(UpdateTaskDocument, baseOptions)
}
export type UpdateTaskMutationHookResult = ReturnType<
  typeof useUpdateTaskMutation
>
export type UpdateTaskMutationResult = ApolloReactCommon.MutationResult<
  UpdateTaskMutation
>
export type UpdateTaskMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateTaskMutation,
  UpdateTaskMutationVariables
>
export const UpdateTaskOrderDocument = gql`
  mutation UpdateTaskOrder($taskId: String!, $data: OrderTaskInput!) {
    updateTaskOrder(taskId: $taskId, data: $data) {
      id
      order
      scheduledDate
    }
  }
`
export type UpdateTaskOrderMutationFn = ApolloReactCommon.MutationFunction<
  UpdateTaskOrderMutation,
  UpdateTaskOrderMutationVariables
>

/**
 * __useUpdateTaskOrderMutation__
 *
 * To run a mutation, you first call `useUpdateTaskOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskOrderMutation, { data, loading, error }] = useUpdateTaskOrderMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateTaskOrderMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateTaskOrderMutation,
    UpdateTaskOrderMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    UpdateTaskOrderMutation,
    UpdateTaskOrderMutationVariables
  >(UpdateTaskOrderDocument, baseOptions)
}
export type UpdateTaskOrderMutationHookResult = ReturnType<
  typeof useUpdateTaskOrderMutation
>
export type UpdateTaskOrderMutationResult = ApolloReactCommon.MutationResult<
  UpdateTaskOrderMutation
>
export type UpdateTaskOrderMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateTaskOrderMutation,
  UpdateTaskOrderMutationVariables
>
export const DeleteTaskDocument = gql`
  mutation DeleteTask($taskId: String!) {
    destroyTask(taskId: $taskId)
  }
`
export type DeleteTaskMutationFn = ApolloReactCommon.MutationFunction<
  DeleteTaskMutation,
  DeleteTaskMutationVariables
>

/**
 * __useDeleteTaskMutation__
 *
 * To run a mutation, you first call `useDeleteTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskMutation, { data, loading, error }] = useDeleteTaskMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *   },
 * });
 */
export function useDeleteTaskMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DeleteTaskMutation,
    DeleteTaskMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    DeleteTaskMutation,
    DeleteTaskMutationVariables
  >(DeleteTaskDocument, baseOptions)
}
export type DeleteTaskMutationHookResult = ReturnType<
  typeof useDeleteTaskMutation
>
export type DeleteTaskMutationResult = ApolloReactCommon.MutationResult<
  DeleteTaskMutation
>
export type DeleteTaskMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteTaskMutation,
  DeleteTaskMutationVariables
>
export const MeDocument = gql`
  query Me {
    me {
      ...User
    }
  }
  ${UserFragmentDoc}
`

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>,
) {
  return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(
    MeDocument,
    baseOptions,
  )
}
export function useMeLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    MeQuery,
    MeQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(
    MeDocument,
    baseOptions,
  )
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>
export type MeQueryResult = ApolloReactCommon.QueryResult<
  MeQuery,
  MeQueryVariables
>
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
export type LoginMutationFn = ApolloReactCommon.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    baseOptions,
  )
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>
export type LoginMutationResult = ApolloReactCommon.MutationResult<
  LoginMutation
>
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>
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
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    RegisterMutation,
    RegisterMutationVariables
  >(RegisterDocument, baseOptions)
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>
export type RegisterMutationResult = ApolloReactCommon.MutationResult<
  RegisterMutation
>
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>
export const UpdateUserDocument = gql`
  mutation UpdateUser($data: UpdateInput!) {
    updateUser(data: $data) {
      ...User
    }
  }
  ${UserFragmentDoc}
`
export type UpdateUserMutationFn = ApolloReactCommon.MutationFunction<
  UpdateUserMutation,
  UpdateUserMutationVariables
>

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >(UpdateUserDocument, baseOptions)
}
export type UpdateUserMutationHookResult = ReturnType<
  typeof useUpdateUserMutation
>
export type UpdateUserMutationResult = ApolloReactCommon.MutationResult<
  UpdateUserMutation
>
export type UpdateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateUserMutation,
  UpdateUserMutationVariables
>
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    baseOptions,
  )
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>
export type LogoutMutationResult = ApolloReactCommon.MutationResult<
  LogoutMutation
>
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>
