import { useAllProgressQuery } from "../types"

export function useAllProgress() {
  const { data } = useAllProgressQuery({})
  return data?.allProgress
}
