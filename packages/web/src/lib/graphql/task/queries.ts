import gql from "graphql-tag"
// import { User } from "../user/fragments"
import { Task } from "./fragments"

export const GET_ALL_TASKS = gql`
  query AllTasks {
    allTasks {
      ...Task
    }
  }
  ${Task}
`

export const CREATE_TASK = gql`
  mutation CreateTask($data: CreateTaskInput!) {
    createTask(data: $data) {
      ...Task
    }
  }
  ${Task}
`
