import {
  useCreateElementMutation,
  useAllElementsQuery,
  useUpdateElementMutation,
} from "../types"

export function useCreateElement() {
  return useCreateElementMutation({})
}

export function useUpdateElement() {
  return useUpdateElementMutation({})
}

export function useAllElements() {
  const { data } = useAllElementsQuery({})
  const allElements = data && data.allElements
  return allElements
}
