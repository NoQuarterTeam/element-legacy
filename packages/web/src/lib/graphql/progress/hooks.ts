import { useAllProgressQuery } from "../types"

export function useAllProgress() {
  const { data } = useAllProgressQuery({})
  const allProgress = data && data.allProgress
  return allProgress
}
