import {
  useAllSharedElementsQuery,
  useCreateSharedElementsMutation,
  useDeleteSharedElementMutation,
  useAllSharedUsersQuery,
  useAllSharedUsersByUserQuery,
  AllSharedUsersDocument,
  AllSharedUsersByUserDocument,
  AllTasksDocument,
} from "../types"

export function useCreateSharedElements(userId: string, elementId: string) {
  return useCreateSharedElementsMutation({
    refetchQueries: [
      {
        query: AllSharedUsersDocument,
        variables: { elementId },
      },
      {
        query: AllSharedUsersByUserDocument,
        variables: { userId: userId },
      },
    ],
  })
}

export function useDeleteSharedElement(
  sharedUserId: string,
  userId: string,
  elementId: string,
) {
  return useDeleteSharedElementMutation({
    refetchQueries: [
      {
        query: AllSharedUsersDocument,
        variables: { elementId },
      },
      {
        query: AllSharedUsersByUserDocument,
        variables: { userId: userId },
      },
      {
        query: AllTasksDocument,
        variables: { selectedUserId: sharedUserId },
      },
    ],
  })
}

export function useAllSharedElements() {
  const { data } = useAllSharedElementsQuery()
  return data?.allSharedElements
}

export function useGetSharedUsersByElement(elementId: string) {
  const { data } = useAllSharedUsersQuery({ variables: { elementId } })
  return data?.allSharedUsers
}

export function useGetSharedUsersByUser(userId: string) {
  const { data } = useAllSharedUsersByUserQuery({ variables: { userId } })
  return data?.allSharedUsersByUser
}
