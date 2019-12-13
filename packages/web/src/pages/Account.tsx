import React, { FC } from "react"
import gql from "graphql-tag"
import { RouteComponentProps, Link as ReachLink } from "@reach/router"

import { Flex, Box, Link, Icon, Avatar, PseudoBox } from "@chakra-ui/core"

import Page from "../components/Page"
import { useMe } from "../components/providers/MeProvider"
import { AccountForm } from "../components/AccountForm"
import { ImageUploader } from "../components/ImageUploader"
import { useUpdateUserAvatarMutation } from "../lib/graphql/types"

export const UPDATE_USER_AVATAR = gql`
  mutation UpdateUserAvatar($data: UpdateInput!) {
    updateUser(data: $data) {
      id
      avatarUrl
    }
  }
`

export const Account: FC<RouteComponentProps> = () => {
  const user = useMe()
  const [updateUserAvatar] = useUpdateUserAvatarMutation()

  const handleUpdateImage = async (avatarKey: string) => {
    return updateUserAvatar({
      variables: { data: { avatarKey } },
    })
  }

  return (
    <Page>
      <Box pos="fixed" top="5" left="5">
        <Link as={ReachLink} to="/">
          <Flex align="center">
            <Icon name="arrow-back" mx="2px" /> Back
          </Flex>
        </Link>
      </Box>
      <Box w={["90%", 400]}>
        <Flex direction="column" align="center">
          <ImageUploader
            onSubmit={handleUpdateImage}
            path={`user/avatar/${user.id}`}
          >
            <Avatar
              size="xl"
              name={user.firstName + user.lastName}
              src={user.avatarUrl || undefined}
              mb="4"
            />
          </ImageUploader>
          <AccountForm user={user} />
        </Flex>
      </Box>
    </Page>
  )
}
