import React, { FC } from "react"
import gql from "graphql-tag"
import { RouteComponentProps, Link as ReachLink } from "@reach/router"

import { Flex, Box, Link, Avatar, Icon } from "@chakra-ui/core"

import Page from "../components/Page"
import { useMe } from "../components/providers/MeProvider"
import { AccountForm } from "../components/AccountForm"
import { ImageUploader } from "../components/ImageUploader"
import { useUpdateUserAvatarMutation } from "../lib/graphql/types"
import { CButton } from "../components/CButton"
import { useLogout } from "../lib/graphql/user/hooks"

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

  const logout = useLogout()

  return (
    <Page>
      <Box pos="fixed" top="10" right="10">
        <Link as={ReachLink} to="/">
          <Icon size="5" name="close" />
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
              name={user.firstName + " " + user.lastName}
              src={user.avatarUrl || undefined}
              mb="4"
            />
          </ImageUploader>
          <AccountForm user={user} />
        </Flex>
      </Box>
      <CButton
        style={{ position: "absolute", bottom: "2rem", right: "2rem" }}
        variant="ghost"
        onClick={logout}
      >
        Logout
      </CButton>
    </Page>
  )
}
