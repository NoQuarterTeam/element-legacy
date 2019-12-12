import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"

import { Heading } from "@chakra-ui/core"

import Page from "../components/Page"
import { useMe } from "../components/providers/MeProvider"
import AccountForm from "../components/AccountForm"

const Account: FC<RouteComponentProps> = () => {
  const user = useMe()
  return (
    <Page>
      <Heading size="lg">
        Hello there, {user.firstName} {user.lastName}
      </Heading>
      <AccountForm />
    </Page>
  )
}

export default Account
