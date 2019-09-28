import {
  useCreateElementMutation,
  useAllElementsQuery,
  useUpdateElementMutation,
  AllElementsQuery,
  AllElementsDocument,
} from "../types"

export function useCreateElement(selectedUserId: string) {
  return useCreateElementMutation({
    update: (cache, { data }) => {
      if (data && data.createElement) {
        const elementsQuery = cache.readQuery<AllElementsQuery>({
          query: AllElementsDocument,
          variables: { selectedUserId },
        })

        if (elementsQuery && elementsQuery.allElements) {
          const { allElements } = elementsQuery
          cache.writeQuery({
            query: AllElementsDocument,
            variables: { selectedUserId },
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

export function useAllElements(selectedUserId: string) {
  const { data } = useAllElementsQuery({ variables: { selectedUserId } })
  const allElements = data && data.allElements
  return allElements
}
