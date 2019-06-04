import {
  useCreateTaskMutation,
  useAllTasksQuery,
  useUpdateTaskMutation,
  useUpdateTaskOrderMutation,
} from "../types"

export function useCreateTask() {
  return useCreateTaskMutation()
}

export function useAllTasks() {
  const { data } = useAllTasksQuery()

  const allTasks = data && data.allTasks
  return allTasks
}

export function useUpdateTask() {
  return useUpdateTaskMutation()
}

export function useUpdateTaskOrder() {
  return useUpdateTaskOrderMutation()
}
