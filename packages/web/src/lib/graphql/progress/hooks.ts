import { useAllProgressQuery } from "../types"

export function useAllProgress() {
  const { data, loading } = useAllProgressQuery({})
  return { allProgress: data?.allProgress, loading }
}
