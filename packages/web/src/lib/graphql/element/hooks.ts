import {
  useCreateElementMutation,
  useAllElementsQuery,
  useUpdateElementMutation,
  AllElementsQuery,
  AllElementsDocument,
} from "../types"

export function useCreateElement() {
  return useCreateElementMutation({
    update: (cache, { data }) => {
      if (data && data.createElement) {
        const elementsQuery = cache.readQuery<AllElementsQuery>({
          query: AllElementsDocument,
        })
        if (elementsQuery && elementsQuery.allElements) {
          const { allElements } = elementsQuery
          cache.writeQuery({
            query: AllElementsDocument,
            data: {
              allElements: [data.createElement, ...allElements],
            },
          })
        }
      }
    },
  })
}

export function useUpdateElement() {
  return useUpdateElementMutation({})
}

export function useAllElements() {
  const { data } = useAllElementsQuery({})
  const allElements = data && data.allElements
  return allElements
}
