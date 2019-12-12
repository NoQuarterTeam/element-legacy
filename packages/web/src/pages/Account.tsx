import React, { FC } from "react"
import { RouteComponentProps, Link as ReachLink } from "@reach/router"

import { Heading, Flex, Box, Link, Icon } from "@chakra-ui/core"

import Page from "../components/Page"
import { useMe } from "../components/providers/MeProvider"
import { AccountForm } from "../components/AccountForm"

export const Account: FC<RouteComponentProps> = () => {
  const user = useMe()
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
        <Flex direction="column">
          <Heading mb="4" size="lg">
            Account
          </Heading>
          <AccountForm user={user} />
        </Flex>
      </Box>
    </Page>
  )
}
