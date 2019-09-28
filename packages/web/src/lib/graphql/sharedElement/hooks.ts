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
      // TODO: To update selected users tasks when added to shared users list
      // {
      //   query: AllTasksDocument,
      //   variables: { selectedUserId: sharedUserId },
      // },
    ],
  })
}

export function useDeleteSharedElement(
  sharedUserId: string,
  userId: string,
  elementId: string,
) {
  return useDeleteSharedElementMutation({
    // update: cache => {
    //   const sharedUsersQuery = cache.readQuery<
    //     AllSharedUsersQuery,
    //     AllSharedUsersQueryVariables
    //   >({
    //     query: AllSharedUsersDocument,
    //     variables: { elementId },
    //   })
    //   if (sharedUsersQuery && sharedUsersQuery.allSharedUsers) {
    //     const sharedUsersData = sharedUsersQuery.allSharedUsers.filter(
    //       user => user.email !== userEmail,
    //     )

    //     cache.writeQuery({
    //       query: AllSharedUsersDocument,
    //       variables: { elementId },
    //       data: {
    //         ...sharedUsersQuery,
    //         allSharedUsers: sharedUsersData,
    //       },
    //     })
    //   }
    // },
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
  const allSharedElements = data && data.allSharedElements
  return allSharedElements
}

export function useGetSharedUsersByElement(elementId: string) {
  const { data } = useAllSharedUsersQuery({ variables: { elementId } })
  const allSharedUsers = data && data.allSharedUsers
  return allSharedUsers
}

export function useGetSharedUsersByUser(userId: string) {
  const { data } = useAllSharedUsersByUserQuery({ variables: { userId } })
  const allSharedUsersByUser = data && data.allSharedUsersByUser
  return allSharedUsersByUser
}
