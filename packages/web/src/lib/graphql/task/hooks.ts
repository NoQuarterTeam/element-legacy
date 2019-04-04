import { useCreateTaskMutation, useAllTasksQuery } from "../types"

export function useCreateTask() {
  return useCreateTaskMutation({})
}

export function useAllTasks() {
  const { data } = useAllTasksQuery({})

  const allTasks = data && data.allTasks
  return allTasks
}
