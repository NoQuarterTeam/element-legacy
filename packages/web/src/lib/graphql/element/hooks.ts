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
        const userId = data.createElement.creatorId
        const elementsQuery = cache.readQuery<AllElementsQuery>({
          query: AllElementsDocument,
          variables: { selectedUserId: userId },
        })

        if (elementsQuery && elementsQuery.allElements) {
          const { allElements } = elementsQuery
          const userId = data.createElement.creatorId
          cache.writeQuery({
            query: AllElementsDocument,
            variables: { selectedUserId: userId },
            data: {
              allElements: [...allElements, data.createElement],
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
  return data?.allElements
}
