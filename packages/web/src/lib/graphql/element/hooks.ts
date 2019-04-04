import { useCreateElementMutation, useAllElementsQuery } from "../types"

export function useCreateElement() {
  return useCreateElementMutation({})
}

export function useAllElements() {
  const { data } = useAllElementsQuery({})
  const allElements = data && data.allElements
  return allElements
}
