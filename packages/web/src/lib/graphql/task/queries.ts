import gql from "graphql-tag"
// import { User } from "../user/fragments"
import { Task } from "./fragments"

export const GET_ALL_TASKS = gql`
  query AllTasks($selectedUserId: String!) {
    allTasks(selectedUserId: $selectedUserId) {
      ...Task
    }
  }
  ${Task}
`

export const CREATE_TASK = gql`
  mutation CreateTask($data: TaskInput!) {
    createTask(data: $data) {
      ...Task
    }
  }
  ${Task}
`

export const UPDATE_TASK = gql`
  mutation UpdateTask($taskId: String!, $data: TaskInput!) {
    updateTask(taskId: $taskId, data: $data) {
      ...Task
    }
  }
  ${Task}
`

export const UPDATE_TASK_ORDER = gql`
  mutation UpdateTaskOrder($taskId: String!, $data: OrderTaskInput!) {
    updateTaskOrder(taskId: $taskId, data: $data) {
      id
      order
      scheduledDate
    }
  }
`

export const DELETE_TASK = gql`
  mutation DeleteTask($taskId: String!) {
    destroyTask(taskId: $taskId)
  }
`
